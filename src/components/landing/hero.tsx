"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WA_LINK =
  "https://wa.me/558194725310?text=Ol%C3%A1!%20Encontrei%20seu%20site%20atrav%C3%A9s%20do%20Google%20e%20estou%20interessado(a)%20em%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%20Poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es,%20por%20favor?";

const SLIDES = [
  "https://barralcontabilidade-com-br.us.stackstaging.com/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Banner-1.webp",
  "https://barralcontabilidade-com-br.us.stackstaging.com/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Banner-3-1-e1756758027698.webp",
  "https://barralcontabilidade-com-br.us.stackstaging.com/wp-content/uploads/2025/09/Home-Barral-Contabilidade-em-Recife-PE-Banner-2-2-e1756758053750.webp",
  "https://barralcontabilidade-com-br.us.stackstaging.com/wp-content/uploads/2025/09/Home-Barral-Contabilidade-em-Recife-PE-Banner-4-scaled.webp",
];

export default function Hero() {
  const [atual, setAtual] = useState(0);
  const [visivel, setVisivel] = useState(false);

  /* Inicia animações após mount */
  useEffect(() => {
    setVisivel(true);
  }, []);

  /* Troca slide a cada 5s */
  useEffect(() => {
    const t = setInterval(
      () => setAtual((p) => (p + 1) % SLIDES.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden">

      {/* Slideshow */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 animate-ken-burns"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === atual ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Overlay gradiente */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(6,55,85,0.88) 50%, rgba(6,55,85,0.22) 100%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="max-w-2xl">

          {/* H1 invisível para SEO */}
          <h1 className="sr-only">Contabilidade em Recife - PE | BMN Contabilidade</h1>

          {/* Subtítulo animado */}
          <h2
            className={`text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white
                        leading-tight mb-6 transition-all duration-700
                        ${visivel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Mais que números: tecnologia, estratégia e resultado.
          </h2>

          {/* Descrição */}
          <p
            className={`text-base md:text-lg text-white/85 leading-relaxed mb-8
                        transition-all duration-700 delay-200
                        ${visivel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Na BMN Contabilidade, trabalhamos com foco em precisão técnica,
            inteligência financeira e direcionamento estratégico. Com sede em Recife-PE,
            atendemos empresas em Pernambuco e em todo o Brasil — sem limitar nossa
            expertise a fronteiras geográficas.
          </p>

          {/* Botão CTA */}
          <div
            className={`transition-all duration-700 delay-300
                        ${visivel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center gap-3 !text-base !px-8 !py-4"
            >
              <FaWhatsapp className="text-xl" />
              Fale com um especialista
            </Link>
          </div>

          {/* Indicadores do slideshow */}
          <div className="flex gap-2 mt-12">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setAtual(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer
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