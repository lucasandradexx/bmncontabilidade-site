"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { waLink } from "@/lib/empresa";

type WhatsAppButtonProps = {
  // Mensagem pronta que identifica a página de origem.
  mensagem?: string;
};

export default function WhatsAppButton({ mensagem }: WhatsAppButtonProps) {
  const [visivel, setVisivel] = useState(false);

  /* Aparece após 1 segundo */
  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href={waLink(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className={`whatsapp-float transition-all duration-500
                  ${visivel ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
    >
      <FaWhatsapp className="text-3xl" />

      {/* Tooltip */}
      <span
        className="absolute right-16 bg-white text-primary text-xs font-semibold
                   px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   pointer-events-none"
      >
        Fale conosco!
      </span>
    </Link>
  );
}
