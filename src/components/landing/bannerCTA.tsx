"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";

interface BannerCTAProps {
  subtitulo?: string;
  titulo:     string;
  descricao:  string;
  textoBotao: string;
  href:       string;
  externo?:   boolean;
}

export default function BannerCTA({
  subtitulo,
  titulo,
  descricao,
  textoBotao,
  href,
  externo = false,
}: BannerCTAProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-padding gradient-primary relative overflow-hidden"
    >
      {/* Decorações */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-white/5
                      -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-secondary/10
                      translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between gap-10
                      transition-all duration-700
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Texto */}
          <div className="text-center lg:text-left max-w-xl">
            {subtitulo && (
              <span className="tag-section !text-secondary block mb-2">{subtitulo}</span>
            )}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-snug mb-4">
              {titulo}
            </h2>
            <p className="text-white/80 text-base leading-relaxed">{descricao}</p>
          </div>

          {/* Botão */}
          <Link
            href={href}
            target={externo ? "_blank" : undefined}
            rel={externo ? "noopener noreferrer" : undefined}
            className="btn btn-outline flex w-full justify-center items-center gap-3 whitespace-nowrap !text-base !px-8 !py-4 sm:w-auto"
          >
            {externo && <FaWhatsapp className="text-lg" />}
            {textoBotao}
            {!externo && <FaArrowRight />}
          </Link>
        </div>
      </div>
    </section>
  );
}