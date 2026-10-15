"use client";

import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MENSAGENS_WHATSAPP, waLink } from "@/lib/empresa";

type Plano = {
  nome: string;
  descricao: string;
  recursos: string[];
};

type PlanosSectionProps = {
  planos: Plano[];
};

export default function PlanosSection({ planos }: PlanosSectionProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollPlans = (direction: "left" | "right") => {
    const container = carouselRef.current;

    if (!container) return;

    const cardWidth = container.querySelector("[data-plan-card]")?.clientWidth ?? 320;
    const gap = 20;

    container.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section id="planos" className="bg-[#0b3f5e] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Planos</p>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
            Um plano para cada momento da empresa
          </h2>
          <p className="mt-4 text-base text-slate-200">
            O escopo e o valor são definidos depois do Raio-X Financeiro, de acordo com o volume e a rotina da sua empresa.
          </p>
        </div>

        <div className="relative mt-6 md:pl-14 md:pr-14">
          <button
            type="button"
            aria-label="Planos anteriores"
            onClick={() => scrollPlans("left")}
            className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-white/20 md:flex"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Próximos planos"
            onClick={() => scrollPlans("right")}
            className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl font-bold text-white shadow-lg backdrop-blur-sm transition hover:bg-white/20 md:flex"
          >
            →
          </button>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:pb-0"
          >
            {planos.map((plano) => (
              <div
                key={plano.nome}
                data-plan-card
                className="group flex min-w-[300px] w-full snap-center flex-col rounded-3xl border p-5 shadow-sm sm:min-w-[340px] md:min-w-0 md:w-auto md:flex-1 md:p-6 border-white/10 bg-white/5 text-white"
              >
              <h3 className="text-xl font-black text-white sm:text-2xl">{plano.nome}</h3>
              <p className="mt-3 text-base text-slate-200">{plano.descricao}</p>

              <ul className="mt-6 space-y-3">
                {plano.recursos.map((recurso) => (
                  <li
                    key={recurso}
                    className="flex items-start gap-3 text-sm text-slate-200"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-200"
                    >
                      ✓
                    </span>
                    <span>{recurso}</span>
                  </li>
                ))}
              </ul>

                <div className="mt-auto pt-6">
                  <a
                    href={waLink(`${MENSAGENS_WHATSAPP.propostaBpoFinanceiro.replace(/\.$/, "")} do ${plano.nome}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-slate-100"
                  >
                    <FaWhatsapp className="text-base" />
                    Quero uma proposta
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
