"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";

const WA_LINK = "https://wa.me/558194725310";

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
            nasce da união de duas forças do mercado pernambucano:{" "}
            <strong className="text-primary font-semibold">
              Barral Contabilidade
            </strong>{" "}
            e{" "}
            <strong className="text-primary font-semibold">
              MN Soluções Empresariais
            </strong>
            . Liderada por três profissionais determinados e apaixonados pelo universo
            dos negócios e das finanças, a BMN comprova que{" "}
            <strong className="text-primary font-semibold">
              grandes histórias corporativas começam com a união de propósitos
            </strong>
            . Com mais de 10 anos de atuação e a bagagem de dois escritórios
            consolidados, assumimos o compromisso de{" "}
            <strong className="text-primary font-semibold">
              proteger e prosperar o seu patrimônio
            </strong>{" "}
            com responsabilidade e visão estratégica.
          </p>

          <p>
            Nossa atuação é completa e integrada, com excelência em{" "}
            <strong className="text-primary font-semibold">
              contabilidade, auditoria, gestão tributária e estruturação societária
            </strong>
            , além de uma gestão financeira robusta e um departamento pessoal de alta
            performance. Fundada para ir além do modelo tradicional, a BMN investe em{" "}
            <strong className="text-primary font-semibold">
              tecnologia de ponta, inteligência de processos e soluções personalizadas
            </strong>
            .
          </p>

          <p>
            Unimos precisão contábil e controle financeiro como pilares para{" "}
            <strong className="text-primary font-semibold">
              decisões seguras, previsibilidade e governança
            </strong>
            . Com monitoramento fiscal contínuo e indicadores inteligentes, entregamos
            agilidade e confiança para o crescimento do seu negócio.{" "}
            <strong className="text-primary font-semibold">
              Mais do que um prestador de serviços, a BMN é o alicerce estratégico na
              construção de grandes histórias de sucesso.
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