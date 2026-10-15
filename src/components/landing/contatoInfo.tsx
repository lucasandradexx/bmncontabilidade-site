"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { EMAIL, ENDERECO_SEDE, MAPS_LINK, waLink } from "@/lib/empresa";

interface InfoCard {
  icone: ReactNode;
  titulo: string;
  conteudo: string;
  href?: string;
}

const CARDS: InfoCard[] = [
  {
    icone: <FaWhatsapp className="text-2xl" />,
    titulo: "Suporte pelo WhatsApp",
    conteudo: "Suporte imediato para assistência rápida e eficiente.",
    href: waLink(),
  },
  {
    icone: <FaEnvelope className="text-2xl" />,
    titulo: "E-mail",
    conteudo: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icone: <FaMapMarkerAlt className="text-2xl" />,
    titulo: "Sede",
    conteudo: ENDERECO_SEDE,
    href: MAPS_LINK,
  },
];

export default function ContatoInfo() {
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
    <section ref={ref} className="py-16" style={{ backgroundColor: "#063755" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 cards centralizados */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 max-w-5xl mx-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        >
          {CARDS.map((card, i) => {
            const classes = `card-glass text-center group cursor-pointer transition-all duration-700 min-w-[84vw] sm:min-w-[280px] snap-center lg:min-w-0 data-card-slide ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`;

            return card.href ? (
              <Link
                key={i}
                data-card-slide
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes}
              >
                <div className="text-secondary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {card.icone}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{card.titulo}</h4>
                <p className="text-xs text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {card.conteudo}
                </p>
              </Link>
            ) : (
              <div key={i} data-card-slide className={classes}>
                <div className="text-secondary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {card.icone}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{card.titulo}</h4>
                <p className="text-xs text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {card.conteudo}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center gap-2 lg:hidden">
          {CARDS.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para contato ${index + 1}`}
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