"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";

const WA_LINK = "https://wa.me/558197058083";

export default function Sobre() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="sobre" className="section-padding bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Tag */}
        <span
          className={`tag-section transition-all duration-500
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Sobre nós
        </span>

        {/* Título */}
        <h2
          className={`section-title mt-1 transition-all duration-700 delay-100
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          BMN Contabilidade Estratégica
        </h2>

        {/* Divisor */}
        <div
          className={`divider-gradient mx-auto transition-all duration-700 delay-150
                      ${inView ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
        />

        {/* Parágrafos */}
        <div
          className={`space-y-5 text-base text-gray-600 leading-relaxed mt-6
                      transition-all duration-700 delay-200
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p>
            A{" "}
            <strong className="text-primary font-semibold">
              BMN Contabilidade Estratégica
            </strong>{" "}
            nasceu do sonho da fundadora{" "}
            <strong className="text-primary font-semibold">Ingrid barral</strong>,
            uma profissional determinada, apaixonada pelo mundo dos negócios e das finanças.
            Com formação sólida e MBA em Contabilidade, Auditoria e Gestão Tributária,
            construiu sua trajetória pautada em objetividade, precisão técnica, visão
            estratégica e tecnologia.
          </p>

          <p>
            Fundada com o propósito de ir além da contabilidade tradicional, a BMN
            investe em tecnologia de ponta, automação de processos, soluções personalizadas
            e indicadores financeiros inteligentes.{" "}
            <strong className="text-primary font-semibold">
              Entendemos a contabilidade como uma ferramenta estratégica e poderosa para
              a tomada de decisão.
            </strong>{" "}
            Nossa atuação une automação, sistemas modernos e monitoramento fiscal contínuo,
            garantindo agilidade, previsibilidade e controle.
          </p>

          <p>
            <strong className="text-primary font-semibold">
              Unimos tradição, sensibilidade e inovação
            </strong>{" "}
            para sermos mais que um escritório contábil: somos um{" "}
            <strong className="text-primary font-semibold">
              braço estratégico na construção de negócios de sucesso.
            </strong>
          </p>
        </div>

        {/* CTA */}
        <div
          className={`mt-10 transition-all duration-700 delay-300
                      ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <Link
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </section>
  );
}