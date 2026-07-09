"use client";

import { useId } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FaCheck } from "react-icons/fa";

const ALTURA_IMAGEM = 380; // altura fixa da área da imagem
const ALTURA_INFO = 170; // altura fixa da parte preta
const ALTURA_CARD = ALTURA_IMAGEM + ALTURA_INFO;

const CARDS = [
  {
    titulo: "Planejamento Estratégico",
    descricao: "Consultoria para otimizar fluxos de caixa e crescimento.",
    imagem: "/yuri.jpg",
    objectPosition: "50% 30%",
    zoom: 1.14,
  },
  {
    titulo: "Suporte Personalizado",
    descricao: "Comunicação direta para dúvidas e orientações estratégicas eficazes.",
    imagem:
      "https://barralcontabilidade.com.br/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Img-2-2.webp",
    objectPosition: "50% 28%",
    zoom: 1,
  },
  {
    titulo: "Inovação Tecnológica",
    descricao: "Utilizando a tecnologia para simplificar a contabilidade.",
    imagem: "/lucas.jpg",
    objectPosition: "50% 22%",
    zoom: 1,
  },
];

const GRAFICOS = [
  { valor: 100, label: "de dedicação" },
  { valor: 98, label: "de aprovação" },
  { valor: 25, label: "de crescimento por ano" },
];

const CIRCUNFERENCIA = 2 * Math.PI * 46;

function GraficoCircular({
  valor,
  label,
  ativo,
  delayMs = 0,
}: {
  valor: number;
  label: string;
  ativo: boolean;
  delayMs?: number;
}) {
  const offset = CIRCUNFERENCIA - (valor / 100) * CIRCUNFERENCIA;
  const gradId = useId().replace(/:/g, "");

  return (
    <div
      className="flex flex-col items-center gap-3"
      style={{
        opacity: ativo ? 1 : 0,
        transform: ativo ? "translateY(0) scale(1)" : "translateY(18px) scale(0.96)",
        transition: `opacity 0.55s ease ${delayMs}ms, transform 0.55s ease ${delayMs}ms`,
      }}
    >
      <div className="relative w-[110px] h-[110px]">
        <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
          <defs>
            <linearGradient id={`grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#139A9E" />
              <stop offset="100%" stopColor="#063755" />
            </linearGradient>
          </defs>

          {/* trilha base */}
          <circle cx="55" cy="55" r="46" fill="none" stroke="#EDEDED" strokeWidth="8" />

          {/* progresso */}
          <circle
            cx="55"
            cy="55"
            r="46"
            fill="none"
            stroke={`url(#grad-${gradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUNFERENCIA}
            strokeDashoffset={ativo ? offset : CIRCUNFERENCIA}
            style={{
              transition: `stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
            }}
          />
        </svg>

        {/* número */}
        <span
          className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary"
          style={{
            opacity: ativo ? 1 : 0,
            transform: ativo ? "scale(1)" : "scale(0.85)",
            transition: `opacity 0.45s ease ${delayMs + 120}ms, transform 0.45s ease ${
              delayMs + 120
            }ms`,
          }}
        >
          {ativo ? (
            <CountUp end={valor} duration={1.6} delay={delayMs / 1000} suffix="%" />
          ) : (
            "0%"
          )}
        </span>
      </div>

      <span className="text-sm text-gray-500 font-medium text-center leading-snug">{label}</span>
    </div>
  );
}

export default function CardsDiferenciais() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section ref={ref} className="py-16 bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1) CARDS DE IMAGEM */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-16">
          {CARDS.map((card, i) => (
            <article
              key={i}
              className="w-full max-w-[360px] rounded-2xl overflow-hidden shadow-lg bg-[#070b10] flex flex-col"
              style={{
                height: ALTURA_CARD,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "0ms", // sem cascata
              }}
            >
              {/* imagem */}
              <div
                className="relative w-full overflow-hidden shrink-0"
                style={{ height: ALTURA_IMAGEM }}
              >
                <Image
                  src={card.imagem}
                  alt={card.titulo}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: card.objectPosition,
                    transform: `scale(${card.zoom})`,
                    transformOrigin: "center",
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                  priority={i === 0}
                />
              </div>

              {/* parte preta */}
              <div
                className="bg-[#020b17] px-6 py-6 text-center flex flex-col items-center justify-center gap-3 shrink-0"
                style={{ height: ALTURA_INFO }}
              >
                <div className="w-11 h-11 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                  <FaCheck className="text-cyan-500 text-sm" />
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{card.titulo}</h4>

                <p className="text-xs text-white/75 leading-relaxed max-w-[280px]">
                  {card.descricao}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 2) TEXTO + GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="tag-section">Na BMN, você tem mais vantagens:</span>

            <h2 className="section-title mt-2">
              A contabilidade estratégica que impulsiona lucros e reduz riscos
            </h2>

            <p className="section-text">
              Promovemos lucratividade, reduzimos a carga tributária e mitigamos riscos com foco em
              resultados consistentes, eficiência operacional e conformidade total.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="valor-badge">Suporte Personalizado</span>
              <span className="valor-badge">Inovação Tecnológica</span>
              <span className="valor-badge">Precisão Técnica</span>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {GRAFICOS.map((g, index) => (
              <GraficoCircular
                key={g.label}
                valor={g.valor}
                label={g.label}
                ativo={inView}
                delayMs={index * 180}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}