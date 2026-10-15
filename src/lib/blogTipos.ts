// Tipos e utilitários do blog que podem ser usados no navegador (sem acesso a dados).

export type StatusPost = "rascunho" | "agendado" | "publicado" | "arquivado";

export const STATUS_LABEL: Record<StatusPost, string> = {
  rascunho: "Rascunho",
  agendado: "Agendado",
  publicado: "Publicado",
  arquivado: "Arquivado",
};

// ── Registros (espelham as tabelas do schema DBML, em camelCase) ──

export type AutorRegistro = {
  id: number;
  nome: string;
  cargo: string;
  fotoUrl: string | null;
  bio: string | null;
  registro: string | null;
  ativo: boolean;
  criadoEm: string;
};

export type CategoriaRegistro = {
  id: number;
  slug: string;
  nome: string;
  descricao: string | null;
  ordem: number;
  criadoEm: string;
};

export type PostRegistro = {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string; // HTML sanitizado
  capaUrl: string | null;
  capaAlt: string | null;
  categoriaId: number;
  autorId: number;
  status: StatusPost;
  destaque: boolean;
  tempoLeituraMin: number;
  publicadoEm: string | null;
  atualizadoEm: string | null;
  criadoEm: string;
  editadoEm: string;
};

// ── Formato usado pelas páginas públicas ──

export type Categoria = {
  slug: string;
  nome: string;
};

export type Autor = {
  nome: string;
  cargo: string;
  foto: string | null;
};

export type Post = {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  capa: string | null;
  capaAlt: string | null;
  categoria: Categoria;
  autor: Autor;
  status: StatusPost;
  publicadoEm: string; // ISO 8601
  atualizadoEm: string | null;
  tempoLeituraMin: number;
  destaque: boolean;
};

export type ListaPosts = {
  posts: Post[];
  total: number;
  pagina: number;
  totalPaginas: number;
};

// ── Utilitários ──

export function slugify(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 160);
}

export function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Recife",
  });
}

export function formatarDataHora(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Recife",
  });
}

// Status que o leitor vê, considerando a data de publicação.
export function statusEfetivo(post: { status: StatusPost; publicadoEm: string | null }): StatusPost {
  if (post.status !== "publicado" && post.status !== "agendado") return post.status;
  if (!post.publicadoEm) return "rascunho";
  return new Date(post.publicadoEm) > new Date() ? "agendado" : "publicado";
}
