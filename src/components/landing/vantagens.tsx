"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { FaArrowRight, FaBalanceScale, FaChartLine, FaLaptopCode } from "react-icons/fa";

const PILARES: { icone: ReactNode; titulo: string; descricao: string; href: string }[] = [
  {
    icone: <FaChartLine />,
    titulo: "Contabilidade estratégica",
    descricao:
      "Diagnóstico fiscal, regularização, planejamento tributário e escolha do regime, com números para cada decisão.",
    href: "/contabilidade-estrategica",
  },
  {
    icone: <FaBalanceScale />,
    titulo: "Reforma Tributária",
    descricao:
      "Explicação da CBS e do IBS, simulação do impacto no preço e na margem e revisão de contratos e cadastros para a transição.",
    href: "/reforma-tributaria",
  },
  {
    icone: <FaLaptopCode />,
    titulo: "Tecnologia",
    descricao:
      "Monitoramento fiscal contínuo, Área do Cliente, indicadores mensais e rotinas automatizadas.",
    href: "/tecnologia",
  },
];

export default function Vantagens() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="tag-section">Nosso posicionamento</span>
          <h2 className="section-title mt-2">
            Você não precisa entender de imposto. Precisa de quem entenda por você.
          </h2>
          <p className="section-text mx-auto">
            A BMN mostra, com números, o melhor caminho para a sua empresa crescer em dia com o
            fisco e preparada para a Reforma Tributária.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILARES.map((pilar, i) => (
            <Link
              key={pilar.titulo}
              href={pilar.href}
              className={`group flex flex-col rounded-2xl border border-gray-200 bg-white p-7 shadow-sm
                          transition-all duration-700 hover:-translate-y-1 hover:border-secondary hover:shadow-lg
                          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: inView ? "0ms" : `${i * 120}ms` }}
            >
              <div className="icon-circle !h-14 !w-14 text-2xl group-hover:bg-secondary group-hover:text-white">
                {pilar.icone}
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary">{pilar.titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{pilar.descricao}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                Saiba mais <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
