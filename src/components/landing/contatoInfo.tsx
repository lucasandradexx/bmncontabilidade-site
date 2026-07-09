"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ReactNode } from "react";

const WA_LINK = "https://wa.me/558194725310";

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
    href: WA_LINK,
  },
  {
    icone: <FaEnvelope className="text-2xl" />,
    titulo: "E-mail",
    conteudo: "contato@bmncontabilidade.com",
    href: "mailto:contato@bmncontabilidade.com",
  },
  {
    icone: <FaMapMarkerAlt className="text-2xl" />,
    titulo: "Endereço",
    conteudo:
      "R. Cap. José da Luz, 25 – Coelhos, Recife/PE – CEP 50070-540 Empresarial Joaquim Cardoso, salas 505/506",
    href: "https://www.google.com/maps/search/?api=1&query=Rua+Capit%C3%A3o+Jos%C3%A9+da+Luz%2C+25%2C+Coelhos%2C+Recife%2C+PE%2C+50070-540",
  },
];

export default function ContatoInfo() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: "#063755" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 cards centralizados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {CARDS.map((card, i) => {
            const classes = `card-glass text-center group cursor-pointer transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`;

            return card.href ? (
              <Link
                key={i}
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
              <div key={i} className={classes}>
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
      </div>
    </section>
  );
}