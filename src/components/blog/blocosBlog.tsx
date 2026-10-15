// Blocos visuais do blog: capa, card, autor, filtros, paginação e compartilhamento.
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaLinkedinIn, FaRegClock, FaSearch, FaWhatsapp } from "react-icons/fa";
import { SITE_URL } from "@/lib/site";
import { formatarData, type Autor, type Categoria, type Post } from "@/lib/blogTipos";

// Link da listagem mantendo os filtros atuais.
export function hrefBlog({
  categoria,
  busca,
  pagina,
}: {
  categoria?: string;
  busca?: string;
  pagina?: number;
}) {
  const params = new URLSearchParams();
  if (categoria) params.set("categoria", categoria);
  if (busca) params.set("busca", busca);
  if (pagina && pagina > 1) params.set("pagina", String(pagina));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export function TagCategoria({ categoria, escuro = false }: { categoria: Categoria; escuro?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
        escuro
          ? "border border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
          : "bg-cyan-50 text-secondary"
      }`}
    >
      {categoria.nome}
    </span>
  );
}

export function CapaPost({
  post,
  sizes,
  priority = false,
  className = "",
}: {
  post: Post;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[#041d2c] ${className}`}>
      {post.capa ? (
        <Image
          src={post.capa}
          alt={post.capaAlt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // Placeholder enquanto o post não tem imagem de capa.
        <div
          className="absolute inset-0 flex items-end p-5 transition-transform duration-500 group-hover:scale-105"
          style={{ background: "linear-gradient(135deg, #063755 0%, #0b3f5e 55%, #139A9E 100%)" }}
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-white/10" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            {post.categoria.nome}
          </span>
        </div>
      )}
    </div>
  );
}

export function MetaPost({ post, escuro = false }: { post: Post; escuro?: boolean }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${escuro ? "text-slate-300" : "text-slate-500"}`}>
      <time dateTime={post.publicadoEm}>{formatarData(post.publicadoEm)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <FaRegClock /> {post.tempoLeituraMin} min de leitura
      </span>
    </p>
  );
}

export function CardPost({ post }: { post: Post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <CapaPost post={post} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px" className="aspect-[16/9]" />
        <div className="flex flex-1 flex-col p-6">
          <div>
            <TagCategoria categoria={post.categoria} />
          </div>
          <h3 className="mt-4 text-lg font-bold leading-snug text-primary transition-colors group-hover:text-secondary">
            {post.titulo}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.resumo}</p>
          <div className="mt-auto pt-5">
            <MetaPost post={post} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PostDestaque({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="grid lg:grid-cols-2">
        <CapaPost
          post={post}
          sizes="(max-width: 1024px) 100vw, 512px"
          priority
          className="aspect-[16/9] lg:aspect-auto lg:min-h-80"
        />
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">Em destaque</p>
          <div className="mt-3">
            <TagCategoria categoria={post.categoria} />
          </div>
          <h2 className="mt-4 text-2xl font-black leading-tight text-primary transition-colors group-hover:text-secondary sm:text-3xl">
            {post.titulo}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{post.resumo}</p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <AutorPost autor={post.autor} />
            <MetaPost post={post} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export function AutorPost({ autor, escuro = false }: { autor: Autor; escuro?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
        {autor.foto ? (
          <Image src={autor.foto} alt="" fill sizes="40px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-bold text-primary">
            {autor.nome.charAt(0)}
          </span>
        )}
      </div>
      <div className="leading-tight">
        <p className={`text-sm font-bold ${escuro ? "text-white" : "text-primary"}`}>{autor.nome}</p>
        <p className={`text-xs ${escuro ? "text-slate-300" : "text-slate-500"}`}>
          {autor.cargo} · BMN Contabilidade
        </p>
      </div>
    </div>
  );
}

// Formulário GET: funciona sem JavaScript e mantém a categoria selecionada.
export function FiltrosBlog({
  categorias,
  categoriaAtual,
  busca,
}: {
  categorias: Categoria[];
  categoriaAtual?: string;
  busca?: string;
}) {
  const chip = (ativo: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
      ativo
        ? "border-secondary bg-secondary text-white"
        : "border-slate-200 bg-white text-slate-600 hover:border-secondary hover:text-secondary"
    }`;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Categorias" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <ul className="flex gap-2">
          <li>
            <Link href={hrefBlog({ busca })} className={chip(!categoriaAtual)}>
              Todos
            </Link>
          </li>
          {categorias.map((c) => (
            <li key={c.slug}>
              <Link
                href={hrefBlog({ categoria: c.slug, busca })}
                className={chip(categoriaAtual === c.slug)}
                aria-current={categoriaAtual === c.slug ? "page" : undefined}
              >
                {c.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <form action="/blog" method="get" role="search" className="relative w-full lg:w-72">
        {categoriaAtual && <input type="hidden" name="categoria" value={categoriaAtual} />}
        <label htmlFor="busca-blog" className="sr-only">
          Buscar no blog
        </label>
        <input
          id="busca-blog"
          type="search"
          name="busca"
          defaultValue={busca}
          placeholder="Buscar artigos"
          className="form-input !rounded-full !py-2.5 !pl-11"
        />
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
      </form>
    </div>
  );
}

export function Paginacao({
  pagina,
  totalPaginas,
  categoria,
  busca,
}: {
  pagina: number;
  totalPaginas: number;
  categoria?: string;
  busca?: string;
}) {
  if (totalPaginas <= 1) return null;

  const base = "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-colors";
  const normal = `${base} border-slate-200 bg-white text-slate-600 hover:border-secondary hover:text-secondary`;
  const desativado = `${base} pointer-events-none border-slate-100 bg-slate-50 text-slate-300`;

  return (
    <nav aria-label="Paginação" className="mt-12 flex items-center justify-center gap-2">
      <Link
        href={hrefBlog({ categoria, busca, pagina: pagina - 1 })}
        className={pagina > 1 ? normal : desativado}
        aria-disabled={pagina <= 1}
        aria-label="Página anterior"
      >
        <FaChevronLeft className="text-xs" />
      </Link>
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={hrefBlog({ categoria, busca, pagina: n })}
          aria-current={n === pagina ? "page" : undefined}
          className={n === pagina ? `${base} border-secondary bg-secondary text-white` : normal}
        >
          {n}
        </Link>
      ))}
      <Link
        href={hrefBlog({ categoria, busca, pagina: pagina + 1 })}
        className={pagina < totalPaginas ? normal : desativado}
        aria-disabled={pagina >= totalPaginas}
        aria-label="Próxima página"
      >
        <FaChevronRight className="text-xs" />
      </Link>
    </nav>
  );
}

export function Compartilhar({ post }: { post: Post }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const botao =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-secondary hover:text-secondary";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Compartilhar</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${post.titulo} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no WhatsApp"
        className={botao}
      >
        <FaWhatsapp />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no LinkedIn"
        className={botao}
      >
        <FaLinkedinIn />
      </a>
    </div>
  );
}
