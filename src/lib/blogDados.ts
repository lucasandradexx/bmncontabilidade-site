// Camada de dados do blog (site e admin).
//
// PROVISÓRIO: os dados ficam em data/blog.json, criado na primeira leitura com posts de exemplo.
// Isso funciona em desenvolvimento e em servidor próprio (VPS), mas NÃO em hospedagem serverless
// (Vercel etc.), onde o disco não é permanente.
//
// TODO(banco): reimplementar as funções exportadas abaixo com consultas ao banco
// (tabelas autores, categorias e posts do schema DBML). As assinaturas podem ficar iguais.

import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { SOCIOS } from "@/lib/empresa";
import type {
  AutorRegistro,
  CategoriaRegistro,
  PostRegistro,
  StatusPost,
} from "@/lib/blogTipos";
import { slugify } from "@/lib/blogTipos";

type Banco = {
  autores: AutorRegistro[];
  categorias: CategoriaRegistro[];
  posts: PostRegistro[];
};

const PASTA_DADOS = path.join(process.cwd(), "data");
const ARQUIVO = path.join(PASTA_DADOS, "blog.json");

// ─────────────────────────────────────────
// Leitura e escrita do arquivo
// ─────────────────────────────────────────

let fila: Promise<unknown> = Promise.resolve();
let criacao: Promise<void> | null = null;

// Cria o arquivo com os dados de exemplo uma única vez, mesmo com leituras em paralelo.
function garantirArquivo() {
  criacao ??= fs.access(ARQUIVO).catch(() => gravar(bancoInicial()));
  return criacao;
}

async function lerBanco(): Promise<Banco> {
  await garantirArquivo();
  return JSON.parse(await fs.readFile(ARQUIVO, "utf-8")) as Banco;
}

async function gravar(banco: Banco) {
  await fs.mkdir(PASTA_DADOS, { recursive: true });
  const temp = `${ARQUIVO}.${randomUUID()}.tmp`;
  await fs.writeFile(temp, JSON.stringify(banco, null, 2), "utf-8");
  await fs.rename(temp, ARQUIVO);
}

// Escritas em fila para duas gravações simultâneas não se sobrescreverem.
function alterarBanco<T>(alteracao: (banco: Banco) => T): Promise<T> {
  const tarefa = fila.then(async () => {
    const banco = await lerBanco();
    const resultado = alteracao(banco);
    await gravar(banco);
    return resultado;
  });
  fila = tarefa.catch(() => undefined);
  return tarefa;
}

function proximoId(lista: { id: number }[]) {
  return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export class ErroDados extends Error {}

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
  const { posts } = await lerBanco();
  return [...posts].sort((a, b) =>
    (b.publicadoEm ?? b.editadoEm).localeCompare(a.publicadoEm ?? a.editadoEm),
  );
}

export async function obterPost(id: number): Promise<PostRegistro | null> {
  const { posts } = await lerBanco();
  return posts.find((p) => p.id === id) ?? null;
}

export async function obterPostPorSlug(slug: string): Promise<PostRegistro | null> {
  const { posts } = await lerBanco();
  return posts.find((p) => p.slug === slug) ?? null;
}

function validarPost(banco: Banco, dados: DadosPost, id?: number) {
  if (banco.posts.some((p) => p.slug === dados.slug && p.id !== id)) {
    throw new ErroDados("Já existe um artigo com este endereço (slug).");
  }
  if (!banco.categorias.some((c) => c.id === dados.categoriaId)) {
    throw new ErroDados("Categoria não encontrada.");
  }
  if (!banco.autores.some((a) => a.id === dados.autorId)) {
    throw new ErroDados("Autor não encontrado.");
  }
  // Só um post em destaque por vez.
  if (dados.destaque) banco.posts.forEach((p) => (p.destaque = false));
}

export function criarPost(dados: DadosPost): Promise<PostRegistro> {
  return alterarBanco((banco) => {
    validarPost(banco, dados);
    const agora = new Date().toISOString();
    const post: PostRegistro = { ...dados, id: proximoId(banco.posts), criadoEm: agora, editadoEm: agora };
    banco.posts.push(post);
    return post;
  });
}

