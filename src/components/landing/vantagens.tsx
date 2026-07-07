"use client";

import { useId } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";

const GRAFICOS = [
  { valor: 100, label: "de dedicação" },
  { valor: 98, label: "de aprovação" },
  { valor: 25, label: "de crescimento por ano" },
];

const CIRCUNFERENCIA = 2 * Math.PI * 46;

// URLs das imagens
const IMG_PLANEJAMENTO =
  "https://barralcontabilidade.com.br/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Img-4-2.webp";
const IMG_SUPORTE =
  "https://barralcontabilidade.com.br/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Img-2-2.webp";
const IMG_INOVACAO =
  "https://barralcontabilidade.com.br/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Img-5-3.webp";

// Alturas padronizadas
const ALTURA_CARD = 550;
const ALTURA_SECAO_PRETA = 180;

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

  // ID único para evitar conflito de gradiente no SVG
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

          {/* Trilha base */}
          <circle cx="55" cy="55" r="46" fill="none" stroke="#EDEDED" strokeWidth="8" />

          {/* Progresso animado */}
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

        {/* Número animado */}
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

export default function Vantagens() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section className="section-padding bg-[#f7f8fa]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            1) IMAGENS EM CIMA
        ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-16">
          {/* Card principal (esquerda) */}
          <article
            className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg bg-[#070b10] flex flex-col"
            style={{
              height: ALTURA_CARD,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transitionDelay: "0ms",
            }}
          >
            <div className="relative w-full flex-1 min-h-[380px]">
              <Image
                src={IMG_PLANEJAMENTO}
                alt="Planejamento Estratégico"
                fill
                className="object-cover object-center"
              />
            </div>

            <div
              className="px-6 py-6 flex flex-col items-center justify-center text-center gap-3 bg-[#070b10]"
              style={{ height: ALTURA_SECAO_PRETA }}
            >
              <div className="w-11 h-11 rounded-full border-2 border-secondary flex items-center justify-center">
                <FaCheck className="text-secondary text-sm" />
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">Planejamento Estratégico</h4>
              <p className="text-xs text-white/65 leading-relaxed">
                Consultoria para otimizar fluxos de caixa e crescimento.
              </p>
            </div>
          </article>

          {/* Coluna direita com 2 cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 2 */}
            <article
              className="rounded-2xl overflow-hidden shadow-lg bg-[#070b10] flex flex-col"
              style={{
                height: ALTURA_CARD,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "120ms",
              }}
            >
              <div className="relative w-full flex-1 min-h-[380px]">
                <Image
                  src={IMG_SUPORTE}
                  alt="Suporte Personalizado"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div
                className="px-6 py-6 flex flex-col items-center justify-center text-center gap-3 bg-[#070b10]"
                style={{ height: ALTURA_SECAO_PRETA }}
              >
                <div className="w-11 h-11 rounded-full border-2 border-secondary flex items-center justify-center">
                  <FaCheck className="text-secondary text-sm" />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">Suporte Personalizado</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  Comunicação direta para dúvidas e orientações estratégicas eficazes.
                </p>
              </div>
            </article>

            {/* Card 3 */}
            <article
              className="rounded-2xl overflow-hidden shadow-lg bg-[#070b10] flex flex-col"
              style={{
                height: ALTURA_CARD,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: "240ms",
              }}
            >
              <div className="relative w-full flex-1 min-h-[380px]">
                <Image
                  src={IMG_INOVACAO}
                  alt="Inovação Tecnológica"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div
                className="px-6 py-6 flex flex-col items-center justify-center text-center gap-3 bg-[#070b10]"
                style={{ height: ALTURA_SECAO_PRETA }}
              >
                <div className="w-11 h-11 rounded-full border-2 border-secondary flex items-center justify-center">
                  <FaCheck className="text-secondary text-sm" />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">Inovação Tecnológica</h4>
                <p className="text-xs text-white/65 leading-relaxed">
                  Utilizando a tecnologia para simplificar a contabilidade.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* =========================================================
            2) TEXTO + GRÁFICOS EMBAIXO
        ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
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

          {/* Gráficos */}
          <div
            className="grid grid-cols-3 gap-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <GraficoCircular valor={100} label="de dedicação" ativo={inView} delayMs={0} />
            <GraficoCircular valor={98} label="de aprovação" ativo={inView} delayMs={180} />
            <GraficoCircular valor={25} label="de crescimento por ano" ativo={inView} delayMs={360} />
          </div>
        </div>
      </div>
    </section>
  );
}