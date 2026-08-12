"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Primeiro contato",
    descricao:
      "Coletamos informações iniciais, compreendemos o cenário da empresa e iniciamos a construção de uma relação pautada em ética, transparência e compromisso técnico.",
  },
  {
    numero: "02",
    titulo: "Diagnóstico técnico gratuito",
    descricao:
      "Realizamos uma análise técnica inicial com base nas informações fornecidas, identificando riscos, inconsistências e oportunidades para orientar com clareza e segurança.",
  },
  {
    numero: "03",
    titulo: "Alinhamento e formalização contratual",
    descricao:
      "Reunião técnica para apresentação da proposta de trabalho, com definição clara de escopo, prazos, responsabilidades, entregas e honorários.",
  },
  {
    numero: "04",
    titulo: "Integração e início das atividades",
    descricao:
      "Assumimos integralmente a gestão contábil com rigor técnico, sigilo profissional e foco em eficiência, conformidade e entrega de valor contínuo.",
  },
];

export default function Processos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [indiceAtivo, setIndiceAtivo] = useState(0);

  const moverParaIndice = (proximoIndice: number) => {
    const container = carouselRef.current;
    const cards = container?.querySelectorAll("[data-card-slide]");
    const card = cards?.[proximoIndice] as HTMLElement | undefined;

    if (!container || !card) return;

    const left = card.offsetLeft - 12;
    container.scrollTo({ left, behavior: "smooth" });
    setIndiceAtivo(proximoIndice);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndiceAtivo((atual) => {
        const proximo = (atual + 1) % ETAPAS.length;
        moverParaIndice(proximo);
        return proximo;
      });
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="processos"
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: "#f7f8fa" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="tag-section">Nossos Processos</span>
          <h2 className="section-title mt-2 mx-auto max-w-2xl">
            Rigor técnico, sigilo profissional e uma jornada conduzida com excelência.
          </h2>
          <p className="section-text mx-auto mt-2 text-center">
            Cada etapa é conduzida com precisão técnica, comunicação objetiva e alinhamento
            integral às particularidades e metas do cliente.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
        >
          {ETAPAS.map((e, i) => (
            <div
              key={i}
              data-card-slide
              className={`group card-glass text-center min-w-[84vw] sm:min-w-[300px] snap-center
                          transition-all duration-700 lg:min-w-0
                          ${inView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                          }`}
              style={{ transitionDelay: `${150}ms` }}
            >
              {/* Número */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center
                           text-white font-extrabold text-lg mb-5"
                style={{ background: "linear-gradient(135deg, #139A9E, #063755)" }}
              >
                {e.numero}
              </div>

              <h3 className="text-base font-bold text-primary mb-3">{e.titulo}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{e.descricao}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2 lg:hidden">
          {ETAPAS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para etapa ${index + 1}`}
              onClick={() => moverParaIndice(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                indiceAtivo === index ? "w-8 bg-primary" : "w-2.5 bg-primary/30"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <Link href="#contato" className="btn btn-primary">
            Fale conosco
          </Link>
        </div>
      </div>
    </section>
  );
}