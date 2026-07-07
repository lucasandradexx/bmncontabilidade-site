"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieNotice() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aceito = localStorage.getItem("cookie_aceito");
    if (!aceito) {
      /* Pequeno delay para não aparecer imediatamente */
      const t = setTimeout(() => setVisivel(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  function aceitar() {
    localStorage.setItem("cookie_aceito", "true");
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div className="cookie-bar">
      <p className="text-sm text-white/85 flex-1 min-w-[200px]">
        Usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência.
        Ao utilizar os nossos serviços, você concorda com esse procedimento.
      </p>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={aceitar}
          className="btn !py-2 !px-5 !text-sm"
          style={{ backgroundColor: "#85b73a", color: "white" }}
        >
          Sim, concordo!
        </button>

        <Link
          href="/politica-de-privacidade"
          target="_blank"
          rel="noopener noreferrer"
          className="btn !py-2 !px-5 !text-sm"
          style={{ backgroundColor: "#85b73a", color: "white" }}
        >
          Política de Privacidade
        </Link>
      </div>
    </div>
  );
}