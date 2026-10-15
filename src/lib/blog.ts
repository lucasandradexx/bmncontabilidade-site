// Consultas do site público. Só devolvem posts publicados (data de publicação já passou).
// A origem dos dados fica em lib/blogDados.ts.

import "server-only";
import {
  listarAutores,
  listarCategorias,
  listarPosts,
  obterPost,
} from "@/lib/blogDados";
import {
  statusEfetivo,
  type AutorRegistro,
  type Categoria,
  type CategoriaRegistro,
  type ListaPosts,
  type Post,
  type PostRegistro,
} from "@/lib/blogTipos";

export type { Autor, Categoria, ListaPosts, Post } from "@/lib/blogTipos";
export { formatarData } from "@/lib/blogTipos";

export const POSTS_POR_PAGINA = 6;

function montarPost(
  registro: PostRegistro,
  categorias: CategoriaRegistro[],
  autores: AutorRegistro[],
): Post {
  const categoria = categorias.find((c) => c.id === registro.categoriaId);
  const autor = autores.find((a) => a.id === registro.autorId);
  return {
    id: registro.id,
    slug: registro.slug,
    titulo: registro.titulo,
    resumo: registro.resumo,
    conteudo: registro.conteudo,
    capa: registro.capaUrl,
    capaAlt: registro.capaAlt,
    categoria: { slug: categoria?.slug ?? "", nome: categoria?.nome ?? "Sem categoria" },
    autor: { nome: autor?.nome ?? "Equipe BMN", cargo: autor?.cargo ?? "", foto: autor?.fotoUrl ?? null },
    status: statusEfetivo(registro),
    publicadoEm: registro.publicadoEm ?? registro.editadoEm,
    atualizadoEm: registro.atualizadoEm,
    tempoLeituraMin: registro.tempoLeituraMin,
    destaque: registro.destaque,
  };
}

async function postsPublicados(): Promise<Post[]> {
  const [registros, categorias, autores] = await Promise.all([
    listarPosts(),
    listarCategorias(),
    listarAutores(),
  ]);
  return registros
    .filter((p) => statusEfetivo(p) === "publicado")
    .map((p) => montarPost(p, categorias, autores));
}

export async function getCategorias(): Promise<Categoria[]> {
  const [categorias, posts] = await Promise.all([listarCategorias(), postsPublicados()]);
  // Só mostra nos filtros as categorias com algum artigo publicado.
  return categorias
    .filter((c) => posts.some((p) => p.categoria.slug === c.slug))
    .map((c) => ({ slug: c.slug, nome: c.nome }));
}

export async function getPostDestaque(): Promise<Post | null> {
  const posts = await postsPublicados();
  return posts.find((p) => p.destaque) ?? null;
}

export async function getPosts({
  categoria,
  busca,
  pagina = 1,
  excluirSlug,
}: {
  categoria?: string;
  busca?: string;
  pagina?: number;
  excluirSlug?: string;
} = {}): Promise<ListaPosts> {
  const termo = busca?.trim().toLowerCase();
  const filtrados = (await postsPublicados()).filter(
    (p) =>
      p.slug !== excluirSlug &&
      (!categoria || p.categoria.slug === categoria) &&
      (!termo || p.titulo.toLowerCase().includes(termo) || p.resumo.toLowerCase().includes(termo)),
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POSTS_POR_PAGINA));
  const atual = Math.min(Math.max(1, pagina), totalPaginas);
  const inicio = (atual - 1) * POSTS_POR_PAGINA;

  return {
    posts: filtrados.slice(inicio, inicio + POSTS_POR_PAGINA),
    total: filtrados.length,
    pagina: atual,
    totalPaginas,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await postsPublicados();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostsRelacionados(post: Post, limite = 3): Promise<Post[]> {
  const posts = (await postsPublicados()).filter((p) => p.slug !== post.slug);
  const mesmaCategoria = posts.filter((p) => p.categoria.slug === post.categoria.slug);
  const outros = posts.filter((p) => p.categoria.slug !== post.categoria.slug);
  return [...mesmaCategoria, ...outros].slice(0, limite);
}

// Usado pelo sitemap.
export async function getTodosSlugs(): Promise<{ slug: string; atualizadoEm: string }[]> {
  const posts = await postsPublicados();
  return posts.map((p) => ({ slug: p.slug, atualizadoEm: p.atualizadoEm ?? p.publicadoEm }));
}

// Pré-visualização no admin: devolve o post em qualquer status.
export async function getPostParaPrevia(id: number): Promise<Post | null> {
  const [registro, categorias, autores] = await Promise.all([
    obterPost(id),
    listarCategorias(),
    listarAutores(),
  ]);
  return registro ? montarPost(registro, categorias, autores) : null;
}
