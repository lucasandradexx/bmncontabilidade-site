import "server-only";
import type {
  AutorRegistro,
  CategoriaRegistro,
  PostRegistro,
  StatusPost,
} from "@/lib/blogTipos";

import postgres from "postgres";
import { sql } from "@/lib/db";

// Camada de dados do blog: consultas ao Postgres usadas pelo site (blog.ts) e pelo painel (acoes.ts).

export class ErroDados extends Error {}

// O driver devolve timestamptz como Date; os tipos do projeto usam string ISO.
function comDatasISO<T extends Record<string, unknown>>(linha: T): T {
  for (const [chave, valor] of Object.entries(linha)) {
    if (valor instanceof Date) (linha as Record<string, unknown>)[chave] = valor.toISOString();
  }
  return linha;
}

function traduzirErro(erro: unknown, mensagemSlug: string): never {
  if (erro instanceof postgres.PostgresError) {
    if (erro.code === "23505") throw new ErroDados(mensagemSlug);
    if (erro.code === "23503") throw new ErroDados("Este item está ligado a outro registro.");
  }
  throw erro;
}

// ─────────────────────────────────────────
// Posts
// ─────────────────────────────────────────

export type DadosPost = {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  capaUrl: string | null;
  capaAlt: string | null;
  categoriaId: number;
  autorId: number;
  status: StatusPost;
  destaque: boolean;
  tempoLeituraMin: number;
  publicadoEm: string | null;
  atualizadoEm: string | null;
};

export async function listarPosts(): Promise<PostRegistro[]> {
  const linhas = await sql<PostRegistro[]>`
    select * from posts order by coalesce(publicado_em, editado_em) desc
  `;
  return linhas.map(comDatasISO);
}

export async function obterPost(id: number): Promise<PostRegistro | null> {
  const [post] = await sql<PostRegistro[]>`
    select * from posts where id = ${id}
  `;
  return post ? comDatasISO(post) : null;
}

export async function obterPostPorSlug(slug: string): Promise<PostRegistro | null> {
  const [post] = await sql<PostRegistro[]>`
    select * from posts where slug = ${slug}
  `;
  return post ? comDatasISO(post) : null;
}

export async function criarPost(dados: DadosPost, usuarioId: number): Promise<PostRegistro> {
  
  const acao = {
    rascunho: "criou",
    publicado: "publicou",
    agendado: "agendou",
    arquivado: "arquivou",
  }[dados.status];

  try {

    const post = await sql.begin(async (tx) => {

      if (dados.destaque) await tx`update posts set destaque = false where destaque`;
      
      const [post] = await tx<PostRegistro[]>`
        insert into posts ${tx({
          ...dados, 
          criadoPorId: usuarioId, 
          editadoPorId: usuarioId, 
          publicadoPorId: dados.status === "publicado" || dados.status === "agendado" ? usuarioId : null,
        })} returning *
      `;

      await tx`insert into posts_historico ${tx({
        postId: post.id,
        usuarioId,
        acao,
        titulo: dados.titulo,
        dados: tx.json(post)
      })}`;

      return post;
    });
    return comDatasISO(post);
  } catch (erro) {
    traduzirErro(erro, "Já existe um artigo com este endereço (slug).");
  }
}

function acaoDaEdicao(antes: StatusPost, depois: StatusPost) {
  if (antes === depois) return "editou";
  if (depois === "publicado") return "publicou";
  if (depois === "agendado") return "agendou";
  if (depois === "arquivado") return "arquivou";
  return "despublicou"; // só sobra: voltou para rascunho
}

