"use client";

import { useRef } from "react";

type Plano = {
  nome: string;
  descricao: string;
  preco: string;
  recursos: string[];
  destaque: boolean;
  cta: string;
  href: string;
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
            Escolha o plano ideal para o momento da sua empresa
          </h2>
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
                className={`group flex min-w-[300px] w-full snap-center flex-col rounded-3xl border p-5 shadow-sm sm:min-w-[340px] md:min-w-0 md:w-auto md:flex-1 md:p-6 ${
                  plano.destaque
                    ? "border-[#0ea5c7] bg-[#0f8198] text-white shadow-[#0ea5c7]/40"
                    : "border-white/10 bg-white/5 text-white"
                }`}
              >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className={`text-xl font-black sm:text-2xl ${plano.destaque ? "text-white" : "text-white"}`}>
                  {plano.nome}
                </h3>
                {plano.destaque ? (
                  <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs">
                    Mais escolhido
                  </span>
                ) : null}
              </div>

              <p className={`mt-3 text-base ${plano.destaque ? "text-cyan-50" : "text-slate-200"}`}>
                {plano.descricao}
              </p>
              <p className={`mt-5 text-2xl font-black ${plano.destaque ? "text-white" : "text-white"}`}>
                {plano.preco}
              </p>

              <ul className="mt-6 space-y-3">
                {plano.recursos.map((recurso) => (
                  <li
                    key={recurso}
                    className={`flex items-start gap-3 text-sm ${plano.destaque ? "text-cyan-50" : "text-slate-200"}`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        plano.destaque ? "bg-white/15 text-white" : "bg-cyan-400/20 text-cyan-200"
                      }`}
                    >
                      ✓
                    </span>
                    <span>{recurso}</span>
                  </li>
                ))}
              </ul>

                <div className="mt-auto pt-6">
                  <a
                    href={plano.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${
                      plano.destaque
                        ? "bg-[#0b3f5e] text-white hover:bg-[#0a344e]"
                        : "bg-white text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {plano.cta}
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
