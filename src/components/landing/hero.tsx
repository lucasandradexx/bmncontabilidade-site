"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WA_LINK =
  "https://wa.me/558194725310?text=Ol%C3%A1!%20Encontrei%20seu%20site%20atrav%C3%A9s%20do%20Google%20e%20estou%20interessado(a)%20em%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%20Poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es,%20por%20favor?";

const SLIDES = [
  "/slides/slide-1.jpg",
  "/slides/slide-2.jpg",
  "/slides/slide-3.jpg",
  "/slides/slide-4.jpg",
];

export default function Hero() {
  const [atual, setAtual] = useState(0);
  const [visivel, setVisivel] = useState(false);

  // Inicia animações após mount
  useEffect(() => {
    setVisivel(true);
  }, []);

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
          {/* H1 invisível para SEO */}
          <h1 className="sr-only">Contabilidade em Recife - PE | BMN Contabilidade</h1>

          {/* Título */}
          <h2
            className={`font-extrabold text-white leading-[1.08] mb-5
                        text-[clamp(1.95rem,8.5vw,3.25rem)]
                        transition-all duration-700
                        ${visivel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Mais que números: tecnologia, estratégia e resultado.
          </h2>

          {/* Descrição */}
          <p
            className={`text-white/85 leading-relaxed mb-7 max-w-[62ch]
                        text-[clamp(0.98rem,4.1vw,1.125rem)]
                        transition-all duration-700 delay-200
                        ${visivel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Na BMN Contabilidade, trabalhamos com foco em precisão técnica,
            inteligência financeira e direcionamento estratégico. Com sede em Recife-PE,
            atendemos empresas em Pernambuco e em todo o Brasil, sem limitar nossa
            expertise a fronteiras geográficas.
          </p>

          {/* Botões CTA: preenchido + vazado */}
          <div
            className={`transition-all duration-700 delay-300
                        ${visivel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex w-full sm:w-auto justify-center items-center gap-3 !text-base !px-7 !py-4"
              >
                Abra a sua empresa
              </Link>

              <Link
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary inline-flex w-full sm:w-auto justify-center items-center gap-3 !text-base !px-7 !py-4"
              >
                Agende a sua reunião
              </Link>
            </div>
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