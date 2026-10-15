"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ErroDados,
  atualizarPost,
  criarPost,
  excluirAutor,
  excluirCategoria,
  excluirPost,
  obterPost,
  salvarAutor,
  salvarCategoria,
  type DadosPost,
} from "@/lib/blogDados";
import { slugify, type StatusPost } from "@/lib/blogTipos";
import { calcularTempoLeitura, sanitizarConteudo, textoPuro } from "@/lib/admin/sanitizar";
import { credenciaisValidas, criarSessao, encerrarSessao, exigirSessao } from "@/lib/admin/sessao";

export type Resultado = { ok: true; mensagem: string } | { ok: false; erro: string };

function falha(erro: unknown): Resultado {
  if (erro instanceof ErroDados) return { ok: false, erro: erro.message };
  if (erro instanceof z.ZodError) return { ok: false, erro: erro.issues[0]?.message ?? "Dados inválidos." };
  console.error(erro);
  return { ok: false, erro: "Não foi possível salvar. Tente novamente." };
}

// Atualiza o site e o painel depois de qualquer alteração.
function revalidarBlog() {
  revalidatePath("/blog", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin", "layout");
}

// Imagens aceitas: caminhos do próprio site (uploads do painel ou arquivos de /public).
// TODO(storage): aceitar também o domínio do storage externo (e liberá-lo em images.remotePatterns).
const urlImagem = z
  .string()
  .trim()
  .refine((url) => url === "" || (url.startsWith("/") && !url.startsWith("//")), {
    message: "Endereço de imagem inválido.",
  })
  .transform((url) => url || null);

const textoOpcional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((t) => t || null);

// ─────────────────────────────────────────
// Login
// ─────────────────────────────────────────

export async function entrar(_estado: string | null, formData: FormData): Promise<string | null> {
  const usuario = String(formData.get("usuario") ?? "");
  const senha = String(formData.get("senha") ?? "");

  if (!credenciaisValidas(usuario, senha)) {
    return "Usuário ou senha incorretos.";
  }

  await criarSessao(usuario);
  redirect("/admin/posts");
}

export async function sair() {
  await encerrarSessao();
  redirect("/admin/login");
}

// ─────────────────────────────────────────
// Posts
// ─────────────────────────────────────────

const esquemaPost = z.object({
  id: z.number().int().positive().nullable(),
  acao: z.enum(["rascunho", "publicar", "arquivar"]),
  titulo: z.string().trim().min(1, "Informe o título.").max(200, "O título passa de 200 caracteres."),
  slug: z.string().trim().max(160),
  resumo: z.string().trim().max(320, "O resumo passa de 320 caracteres."),
  conteudo: z.string(),
  capaUrl: urlImagem,
  capaAlt: textoOpcional(200),
  categoriaId: z.number({ invalid_type_error: "Escolha uma categoria." }).int().positive("Escolha uma categoria."),
  autorId: z.number({ invalid_type_error: "Escolha um autor." }).int().positive("Escolha um autor."),
  destaque: z.boolean(),
  publicadoEm: z.string().datetime().nullable(),
  marcarAtualizado: z.boolean(),
});

export type EntradaPost = z.input<typeof esquemaPost>;

export async function salvarPostAcao(entrada: EntradaPost): Promise<Resultado> {
  await exigirSessao();

  let id: number;
  let mensagem: string;
  try {
    const d = esquemaPost.parse(entrada);
    const conteudo = sanitizarConteudo(d.conteudo);
    const slug = slugify(d.slug || d.titulo);
    if (!slug) return { ok: false, erro: "Informe um título ou endereço válido." };

    if (d.acao === "publicar") {
      if (!d.resumo) return { ok: false, erro: "Escreva o resumo antes de publicar." };
      if (!textoPuro(conteudo)) return { ok: false, erro: "Escreva o texto do artigo antes de publicar." };
    }

    const anterior = d.id ? await obterPost(d.id) : null;
    if (d.id && !anterior) return { ok: false, erro: "Artigo não encontrado." };

    let status: StatusPost;
    let publicadoEm = d.publicadoEm ?? anterior?.publicadoEm ?? null;
    if (d.acao === "publicar") {
      publicadoEm ??= new Date().toISOString();
      status = new Date(publicadoEm) > new Date() ? "agendado" : "publicado";
    } else if (d.acao === "arquivar") {
      status = "arquivado";
    } else {
      status = "rascunho";
    }

    const dados: DadosPost = {
      slug,
      titulo: d.titulo,
      resumo: d.resumo,
      conteudo,
      capaUrl: d.capaUrl,
      capaAlt: d.capaAlt,
      categoriaId: d.categoriaId,
      autorId: d.autorId,
      status,
      destaque: d.destaque,
      tempoLeituraMin: calcularTempoLeitura(conteudo),
      publicadoEm,
      atualizadoEm: d.marcarAtualizado ? new Date().toISOString() : (anterior?.atualizadoEm ?? null),
    };

    const salvo = d.id ? await atualizarPost(d.id, dados) : await criarPost(dados);
    id = salvo.id;

    // Se o endereço mudou, a página antiga também precisa sair do cache.
    if (anterior && anterior.slug !== salvo.slug) revalidatePath(`/blog/${anterior.slug}`);

    mensagem = {
      rascunho: "Rascunho salvo.",
      agendado: "Publicação agendada.",
      publicado: anterior?.status === "publicado" ? "Alterações publicadas." : "Artigo publicado.",
      arquivado: "Artigo arquivado. Ele saiu do site.",
    }[status];
  } catch (erro) {
    return falha(erro);
  }

  revalidarBlog();
  if (!entrada.id) redirect(`/admin/posts/${id}?criado=1`);
  return { ok: true, mensagem };
}

export async function excluirPostAcao(id: number): Promise<Resultado> {
  await exigirSessao();
  try {
    const post = await excluirPost(id);
    if (post) revalidatePath(`/blog/${post.slug}`);
  } catch (erro) {
    return falha(erro);
  }
  revalidarBlog();
  return { ok: true, mensagem: "Artigo excluído." };
}

// ─────────────────────────────────────────
// Categorias
// ─────────────────────────────────────────

const esquemaCategoria = z.object({
  id: z.number().int().positive().nullable(),
  nome: z.string().trim().min(1, "Informe o nome.").max(80),
  slug: z.string().trim().max(80),
  descricao: textoOpcional(500),
  ordem: z.number().int().min(0).max(999),
});

export type EntradaCategoria = z.input<typeof esquemaCategoria>;

export async function salvarCategoriaAcao(entrada: EntradaCategoria): Promise<Resultado> {
  await exigirSessao();
  try {
    const { id, ...d } = esquemaCategoria.parse(entrada);
    await salvarCategoria(id, { ...d, slug: slugify(d.slug || d.nome) });
  } catch (erro) {
    return falha(erro);
  }
  revalidarBlog();
  return { ok: true, mensagem: "Categoria salva." };
}

export async function excluirCategoriaAcao(id: number): Promise<Resultado> {
  await exigirSessao();
  try {
    await excluirCategoria(id);
  } catch (erro) {
    return falha(erro);
  }
  revalidarBlog();
  return { ok: true, mensagem: "Categoria excluída." };
}

// ─────────────────────────────────────────
// Autores
// ─────────────────────────────────────────

const esquemaAutor = z.object({
  id: z.number().int().positive().nullable(),
  nome: z.string().trim().min(1, "Informe o nome.").max(120),
  cargo: z.string().trim().min(1, "Informe o cargo.").max(80),
  fotoUrl: urlImagem,
  bio: textoOpcional(1000),
  registro: textoOpcional(60),
  ativo: z.boolean(),
});

export type EntradaAutor = z.input<typeof esquemaAutor>;

export async function salvarAutorAcao(entrada: EntradaAutor): Promise<Resultado> {
  await exigirSessao();
  try {
    const { id, ...d } = esquemaAutor.parse(entrada);
    await salvarAutor(id, d);
  } catch (erro) {
    return falha(erro);
  }
  revalidarBlog();
  return { ok: true, mensagem: "Autor salvo." };
}

export async function excluirAutorAcao(id: number): Promise<Resultado> {
  await exigirSessao();
  try {
    await excluirAutor(id);
  } catch (erro) {
    return falha(erro);
  }
  revalidarBlog();
  return { ok: true, mensagem: "Autor excluído." };
}
