"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { trackLead } from "@/lib/analytics";

const REGIMES = ["Simples Nacional", "Lucro Presumido", "Lucro Real", "MEI", "Não sei"];
const FUNCIONARIOS = ["Nenhum", "1 a 5", "6 a 20", "21 a 50", "Mais de 50"];

const ROTULOS: Record<string, string> = {
  nome: "Nome",
  whatsapp: "WhatsApp",
  cidade: "Cidade/UF",
  ramo: "Ramo da empresa",
  regime: "Regime tributário",
  funcionarios: "Número de funcionários",
  motivo: "Motivo do contato",
};

type LeadFormProps = {
  // Identifica a página no assunto do e-mail e nos eventos de conversão.
  origem: string;
  variante?: "claro" | "escuro";
  colunas?: 1 | 2;
  // "guia" pede só nome, WhatsApp e ramo (isca do Guia da Reforma).
  modo?: "completo" | "guia";
  textoBotao?: string;
  mensagemSucesso?: string;
};

const ESTILOS = {
  claro: {
    label: "form-label",
    input: "form-input w-full",
    texto: "text-gray-500",
    link: "text-secondary underline hover:text-primary",
    botao: "btn btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed",
    sucessoTitulo: "text-primary",
    sucessoIcone: "text-secondary",
    erro: "text-red-500",
  },
  escuro: {
    label: "mb-1 block text-sm font-medium text-cyan-50",
    input:
      "w-full rounded-lg border border-cyan-100/25 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/60 [&>option]:text-slate-900",
    texto: "text-slate-200/80",
    link: "text-cyan-200 underline hover:text-white",
    botao:
      "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60",
    sucessoTitulo: "text-white",
    sucessoIcone: "text-cyan-300",
    erro: "text-red-300",
  },
};

export default function LeadForm({
  origem,
  variante = "claro",
  colunas = 2,
  modo = "completo",
  textoBotao = "Enviar",
  mensagemSucesso = "Em breve nossa equipe entrará em contato pelo WhatsApp.",
}: LeadFormProps) {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const uid = useId();
  const s = ESTILOS[variante];
  const grid = colunas === 2 ? "grid gap-4 sm:grid-cols-2" : "grid gap-4";
  const largura = colunas === 2 ? "sm:col-span-2" : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setEnviando(true);
    setErro(null);

    const dados = new FormData(form);
    const campos = Object.entries(ROTULOS)
      .map(([campo, label]) => {
        const valor = dados.get(campo);
        return valor ? { label, valor: String(valor) } : null;
      })
      .filter((c): c is { label: string; valor: string } => c !== null);

    campos.push({ label: "Página de origem", valor: origem });

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assunto: `Novo lead: ${origem}`,
          campos,
          honeypot: dados.get("website") ?? "",
        }),
      });

      if (!res.ok) throw new Error("Falha no envio");

      trackLead(origem);
      setEnviado(true);
      form.reset();
    } catch {
      setErro("Não foi possível enviar. Tente novamente em instantes ou chame no WhatsApp.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <FaCheckCircle className={`mb-4 text-5xl ${s.sucessoIcone}`} />
        <h3 className={`text-lg font-bold ${s.sucessoTitulo}`}>Recebemos seus dados!</h3>
        <p className={`mt-2 text-sm ${s.texto}`}>{mensagemSucesso}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={grid}>
      {/* Honeypot anti-spam: só bots preenchem */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className={largura}>
        <label htmlFor={`${uid}-nome`} className={s.label}>
          Nome *
        </label>
        <input id={`${uid}-nome`} name="nome" type="text" required maxLength={120} placeholder="Seu nome" className={s.input} />
      </div>

      <div className={modo === "guia" ? largura : ""}>
        <label htmlFor={`${uid}-whatsapp`} className={s.label}>
          WhatsApp *
        </label>
        <input
          id={`${uid}-whatsapp`}
          name="whatsapp"
          type="tel"
          required
          minLength={10}
          maxLength={20}
          placeholder="(00) 00000-0000"
          className={s.input}
        />
      </div>

      {modo === "completo" && (
        <div>
          <label htmlFor={`${uid}-cidade`} className={s.label}>
            Cidade/UF *
          </label>
          <input id={`${uid}-cidade`} name="cidade" type="text" required maxLength={80} placeholder="Ex.: Recife/PE" className={s.input} />
        </div>
      )}

      <div className={modo === "guia" ? largura : ""}>
        <label htmlFor={`${uid}-ramo`} className={s.label}>
          Ramo da empresa *
        </label>
        <input id={`${uid}-ramo`} name="ramo" type="text" required maxLength={120} placeholder="Ex.: comércio, serviços" className={s.input} />
      </div>

      {modo === "completo" && (
        <>
          <div>
            <label htmlFor={`${uid}-regime`} className={s.label}>
              Regime tributário *
            </label>
            <select id={`${uid}-regime`} name="regime" required defaultValue="" className={s.input}>
              <option value="" disabled>
                Selecione
              </option>
              {REGIMES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={`${uid}-funcionarios`} className={s.label}>
              Número de funcionários *
            </label>
            <select id={`${uid}-funcionarios`} name="funcionarios" required defaultValue="" className={s.input}>
              <option value="" disabled>
                Selecione
              </option>
              {FUNCIONARIOS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div className={largura}>
            <label htmlFor={`${uid}-motivo`} className={s.label}>
              Motivo do contato *
            </label>
            <textarea
              id={`${uid}-motivo`}
              name="motivo"
              required
              rows={3}
              maxLength={1000}
              placeholder="Conte em poucas palavras o que você precisa"
              className={`${s.input} resize-none`}
            />
          </div>
        </>
      )}

      <label className={`flex items-start gap-2 text-xs leading-relaxed ${s.texto} ${largura}`}>
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-500" />
        <span>
          Li e concordo com a{" "}
          <Link href="/politica-de-privacidade" target="_blank" className={s.link}>
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      <div className={largura}>
        {erro && <p className={`mb-3 text-xs ${s.erro}`}>{erro}</p>}
        <button type="submit" disabled={enviando} className={s.botao}>
          {enviando ? (
            <>
              <FaSpinner className="animate-spin" />
              Enviando...
            </>
          ) : (
            textoBotao
          )}
        </button>
      </div>
    </form>
  );
}
