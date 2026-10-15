// Blocos reutilizados pelas páginas estratégicas, legais e de captação.
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import { SOCIOS, waLink } from "@/lib/empresa";

type Variante = "primario" | "secundario";

const BOTAO: Record<Variante, string> = {
  primario:
    "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300 sm:w-auto",
  secundario:
    "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:w-auto",
};

export function BotaoWhatsApp({
  mensagem,
  children,
  variante = "primario",
}: {
  mensagem: string;
  children: ReactNode;
  variante?: Variante;
}) {
  return (
    <a href={waLink(mensagem)} target="_blank" rel="noopener noreferrer" className={BOTAO[variante]}>
      <FaWhatsapp className="text-lg" />
      {children}
    </a>
  );
}

export function BotaoLink({
  href,
  children,
  variante = "primario",
}: {
  href: string;
  children: ReactNode;
  variante?: Variante;
}) {
  return (
    <Link href={href} className={BOTAO[variante]}>
      {children}
    </Link>
  );
}

export function HeroPagina({
  tag,
  titulo,
  subtitulo,
  children,
  nota,
}: {
  tag: string;
  titulo: string;
  subtitulo: string;
  children?: ReactNode;
  nota?: string;
}) {
  return (
    <section className="bg-[#041d2c] text-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
          {tag}
        </span>
        <h1 className="mt-6 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
          {titulo}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
          {subtitulo}
        </p>
        {children && <div className="mt-8 flex flex-col gap-4 sm:flex-row">{children}</div>}
        {nota && <p className="mt-4 text-sm text-cyan-100/80">{nota}</p>}
      </div>
    </section>
  );
}

const FUNDO = {
  branco: "bg-white",
  cinza: "bg-slate-50",
};

export function Secao({
  id,
  tag,
  titulo,
  descricao,
  fundo = "branco",
  children,
}: {
  id?: string;
  tag?: string;
  titulo: string;
  descricao?: string;
  fundo?: keyof typeof FUNDO;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${FUNDO[fundo]} py-16 sm:py-20`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {tag && <span className="tag-section">{tag}</span>}
          <h2 className="section-title mt-2">{titulo}</h2>
          {descricao && <p className="mt-3 text-base leading-relaxed text-gray-600">{descricao}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function ListaCheck({ itens, colunas = 1 }: { itens: ReactNode[]; colunas?: 1 | 2 }) {
  return (
    <ul className={`grid gap-3 ${colunas === 2 ? "md:grid-cols-2" : ""}`}>
      {itens.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-sm"
        >
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-[10px] text-cyan-700">
            <FaCheck />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Tabela({
  cabecalho,
  linhas,
}: {
  cabecalho: [string, string];
  linhas: [string, string][];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1fr_1.4fr] bg-[#0b3f5e] text-xs font-bold uppercase tracking-wide text-white sm:grid">
        <div className="px-5 py-3">{cabecalho[0]}</div>
        <div className="px-5 py-3">{cabecalho[1]}</div>
      </div>
      {linhas.map(([a, b]) => (
        <div
          key={a}
          className="grid border-t border-slate-100 first:border-t-0 sm:grid-cols-[1fr_1.4fr] sm:first:border-t"
        >
          <div className="px-5 pt-4 text-sm font-bold text-primary sm:py-4">{a}</div>
          <div className="px-5 pb-4 pt-1 text-sm leading-relaxed text-slate-600 sm:py-4">{b}</div>
        </div>
      ))}
    </div>
  );
}

export function Passos({ passos }: { passos: { titulo: string; descricao: string }[] }) {
  return (
    <ol className={`grid gap-5 ${passos.length > 3 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
      {passos.map((p, i) => (
        <li key={p.titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-base font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, #139A9E, #063755)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 text-base font-bold text-primary">{p.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.descricao}</p>
        </li>
      ))}
    </ol>
  );
}

export function FaqLista({ itens }: { itens: { pergunta: string; resposta: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {itens.map((item) => (
        <details
          key={item.pergunta}
          className="group rounded-xl border border-slate-200 bg-white p-5 transition-colors open:border-secondary"
        >
          <summary className="cursor-pointer list-none font-semibold text-primary marker:hidden group-open:text-secondary">
            {item.pergunta}
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.resposta}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaFinal({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-[#041d2c] py-20 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black sm:text-4xl">{titulo}</h2>
        {descricao && <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">{descricao}</p>}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">{children}</div>
      </div>
    </section>
  );
}

// Foto, nome, cargo e registro de cada sócio. Bio e CRC aparecem quando preenchidos em lib/empresa.
export function CardsSocios() {
  return (
    <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
      {SOCIOS.map((socio) => (
        <article
          key={socio.nome}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm"
        >
          <div className="relative h-80 w-full bg-slate-100">
            <Image
              src={socio.foto}
              alt={`${socio.nome}, ${socio.cargo} da BMN Contabilidade Estratégica`}
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover"
              style={{ objectPosition: socio.objectPosition }}
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-bold text-primary">{socio.nome}</h3>
            <p className="text-sm font-medium text-secondary">
              {socio.cargo}
              {socio.registro ? ` · ${socio.registro}` : ""}
            </p>
            {socio.bio && <p className="mt-3 text-sm leading-relaxed text-slate-600">{socio.bio}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
