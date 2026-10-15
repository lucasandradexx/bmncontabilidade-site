"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaExternalLinkAlt, FaFolder, FaNewspaper, FaPlus, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { sair } from "@/app/admin/acoes";

const LINKS = [
  { href: "/admin/posts", label: "Artigos", icone: FaNewspaper },
  { href: "/admin/categorias", label: "Categorias", icone: FaFolder },
  { href: "/admin/autores", label: "Autores", icone: FaUserEdit },
];

export default function NavAdmin({ usuario }: { usuario: string }) {
  const pathname = usePathname();

  const item = (ativo: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
      ativo ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <nav className="flex h-full flex-col gap-1">
      <Link
        href="/admin/posts/novo"
        className="mb-4 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
      >
        <FaPlus /> Novo artigo
      </Link>

      {LINKS.map(({ href, label, icone: Icone }) => (
        <Link
          key={href}
          href={href}
          className={item(pathname === href || (href === "/admin/posts" && pathname.startsWith("/admin/posts/") && pathname !== "/admin/posts/novo"))}
        >
          <Icone className="text-secondary" /> {label}
        </Link>
      ))}

      <a href="/blog" target="_blank" rel="noopener noreferrer" className={item(false)}>
        <FaExternalLinkAlt className="text-secondary text-xs" /> Ver o blog
      </a>

      <div className="mt-auto border-t border-white/10 pt-4">
        <p className="px-3 text-xs text-white/45">Conectado como</p>
        <p className="px-3 text-sm font-semibold text-white">{usuario}</p>
        <form action={sair} className="mt-2">
          <button type="submit" className={`${item(false)} w-full`}>
            <FaSignOutAlt className="text-secondary" /> Sair
          </button>
        </form>
      </div>
    </nav>
  );
}
