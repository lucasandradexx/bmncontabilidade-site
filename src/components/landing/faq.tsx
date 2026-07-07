"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaChevronDown } from "react-icons/fa";

const PERGUNTAS = [
  {
    pergunta: "Quanto tempo leva para abrir uma empresa?",
    resposta:
      "O prazo médio varia entre 5 e 15 dias, dependendo da atividade, localização do endereço e agilidade na entrega das informações. Com documentação correta e análise prévia adequada, o processo tende a ser mais rápido e previsível.",
  },
  {
    pergunta: "Quanto custa para abrir uma empresa?",
    resposta:
      "O custo varia conforme o tipo de negócio, natureza jurídica e taxas envolvidas (como registros na Junta Comercial). O ideal é realizar uma análise inicial para apresentar um valor alinhado à realidade do negócio.",
  },
  {
    pergunta: "Preciso de contador para abrir uma empresa?",
    resposta:
      "Sim. A abertura de um CNPJ exige a atuação de um contador habilitado, pois envolve a definição correta das atividades, elaboração do contrato social, registros nos órgãos competentes e enquadramento adequado da empresa.",
  },
  {
    pergunta: "Posso abrir uma empresa sem endereço comercial?",
    resposta:
      "Não. É necessário informar um endereço válido para os registros oficiais e análise de viabilidade. O endereço pode ser comercial, residencial (quando permitido) ou em coworking, desde que atenda às exigências legais.",
  },
  {
    pergunta: "Quando é o melhor momento para trocar de contador?",
    resposta:
      "Quando a empresa não recebe suporte necessário, enfrenta dificuldades de comunicação, falta de orientação ou ausência de atuação consultiva. Uma contabilidade eficiente oferece proximidade, clareza e apoio nas decisões do negócio.",
  },
];

export default function FAQ() {
  const [aberto, setAberto] = useState<number | null>(0);
  const { ref, inView }     = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="faq" className="section-padding bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="tag-section">FAQ</span>
          <h2 className="section-title mt-2">
            Confira respostas rápidas para suas dúvidas:
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {PERGUNTAS.map((item, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-500
                          ${aberto === i
                            ? "border-secondary shadow-md shadow-secondary/10"
                            : "border-gray-200 hover:border-gray-300"
                          }
                          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {/* Pergunta */}
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                className="w-full flex items-center justify-between text-left
                           px-6 py-5 hover:bg-gray-50 transition-colors duration-200"
              >
                <span
                  className={`text-sm md:text-base font-semibold transition-colors duration-200
                              ${aberto === i ? "text-secondary" : "text-primary"}`}
                >
                  {item.pergunta}
                </span>

                <FaChevronDown
                  className={`text-secondary text-sm flex-shrink-0 ml-4
                               transition-transform duration-300
                               ${aberto === i ? "rotate-180" : ""}`}
                />
              </button>

              {/* Resposta */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out
                            ${aberto === i ? "max-h-64" : "max-h-0"}`}
              >
                <p className="px-6 pb-6 pt-2 text-sm text-gray-500 leading-relaxed
                              border-t border-gray-100">
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