export async function atualizarPost(id: number, dados: DadosPost, usuarioId: number): Promise<PostRegistro> {
  
  try {
    const post = await sql.begin(async (tx) => {

      const [anterior] = await tx<PostRegistro[]>`select * from posts where id = ${id}`;
      if (!anterior) throw new ErroDados("Artigo não encontrado.");

      const acao = acaoDaEdicao(anterior.status, dados.status);

      if (dados.destaque) await tx`update posts set destaque = false where destaque`;

      const [post] = await tx<PostRegistro[]>`
        update posts set ${tx({
          ...dados,
          editadoPorId: usuarioId, 
          editadoEm: new Date(),
          publicadoPorId: acao === "publicou" || acao === "agendou" ? usuarioId : anterior.publicadoPorId,
        })} where id = ${id} returning *
      `;

      await tx`insert into posts_historico ${tx({
        postId: post.id,
        usuarioId,
        acao,
        titulo: dados.titulo,
        dados: tx.json(post)
      })}`;

      return post;

    });
    return comDatasISO(post);
  } catch (erro) {
    traduzirErro(erro, "Já existe um artigo com este endereço (slug).");
  }
}

export async function excluirPost(id: number, usuarioId: number): Promise<PostRegistro | null> {
  const post = await sql.begin(async (tx) => {
    const [post] = await tx<PostRegistro[]>`delete from posts where id = ${id} returning *`;
    
    if (!post) return null;

    await tx`insert into posts_historico ${tx({
      postId: post.id,
      usuarioId,
      acao: "excluiu",
      titulo: post.titulo,
      dados: tx.json(post)
    })}`;

    return post
  });

  return post ? comDatasISO(post) : null;
}

// ─────────────────────────────────────────
// Categorias
// ─────────────────────────────────────────

export type DadosCategoria = Pick<CategoriaRegistro, "slug" | "nome" | "descricao" | "ordem">;

export async function listarCategorias(): Promise<CategoriaRegistro[]> {
  const linhas = await sql<CategoriaRegistro[]>`
    select * from categorias order by ordem, nome
  `;
  return linhas.map(comDatasISO);
}

export async function salvarCategoria(id: number | null, dados: DadosCategoria): Promise<CategoriaRegistro> {

  try {
    const [categoria] = id === null
      ? await sql<CategoriaRegistro[]>`insert into categorias ${sql(dados)} returning *`
      : await sql<CategoriaRegistro[]>`update categorias set ${sql(dados)} where id = ${id} returning *`;
    
    if (!categoria) throw new ErroDados("Categoria não encontrada.");

    return comDatasISO(categoria);

  } catch (erro) {
    traduzirErro(erro, "Já existe uma categoria com este endereço (slug).");
  }

}

export async function excluirCategoria(id: number): Promise<void> {
  const [{ total }] = await sql`
    select count(*)::int as total from posts where categoria_id = ${id}
  `;
  if (total > 0) {
    throw new ErroDados(`Esta categoria tem ${total} artigo(s). Mova-os para outra categoria ou apague-os antes de excluir.`);
  }
  await sql`delete from categorias where id = ${id}`;
}

// ─────────────────────────────────────────
// Autores
// ─────────────────────────────────────────

export type DadosAutor = Pick<AutorRegistro, "nome" | "cargo" | "fotoUrl" | "bio" | "registro" | "ativo">;

export async function listarAutores(): Promise<AutorRegistro[]> {
  const linhas = await sql<AutorRegistro[]>`
    select * from autores order by nome
  `;
  return linhas.map(comDatasISO);
}

export async function salvarAutor(id: number | null, dados: DadosAutor): Promise<AutorRegistro> {
  const [autor] = id === null
    ? await sql<AutorRegistro[]>`insert into autores ${sql(dados)} returning *`
    : await sql<AutorRegistro[]>`update autores set ${sql(dados)} where id = ${id} returning *`;
  
  if (!autor) throw new ErroDados("Autor não encontrado.");

  return comDatasISO(autor);
}

export async function excluirAutor(id: number): Promise<void> {
  const [{ total }] = await sql`
    select count(*)::int as total from posts where autor_id = ${id}
  `;
  if (total > 0) {
    throw new ErroDados(`Este autor tem ${total} artigo(s). Desative-o em vez de excluir ou apague os posts para excluir.`);
  }
  await sql`delete from autores where id = ${id}`;
}