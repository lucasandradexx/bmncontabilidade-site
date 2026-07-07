"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCommentDots,
} from "react-icons/fa";
import { ReactNode } from "react";

const WA_LINK = "https://wa.me/558197058083";

interface InfoCard {
  icone:    ReactNode;
  titulo:   string;
  conteudo: string;
  href?:    string;
}

const CARDS: InfoCard[] = [
  {
    icone:    <FaCommentDots className="text-2xl" />,
    titulo:   "Suporte pelo WhatsApp",
    conteudo: "Suporte imediato para assistência rápida e eficiente.",
    href:     WA_LINK,
  },
  {
    icone:    <FaWhatsapp className="text-2xl" />,
    titulo:   "Entre em contato",
    conteudo: "+55 (81) 99705-8083",
    href:     WA_LINK,
  },
  {
    icone:    <FaEnvelope className="text-2xl" />,
    titulo:   "E-mail",
    conteudo: "contato@bmncontabilidade.com",
    href:     "mailto:contato@bmncontabilidade.com",
  },
  {
    icone:    <FaMapMarkerAlt className="text-2xl" />,
    titulo:   "Endereço",
    conteudo: "R. Francisco Alves, 75 - Ilha do Leite, Recife - PE, 50070-565",
    href:     "https://maps.app.goo.gl/XUvt31a4XGTgjzfS8",
  },
];

export default function ContatoInfo() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="py-16"
      style={{ backgroundColor: "#063755" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((card, i) => {
            const Wrapper = card.href ? Link : "div";
            const props   = card.href
              ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={i}
                {...(props as any)}
                className={`card-glass text-center group cursor-pointer
                            transition-all duration-700
                            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${100}ms` }}
              >
                <div
                  className="text-secondary mb-4 flex justify-center
                             group-hover:scale-110 transition-transform duration-300"
                >
                  {card.icone}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{card.titulo}</h4>
                <p className="text-xs text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {card.conteudo}
                </p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}