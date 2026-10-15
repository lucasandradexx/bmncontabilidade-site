"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { MENSAGENS_WHATSAPP, waLink } from "@/lib/empresa";

const FAIXA = [
  "100% digital",
  "Empresas de todos os estados",
  "Sócios no atendimento",
  "CRC-PE 033381/O-0",
];

const SLIDES = [
  "/slides/slide-1.jpg",
  "/slides/slide-2.jpg",
  "/slides/slide-3.jpg",
  "/slides/slide-4.jpg",
];

export default function Hero() {
  const [atual, setAtual] = useState(0);
  // Troca slide a cada 5s
  useEffect(() => {
    const t = setInterval(() => {
      setAtual((p) => (p + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[78svh] sm:min-h-[84vh] lg:min-h-[92vh] flex items-center overflow-hidden"
    >
      {/* Slideshow */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-[position:72%_center] sm:bg-center transition-opacity duration-1000 animate-ken-burns"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === atual ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Overlay gradiente (mais forte no mobile para legibilidade) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,55,85,0.94) 0%, rgba(6,55,85,0.80) 55%, rgba(6,55,85,0.35) 100%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 sm:pt-28 sm:pb-24 lg:py-28">
        <div className="max-w-xl sm:max-w-2xl">
          {/* Título */}
          <h1
            className={`font-extrabold text-white leading-[1.08] mb-5
                        text-[clamp(1.95rem,8.5vw,3.25rem)]
                        opacity-0 animate-fade-up`}
          >
            A Reforma Tributária já começou. Sua empresa está preparada?
          </h1>

          {/* Descrição */}
          <p
            className={`text-white/85 leading-relaxed mb-7 max-w-[62ch]
                        text-[clamp(0.98rem,4.1vw,1.125rem)]
                        opacity-0 animate-fade-up [animation-delay:200ms]`}
          >
            Contabilidade estratégica para pequenas e médias empresas de todo o Brasil.
            Diagnóstico fiscal, planejamento tributário e acompanhamento com tecnologia,
            direto com os sócios.
          </p>

          {/* Botões CTA: preenchido + vazado */}
          <div
            className="opacity-0 animate-fade-up [animation-delay:300ms]"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/diagnostico-fiscal"
                className="btn btn-primary inline-flex w-full sm:w-auto justify-center items-center gap-3 !text-base !px-7 !py-4"
              >
                Quero meu Diagnóstico Fiscal gratuito
              </Link>

              <Link
                href={waLink(MENSAGENS_WHATSAPP.trocaContador)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary inline-flex w-full sm:w-auto justify-center items-center gap-3 !text-base !px-7 !py-4"
              >
                Quero trocar de contador
              </Link>
            </div>

            {/* Faixa de confiança */}
            <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-[13px]">
              {FAIXA.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && <span className="text-secondary" aria-hidden>·</span>}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Indicadores do slideshow */}
          <div className="flex gap-2 mt-8 sm:mt-10 md:mt-12">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setAtual(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                            ${i === atual
                              ? "w-8 bg-secondary"
                              : "w-2 bg-white/40 hover:bg-white/60"
                            }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}