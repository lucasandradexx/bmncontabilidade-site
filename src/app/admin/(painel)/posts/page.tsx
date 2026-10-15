import type { Metadata } from "next";
import Link from "next/link";
import { FaEye, FaPen, FaPlus, FaSearch } from "react-icons/fa";
import BotaoExcluirPost from "@/components/admin/botaoExcluirPost";
import { BOTAO, BadgeStatus, CabecalhoPagina, INPUT } from "@/components/admin/ui";
import { exigirSessao } from "@/lib/admin/sessao";
import { listarAutores, listarCategorias, listarPosts } from "@/lib/blogDados";
import { STATUS_LABEL, formatarDataHora, statusEfetivo, type StatusPost } from "@/lib/blogTipos";

export const metadata: Metadata = { title: "Artigos" };

const ABAS: (StatusPost | "todos")[] = ["todos", "publicado", "agendado", "rascunho", "arquivado"];

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostsAdminPage({ searchParams }: PageProps) {
  await exigirSessao();
  const params = await searchParams;
  const aba = ABAS.find((a) => a === params.status) ?? "todos";
  const busca = typeof params.busca === "string" ? params.busca.trim() : "";

  const [registros, categorias, autores] = await Promise.all([listarPosts(), listarCategorias(), listarAutores()]);
  const todos = registros.map((p) => ({ ...p, statusAtual: statusEfetivo(p) }));

  const contagem = Object.fromEntries(
    ABAS.map((a) => [a, a === "todos" ? todos.length : todos.filter((p) => p.statusAtual === a).length]),
  );

  const termo = busca.toLowerCase();
  const posts = todos.filter(
    (p) => (aba === "todos" || p.statusAtual === aba) && (!termo || p.titulo.toLowerCase().includes(termo)),
  );

  const href = (status: string) => {
    const qs = new URLSearchParams();
    if (status !== "todos") qs.set("status", status);
    if (busca) qs.set("busca", busca);
    return `/admin/posts${qs.size ? `?${qs}` : ""}`;
  };

  return (
    <>
      <CabecalhoPagina titulo="Artigos" descricao="Escreva, revise e publique os artigos do blog.">
        <Link href="/admin/posts/novo" className={BOTAO.primario}>
          <FaPlus /> Novo artigo
        </Link>
      </CabecalhoPagina>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <nav aria-label="Filtrar por status" className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
          <ul className="flex gap-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
            {ABAS.map((a) => (
              <li key={a}>
                <Link
                  href={href(a)}
                  aria-current={aba === a ? "page" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    aba === a ? "bg-primary text-white" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {a === "todos" ? "Todos" : `${STATUS_LABEL[a]}s`}
                  <span className={`text-xs ${aba === a ? "text-white/70" : "text-slate-400"}`}>{contagem[a]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <form action="/admin/posts" className="relative w-full lg:w-72">
          {aba !== "todos" && <input type="hidden" name="status" value={aba} />}
          <input
            type="search"
            name="busca"
            defaultValue={busca}
            placeholder="Buscar pelo título"
            aria-label="Buscar pelo título"
            className={`${INPUT} !pl-10`}
          />
          <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {posts.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-bold text-primary">Nenhum artigo aqui</p>
            <p className="mt-1 text-sm text-slate-500">
              {busca ? "Tente outra busca." : "Que tal começar um agora?"}
            </p>
            <Link href="/admin/posts/novo" className={`${BOTAO.primario} mt-5`}>
              <FaPlus /> Novo artigo
            </Link>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3 font-bold">Título</th>
                <th className="hidden px-5 py-3 font-bold md:table-cell">Status</th>
                <th className="hidden px-5 py-3 font-bold xl:table-cell">Categoria</th>
                <th className="hidden px-5 py-3 font-bold xl:table-cell">Autor</th>
                <th className="hidden px-5 py-3 font-bold lg:table-cell">Data</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <Link href={`/admin/posts/${p.id}`} className="font-semibold text-primary hover:text-secondary">
                      {p.titulo || "(sem título)"}
                    </Link>
                    {p.destaque && (
                      <span className="ml-2 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary">
                        Destaque
                      </span>
                    )}
                    <div className="mt-1 md:hidden">
                      <BadgeStatus status={p.statusAtual} />
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <BadgeStatus status={p.statusAtual} />
                  </td>
                  <td className="hidden px-5 py-4 text-slate-600 xl:table-cell">
                    {categorias.find((c) => c.id === p.categoriaId)?.nome ?? "—"}
                  </td>
                  <td className="hidden px-5 py-4 text-slate-600 xl:table-cell">
                    {autores.find((a) => a.id === p.autorId)?.nome ?? "—"}
                  </td>
                  <td className="hidden px-5 py-4 text-slate-500 lg:table-cell">
                    {p.statusAtual === "publicado" || p.statusAtual === "agendado"
                      ? formatarDataHora(p.publicadoEm!)
                      : `Editado ${formatarDataHora(p.editadoEm)}`}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/posts/${p.id}`}
                        title="Editar"
                        aria-label={`Editar ${p.titulo}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-secondary"
                      >
                        <FaPen />
                      </Link>
                      <Link
                        href={p.statusAtual === "publicado" ? `/blog/${p.slug}` : `/admin/previa/${p.id}`}
                        target="_blank"
                        title={p.statusAtual === "publicado" ? "Ver no site" : "Pré-visualizar"}
                        aria-label={`Ver ${p.titulo}`}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-secondary"
                      >
                        <FaEye />
                      </Link>
                      <BotaoExcluirPost id={p.id} titulo={p.titulo} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
