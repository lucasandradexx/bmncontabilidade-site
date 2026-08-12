"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaStore, FaHeadset, FaUserTie } from "react-icons/fa";
import { ReactNode } from "react";

const WA_LINK = "https://wa.me/558194725310";

interface Card {
  icone:    ReactNode;
  titulo:   string;
  descricao: string;
}

const CARDS: Card[] = [
  {
    icone:    <FaStore    className="text-3xl" />,
    titulo:   "Contabilidade para Comércio",
    descricao:
      "Atendemos empresas do varejo tradicional e digital com excelência técnica, controle inteligente e visão estratégica que asseguram conformidade, desempenho financeiro e tomada de decisão mais assertiva.",
  },
  {
    icone:    <FaHeadset  className="text-3xl" />,
    titulo:   "Contabilidade para Prestadores de Serviços",
    descricao:
      "Oferecemos atendimento consultivo, com foco na regularidade fiscal, otimização de tributos e mitigação de riscos legais, adequando as obrigações à realidade de cada atividade.",
  },
  {
    icone:    <FaUserTie  className="text-3xl" />,
    titulo:   "Contabilidade para Microempresas",
    descricao:
      "Acompanhamos desde a estruturação até o crescimento sustentável, com base em dados, planejamento e orientação contínua que evoluem com o seu negócio.",
  },
];

export default function Especialidades() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
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
        const proximo = (atual + 1) % CARDS.length;
        moverParaIndice(proximo);
        return proximo;
      });
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="especialidades"
      ref={ref}
      className="section-padding gradient-primary relative overflow-hidden"
    >
      {/* Decoração de fundo */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:gap-7"
        >
          {CARDS.map((card, i) => (
            <Link
              key={i}
              data-card-slide
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`group card-glass text-center min-w-[84vw] sm:min-w-[320px] snap-center
                          transition-all duration-700 lg:min-w-0
                          ${inView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                          }`}
              style={{ transitionDelay: `${150}ms` }}
            >
              {/* Ícone */}
              <div
                className="icon-circle mx-auto mb-6
                           group-hover:bg-secondary group-hover:text-white
                           group-hover:border-secondary"
              >
                {card.icone}
              </div>

              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
                {card.titulo}
              </h3>

              <p className="text-sm text-white/75 leading-relaxed">
                {card.descricao}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}