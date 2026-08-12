"use client";

import { useState } from "react";

const SUGGESTIONS = [
  {
    question: "Quero abrir uma empresa",
    answer:
      "Perfeito! Posso te ajudar com o tipo societário, documentação necessária e próximos passos para começar com segurança.",
    followUps: [],
  },
  {
    question: "Como funciona o planejamento tributário?",
    answer:
      "O planejamento tributário identifica a melhor forma de pagar menos impostos dentro da lei, deixando sua empresa mais competitiva e segura.",
    followUps: [],
  },
  {
    question: "Quais serviços vocês oferecem para o meu negócio?",
    answer:
      "Oferecemos contabilidade consultiva, abertura de empresas, BPO fiscal/financeiro, gestão financeira e suporte tributário completo.",
    followUps: [],
  },
];

const INITIAL_MESSAGE =
  "Olá, sou o Assistente da BMN. Como posso lhe ajudar hoje?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [availableSuggestions, setAvailableSuggestions] = useState(SUGGESTIONS);
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: INITIAL_MESSAGE },
  ]);
  const [typing, setTyping] = useState(false);

  const handleSuggestion = (index: number) => {
    const suggestion = availableSuggestions[index];
    setAvailableSuggestions(suggestion.followUps ?? []);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: suggestion.question },
    ]);

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: suggestion.answer },
      ]);
    }, 600);
  };

  const resetChat = () => {
    setAvailableSuggestions(SUGGESTIONS);
    setMessages([{ role: "bot", text: INITIAL_MESSAGE }]);
    setTyping(false);
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

              {availableSuggestions.length > 0 && (
                <div className="self-start rounded-3xl bg-white p-3 shadow-sm">
                  <div className="grid gap-3">
                    {availableSuggestions.map((item, index) => (
                      <button
                        key={item.question}
                        type="button"
                        onClick={() => handleSuggestion(index)}
                        className="w-full cursor-pointer rounded-2xl border border-[#139A9E] bg-white px-3 py-3 text-left text-xs font-semibold text-[#139A9E] transition hover:bg-[#effdfb]"
                      >
                        {item.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