export function atualizarPost(id: number, dados: DadosPost): Promise<PostRegistro> {
  return alterarBanco((banco) => {
    const indice = banco.posts.findIndex((p) => p.id === id);
    if (indice < 0) throw new ErroDados("Artigo não encontrado.");
    validarPost(banco, dados, id);
    const post: PostRegistro = { ...banco.posts[indice], ...dados, editadoEm: new Date().toISOString() };
    banco.posts[indice] = post;
    return post;
  });
}

export function excluirPost(id: number): Promise<PostRegistro | null> {
  return alterarBanco((banco) => {
    const post = banco.posts.find((p) => p.id === id) ?? null;
    banco.posts = banco.posts.filter((p) => p.id !== id);
    return post;
  });
}

// ─────────────────────────────────────────
// Categorias
// ─────────────────────────────────────────

export type DadosCategoria = Pick<CategoriaRegistro, "slug" | "nome" | "descricao" | "ordem">;

export async function listarCategorias(): Promise<CategoriaRegistro[]> {
  const { categorias } = await lerBanco();
  return [...categorias].sort((a, b) => a.ordem - b.ordem || a.nome.localeCompare(b.nome));
}

export function salvarCategoria(id: number | null, dados: DadosCategoria): Promise<CategoriaRegistro> {
  return alterarBanco((banco) => {
    if (banco.categorias.some((c) => c.slug === dados.slug && c.id !== id)) {
      throw new ErroDados("Já existe uma categoria com este endereço (slug).");
    }
    if (id === null) {
      const categoria = { ...dados, id: proximoId(banco.categorias), criadoEm: new Date().toISOString() };
      banco.categorias.push(categoria);
      return categoria;
    }
    const indice = banco.categorias.findIndex((c) => c.id === id);
    if (indice < 0) throw new ErroDados("Categoria não encontrada.");
    banco.categorias[indice] = { ...banco.categorias[indice], ...dados };
    return banco.categorias[indice];
  });
}

export function excluirCategoria(id: number): Promise<void> {
  return alterarBanco((banco) => {
    const emUso = banco.posts.filter((p) => p.categoriaId === id).length;
    if (emUso > 0) {
      throw new ErroDados(`Esta categoria tem ${emUso} artigo(s). Mova-os para outra categoria antes de excluir.`);
    }
    banco.categorias = banco.categorias.filter((c) => c.id !== id);
  });
}

// ─────────────────────────────────────────
// Autores
// ─────────────────────────────────────────

export type DadosAutor = Pick<AutorRegistro, "nome" | "cargo" | "fotoUrl" | "bio" | "registro" | "ativo">;

export async function listarAutores(): Promise<AutorRegistro[]> {
  const { autores } = await lerBanco();
  return [...autores].sort((a, b) => a.nome.localeCompare(b.nome));
}

export function salvarAutor(id: number | null, dados: DadosAutor): Promise<AutorRegistro> {
  return alterarBanco((banco) => {
    if (id === null) {
      const autor = { ...dados, id: proximoId(banco.autores), criadoEm: new Date().toISOString() };
      banco.autores.push(autor);
      return autor;
    }
    const indice = banco.autores.findIndex((a) => a.id === id);
    if (indice < 0) throw new ErroDados("Autor não encontrado.");
    banco.autores[indice] = { ...banco.autores[indice], ...dados };
    return banco.autores[indice];
  });
}

export function excluirAutor(id: number): Promise<void> {
  return alterarBanco((banco) => {
    const emUso = banco.posts.filter((p) => p.autorId === id).length;
    if (emUso > 0) {
      throw new ErroDados(`Este autor assina ${emUso} artigo(s). Desative-o em vez de excluir.`);
    }
    banco.autores = banco.autores.filter((a) => a.id !== id);
  });
}

// ─────────────────────────────────────────
// Dados iniciais de exemplo
// ─────────────────────────────────────────

