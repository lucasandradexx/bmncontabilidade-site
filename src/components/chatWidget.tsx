"use client";

import { useEffect, useRef, useState } from "react";
import { FLUXO_CONVERSA, NO_INICIAL, type CampoLead } from "@/lib/chatFlow";

type Mensagem = { role: "user" | "bot"; text: string };
type RespostasLead = Partial<Record<CampoLead, string>>;

const ROTULOS_LEAD: Record<CampoLead, string> = {
  nome: "Nome",
  produtoServico: "Produto ou serviço",
  funcionamentoNegocio: "Como funciona o negócio",
  clientesAlvo: "Clientes-alvo",
  formatoAtividade: "Formato da atividade",
  razaoSocialCnpj: "Nome da empresa e CNPJ",
  atividadePrincipal: "Atividade principal",
  faturamentoMedio: "Faturamento médio mensal",
  motivoTroca: "Motivo da troca",
  expectativaNovaContabilidade: "O que espera da nova contabilidade",
  prazoTroca: "Prazo para trocar",
  telefone: "Telefone",
};

function mensagemInicial(): Mensagem[] {
  const no = FLUXO_CONVERSA[NO_INICIAL];
  return no.tipo === "pergunta_aberta" ? [{ role: "bot", text: no.pergunta }] : [];
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Mensagem[]>(mensagemInicial);
  const [currentNodeId, setCurrentNodeId] = useState(NO_INICIAL);
  const [respostas, setRespostas] = useState<RespostasLead>({});
  const [inputValue, setInputValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [enviandoLead, setEnviandoLead] = useState(false);
  const [leadEnviado, setLeadEnviado] = useState(false);
  const [erroLead, setErroLead] = useState(false);

  const noAtual = FLUXO_CONVERSA[currentNodeId];
  const fimDasMensagensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimDasMensagensRef.current?.scrollIntoView({ block: "end" });
  }, [messages, typing, noAtual.tipo, enviandoLead, leadEnviado, erroLead]);

  async function enviarLead(respostasFinais: RespostasLead) {
    setEnviandoLead(true);
    setErroLead(false);

    const campos = Object.entries(respostasFinais)
      .filter((entry): entry is [CampoLead, string] => Boolean(entry[1]))
      .map(([campo, valor]) => ({ label: ROTULOS_LEAD[campo], valor }));

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assunto: `Novo lead via chat do site — ${respostasFinais.nome ?? "Visitante"}`,
          campos,
        }),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setLeadEnviado(true);
    } catch {
      setErroLead(true);
    } finally {
      setEnviandoLead(false);
    }
  }

  function mostrarNo(nodeId: string, respostasAtuais: RespostasLead = respostas) {
    const no = FLUXO_CONVERSA[nodeId];
    if (!no) return;

    setCurrentNodeId(nodeId);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const texto = no.tipo === "fim" || no.tipo === "informativo" ? no.mensagem : no.pergunta;
      setMessages((prev) => [...prev, { role: "bot", text: texto }]);

      if (no.tipo === "informativo") {
        setTimeout(() => mostrarNo(no.proximo, respostasAtuais), 900);
      }
      if (no.tipo === "fim") {
        enviarLead(respostasAtuais);
      }
    }, 600);
  }

  function handleOpcao(opcao: { texto: string; proximo: string }) {
    setMessages((prev) => [...prev, { role: "user", text: opcao.texto }]);
    mostrarNo(opcao.proximo);
  }

  function handleEscolhaUnica(opcaoTexto: string) {
    if (noAtual.tipo !== "escolha_unica") return;

    const novasRespostas: RespostasLead = { ...respostas, [noAtual.campo]: opcaoTexto };
    setRespostas(novasRespostas);
    setMessages((prev) => [...prev, { role: "user", text: opcaoTexto }]);
    mostrarNo(noAtual.proximo, novasRespostas);
  }

  function handleEnviarResposta() {
    if (noAtual.tipo !== "pergunta_aberta") return;
    const valor = inputValue.trim();
    if (!valor) return;

    const novasRespostas: RespostasLead = { ...respostas, [noAtual.campo]: valor };
    setRespostas(novasRespostas);
    setMessages((prev) => [...prev, { role: "user", text: valor }]);
    setInputValue("");
    mostrarNo(noAtual.proximo, novasRespostas);
  }

  const resetChat = () => {
    setMessages(mensagemInicial());
    setCurrentNodeId(NO_INICIAL);
    setRespostas({});
    setInputValue("");
    setTyping(false);
    setEnviandoLead(false);
    setLeadEnviado(false);
    setErroLead(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open && (
        <div className="h-[540px] w-[320px] sm:w-[360px] rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-2 rounded-t-[28px] bg-gradient-to-r from-secondary via-primary to-[#0f5c72] px-3 py-3 text-white shadow-sm">
            <div className="flex items-center gap-2">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg shadow-secondary/20">
                <img
                  src="/logo-bmn-st-black.svg"
                  alt="BMN"
                  className="h-8 w-8 object-contain"
                />
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#3fd55f] ring-2 ring-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Olá, sou o Assistente da BMN</p>
                <p className="text-xs text-slate-100/80">Como posso lhe ajudar hoje?</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetChat}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 transition hover:bg-white/20"
                aria-label="Atualizar chat"
              >
                <img src="/atualizar.svg" alt="Atualizar" className="h-5 w-5 filter invert" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/25 bg-white/10 transition hover:bg-white/20"
                aria-label="Fechar chat"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100%-88px)] flex-col justify-between p-4">
            <div className="flex h-full flex-col gap-3 overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] ${
                    message.role === "user"
                      ? "self-end rounded-3xl bg-secondary px-4 py-3 text-left text-white"
                      : "self-start rounded-3xl bg-white px-4 py-3 text-left text-slate-800 shadow-sm"
                  }`}
                >
                  <p className="text-xs leading-5">{message.text}</p>
                </div>
              ))}

              {typing && (
                <div className="self-start rounded-3xl bg-white px-4 py-3 text-left text-slate-800 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary" />
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary delay-75" />
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary delay-150" />
                  </div>
                </div>
              )}

              {!typing && noAtual.tipo === "menu" && (
                <div className="self-start rounded-3xl bg-white p-3 shadow-sm">
                  <div className="grid gap-3">
                    {noAtual.opcoes.map((opcao) => (
                      <button
                        key={opcao.texto}
                        type="button"
                        onClick={() => handleOpcao(opcao)}
                        className="w-full cursor-pointer rounded-2xl border border-[#139A9E] bg-white px-3 py-3 text-left text-xs font-semibold text-[#139A9E] transition hover:bg-[#effdfb]"
                      >
                        {opcao.texto}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!typing && noAtual.tipo === "escolha_unica" && (
                <div className="self-start rounded-3xl bg-white p-3 shadow-sm">
                  <div className="grid gap-3">
                    {noAtual.opcoes.map((opcaoTexto) => (
                      <button
                        key={opcaoTexto}
                        type="button"
                        onClick={() => handleEscolhaUnica(opcaoTexto)}
                        className="w-full cursor-pointer rounded-2xl border border-[#139A9E] bg-white px-3 py-3 text-left text-xs font-semibold text-[#139A9E] transition hover:bg-[#effdfb]"
                      >
                        {opcaoTexto}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!typing && noAtual.tipo === "fim" && (
                <div className="self-start rounded-3xl bg-white px-4 py-3 text-left shadow-sm">
                  {enviandoLead && (
                    <p className="text-xs text-slate-500">Enviando suas informações...</p>
                  )}
                  {leadEnviado && (
                    <p className="text-xs text-emerald-600">Informações enviadas com sucesso ✓</p>
                  )}
                  {erroLead && (
                    <p className="text-xs text-red-500">
                      Não foi possível enviar suas informações. Tente novamente mais tarde.
                    </p>
                  )}
                </div>
              )}

              <div ref={fimDasMensagensRef} />
            </div>

            {!typing && noAtual.tipo === "pergunta_aberta" && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleEnviarResposta();
                }}
                className="mt-3 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Digite sua resposta..."
                  autoFocus
                  className="w-full rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-800 outline-none transition focus:border-secondary"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full bg-secondary text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Enviar resposta"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4Z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-secondary text-white shadow-[0_18px_45px_rgba(19,154,158,0.35)] ring-1 ring-white transition hover:scale-105"
        aria-label={open ? "Fechar chat de suporte" : "Abrir chat de suporte"}
      >
        <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#3fd55f] ring-2 ring-white" />
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h8" />
          <path d="M8 14h4" />
        </svg>
      </button>
    </div>
  );
}
