// Peças visuais comuns do painel /admin.
import type { ReactNode } from "react";
import { STATUS_LABEL, type StatusPost } from "@/lib/blogTipos";

export const INPUT =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/10 disabled:bg-slate-50";

export const LABEL = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500";

const BOTAO_BASE =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50";

export const BOTAO = {
  primario: `${BOTAO_BASE} bg-secondary text-white hover:bg-primary`,
  escuro: `${BOTAO_BASE} bg-primary text-white hover:bg-[#041d2c]`,
  secundario: `${BOTAO_BASE} border border-slate-200 bg-white text-slate-700 hover:border-secondary hover:text-secondary`,
  perigo: `${BOTAO_BASE} border border-red-200 bg-white text-red-600 hover:bg-red-50`,
  link: "text-sm font-semibold text-secondary hover:underline disabled:opacity-50",
};

export const CARTAO = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

const COR_STATUS: Record<StatusPost, string> = {
  publicado: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  agendado: "bg-sky-50 text-sky-700 ring-sky-600/20",
  rascunho: "bg-amber-50 text-amber-700 ring-amber-600/20",
  arquivado: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export function BadgeStatus({ status }: { status: StatusPost }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${COR_STATUS[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

export function Aviso({ tipo, children }: { tipo: "sucesso" | "erro"; children: ReactNode }) {
  return (
    <p
      role={tipo === "erro" ? "alert" : "status"}
      className={`rounded-xl px-4 py-3 text-sm font-medium ${
        tipo === "erro"
          ? "border border-red-200 bg-red-50 text-red-700"
          : "border border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {children}
    </p>
  );
}

export function CabecalhoPagina({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-black text-primary">{titulo}</h1>
        {descricao && <p className="mt-1 text-sm text-slate-500">{descricao}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
