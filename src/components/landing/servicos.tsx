"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaCheck } from "react-icons/fa";

const SERVICOS = [
  {
    titulo: "Abertura e Legalização de Empresas em Recife",
    descricao:
      "Constituição, alteração e encerramento de empresas com análise prévia, orientação técnica e definição adequada da estrutura empresarial.",
  },
  {
    titulo: "Gestão Fiscal",
    descricao:
      "Controle total dos impostos: cálculo, emissão de guias e entrega de declarações. Revisão de enquadramento, parcelamentos e recuperação de créditos.",
  },
  {
    titulo: "Contabilidade Consultiva",
    descricao:
      "Leitura estratégica dos resultados contábeis, projeções financeiras e planejamento empresarial, transformando dados em indicadores de performance.",
  },
  {
    titulo: "Gestão Contábil",
    descricao:
      "Controle completo das movimentações financeiras, com registro, classificação e análise. Elaboração de balancetes, DRE e relatórios gerenciais.",
  },
  {
    titulo: "BPO Financeiro",
    descricao:
      "Rotinas financeiras organizadas: gestão de contas a pagar e a receber, conciliação bancária, fluxo de caixa e relatórios financeiros.",
  },
  {
    titulo: "Gestão Pessoal",
    descricao:
      "Administração integral da folha de pagamento, pró-labore e encargos sociais, além de admissões, rescisões e férias.",
  },
];

export default function Servicos() {
  /* threshold baixo para disparar a animação mais cedo */
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
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
        const proximo = (atual + 1) % SERVICOS.length;
        moverParaIndice(proximo);
        return proximo;
      });
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="servicos"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #020e17 0%, #041d2c 50%, #020e17 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header centralizado ── */}
        <div
          className="text-center mb-14 transition-all duration-500"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <span className="tag-section">Nossas soluções</span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white
                         leading-tight mt-2 mb-5">
            Atuação técnica, consultiva e personalizada
          </h2>

          <p className="text-white/65 text-base leading-relaxed max-w-2xl mx-auto">
            Oferecemos serviços contábeis estratégicos, estruturados para atender
            diferentes portes e segmentos, com foco em eficiência, conformidade e
            tomada de decisão segura.
          </p>
        </div>

        {/* ── Grid de cards — altura uniforme ── */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3"
        >
          {SERVICOS.map((s, i) => (
            <Link
              key={i}
              data-card-slide
              href="#contato"
              className="group flex gap-5 items-start rounded-2xl p-7 min-w-[84vw] snap-center
                         border border-white/10 hover:border-secondary/60
                         hover:bg-white/8 transition-colors duration-300 md:min-w-0"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                /* ✅ Animação de subida uniforme para todos */
                opacity:         inView ? 1 : 0,
                transform:       inView ? "translateY(0)" : "translateY(40px)",
                transition:      `opacity 0.6s ease, transform 0.6s ease`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Ícone — círculo outline teal */}
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center
                           justify-center border-2 border-secondary
                           group-hover:bg-secondary transition-all duration-300"
              >
                <FaCheck
                  className="text-secondary group-hover:text-white
                             text-sm transition-colors duration-300"
                />
              </div>

              {/* Texto — tamanho igual para todos */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-white leading-snug
                               group-hover:text-secondary transition-colors duration-300">
                  {s.titulo}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed
                              group-hover:text-white/80 transition-colors duration-300">
                  {s.descricao}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2 md:hidden">
          {SERVICOS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para serviço ${index + 1}`}
              onClick={() => moverParaIndice(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                indiceAtivo === index ? "w-8 bg-white" : "w-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}