"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

const WA_LINK =
  "https://wa.me/558197058083?text=Ol%C3%A1!%20Encontrei%20seu%20site%20atrav%C3%A9s%20do%20Google%20e%20estou%20interessado(a)%20em%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%20Poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es,%20por%20favor?";

export default function WhatsAppButton() {
  const [visivel, setVisivel] = useState(false);

  /* Aparece após 1 segundo */
  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Link
      href={WA_LINK}
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