"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaChevronDown } from "react-icons/fa";

const PERGUNTAS = [
  {
    pergunta: "A BMN vai ter acesso ao meu dinheiro?",
    resposta:
      "Não. Nós apenas preparamos os agendamentos. A aprovação final e a senha master do banco ficam sempre com você.",
  },
  {
    pergunta: "Minha empresa é muito pequena, o BPO serve para mim?",
    resposta:
      "Sim! O Plano Essencial foi criado exatamente para microempresas que precisam de organização desde o início e contarem com um suporte financeiro acessível.",
  },
  {
    pergunta: "Como envio os documentos para vocês?",
    resposta:
      "Tudo é feito de forma 100% digital, por meio de uma plataforma segura ou integração direta com o seu sistema de gestão.",
  },
  {
    pergunta: "O BPO substitui a contabilidade?",
    resposta:
      "Não. O BPO Financeiro complementa a contabilidade e foca no operacional financeiro do dia a dia, como pagamentos, conciliação, fluxo de caixa e relatórios.",
  },
  {
    pergunta: "Posso mudar de plano depois?",
    resposta:
      "Sim. À medida que sua empresa cresce ou muda de demanda, você pode migrar para um plano com mais capacidade e suporte, conforme sua operação.",
  },
];

export default function BpoFaq() {
  const [aberto, setAberto] = useState<number | null>(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="section-padding bg-white" ref={ref}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="tag-section">FAQ</span>
          <h2 className="section-title mt-2">Confira respostas rápidas para suas dúvidas:</h2>
        </div>

        <div className="space-y-3">
          {PERGUNTAS.map((item, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-all duration-500 ${
                aberto === i
                  ? "border-secondary shadow-md shadow-secondary/10"
                  : "border-gray-200 hover:border-gray-300"
              } ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50"
              >
                <span
                  className={`text-sm font-semibold transition-colors duration-200 md:text-base ${
                    aberto === i ? "text-secondary" : "text-primary"
                  }`}
                >
                  {item.pergunta}
                </span>

                <FaChevronDown
                  className={`ml-4 flex-shrink-0 text-sm text-secondary transition-transform duration-300 ${
                    aberto === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  aberto === i ? "max-h-64" : "max-h-0"
                }`}
              >
                <p className="border-t border-gray-100 px-6 pb-6 pt-2 text-sm leading-relaxed text-gray-500">
                  {item.resposta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