const CONTEUDO_EXEMPLO = `<p>Este é um texto de exemplo. Edite ou exclua este artigo no painel em <a href="/admin">/admin</a>.</p>
<h2>Um subtítulo de seção</h2>
<p>Parágrafos normais ficam com leitura confortável, linhas de largura limitada e espaçamento generoso. <strong>Trechos em negrito</strong> ganham destaque e <a href="/diagnostico-fiscal">links internos</a> levam o leitor para as páginas de serviço.</p>
<ul><li><p>Primeiro item de uma lista com marcadores</p></li><li><p>Segundo item, um pouco mais longo, para mostrar como a quebra de linha se comporta dentro da lista</p></li><li><p>Terceiro item</p></li></ul>
<h3>Um subtítulo menor</h3>
<p>Mais um parágrafo de exemplo para preencher o espaço e mostrar o ritmo do texto entre os blocos.</p>
<blockquote><p>Citações aparecem com uma barra lateral na cor da marca, boas para destacar uma frase importante do artigo.</p></blockquote>
<ol><li><p>Passo numerado um</p></li><li><p>Passo numerado dois</p></li><li><p>Passo numerado três</p></li></ol>
<h2>Conclusão</h2>
<p>Fechamento do artigo. Logo abaixo, a página mostra o convite para falar com a BMN e os artigos relacionados.</p>`;

const TITULOS: [string, number, number][] = [
  ["O que muda com a CBS em 2027 para empresas do Simples Nacional", 1, 7],
  ["Pró-labore ou distribuição de lucros: como os sócios devem se remunerar", 2, 6],
  ["Fluxo de caixa: o relatório que todo dono de empresa deveria olhar toda semana", 3, 5],
  ["MEI, ME ou EPP: qual o porte certo para abrir a sua empresa", 4, 8],
  ["Lucro Presumido ou Simples Nacional: quando vale a pena trocar de regime", 2, 9],
  ["eSocial sem dor de cabeça: o que a sua empresa precisa enviar todo mês", 5, 6],
  ["IBS e CBS na prática: como fica o preço de venda dos seus produtos", 1, 7],
  ["Separar as contas da empresa e do sócio: por onde começar", 3, 4],
  ["Como contratar o primeiro funcionário sem riscos trabalhistas", 5, 6],
  ["Créditos tributários esquecidos: sua empresa pode estar pagando a mais", 2, 5],
];

function bancoInicial(): Banco {
  const agora = new Date().toISOString();

  const categorias: CategoriaRegistro[] = [
    "Reforma Tributária",
    "Impostos",
    "Gestão Financeira",
    "Abertura de Empresa",
    "Departamento Pessoal",
  ].map((nome, i) => ({ id: i + 1, slug: slugify(nome), nome, descricao: null, ordem: i + 1, criadoEm: agora }));

  const autores: AutorRegistro[] = SOCIOS.map((s, i) => ({
    id: i + 1,
    nome: s.nome,
    cargo: s.cargo,
    fotoUrl: s.foto,
    bio: s.bio,
    registro: s.registro,
    ativo: true,
    criadoEm: agora,
  }));

  const posts: PostRegistro[] = TITULOS.map(([titulo, categoriaId, tempo], i) => {
    const data = new Date(Date.UTC(2026, 9, 10 - i * 4, 12)).toISOString();
    return {
      id: i + 1,
      slug: slugify(titulo),
      titulo,
      resumo:
        "Resumo de exemplo do artigo, com uma ou duas frases que explicam o assunto e convidam a pessoa a continuar lendo.",
      conteudo: CONTEUDO_EXEMPLO,
      capaUrl: null,
      capaAlt: null,
      categoriaId,
      autorId: autores[i % autores.length].id,
      status: "publicado",
      destaque: i === 0,
      tempoLeituraMin: tempo,
      publicadoEm: data,
      atualizadoEm: null,
      criadoEm: data,
      editadoEm: data,
    };
  });

  return { autores, categorias, posts };
}
