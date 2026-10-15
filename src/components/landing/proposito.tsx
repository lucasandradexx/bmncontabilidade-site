"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const SEM_FRONTEIRAS = [
  ["WhatsApp com quem cuida da conta", "Resposta rápida, sem central de atendimento"],
  ["Reuniões on-line com os sócios", "Decisões tomadas com quem entende do assunto"],
  ["Área do Cliente e documentos digitais", "Tudo em um lugar, a qualquer hora"],
  ["Certificado digital ou procuração eletrônica", "Acesso aos órgãos federais, estaduais e municipais sem sair de casa"],
  ["Monitoramento fiscal contínuo", "Pendências tratadas antes de virarem problema"],
];

const VALORES = [
  "Integridade",
  "Objetividade",
  "Responsabilidade técnica",
  "Transparência",
  "Consistência",
  "Comunicação direta e empática",
  "Confiança",
  "Evolução contínua",
];

export default function Proposito() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="proposito"
      ref={ref}
      className="section-padding bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Coluna esquerda: Texto ── */}
          <div
            className={`transition-all duration-700
                        ${inView
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"}`}
          >
            <span className="tag-section">Nossos ideais</span>

            <h2 className="section-title mt-1 text-balance leading-tight">
              Missão, visão e valores: nossa jornada para o seu sucesso!
            </h2>

            <div className="divider-gradient" />

            {/* Missão */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              <strong className="text-gray-800 font-bold">Missão: </strong>
              Unir contabilidade técnica, tecnologia e visão estratégica para estruturar,
              proteger e impulsionar a gestão financeira e administrativa de empresas que
              buscam solidez, eficiência e crescimento sustentável.
            </p>

            {/* Visão */}
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              <strong className="text-gray-800 font-bold">Visão: </strong>
              Ser reconhecida pela capacidade de transformar informações em decisões,
              agregar valor ao dia a dia empresarial e apoiar o crescimento com base sólida.
            </p>

            {/* Valores */}
            <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
              Valores:
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {VALORES.map((valor) => (
                <span
                  key={valor}
                  className="inline-block text-sm text-gray-600 bg-gray-50
                             border-l-4 border-secondary px-3 py-1.5 rounded-sm
                             hover:bg-gray-100 transition-colors duration-200"
                >
                  {valor}
                </span>
              ))}
            </div>

            <Link href="/#contato" className="btn btn-primary w-full sm:w-auto justify-center">
              Faça parte dessa história
            </Link>
          </div>

          {/* ── Coluna direita: Atendimento sem fronteiras ── */}
          <div
            className={`transition-all duration-700 delay-200
                        ${inView
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-10"}`}
          >
            <div className="rounded-2xl gradient-primary p-6 text-white shadow-xl sm:p-8">
              <span className="tag-section !text-cyan-200">Modelo de atendimento</span>
              <h3 className="mt-2 text-2xl font-extrabold">Uma contabilidade sem fronteiras</h3>
              <p className="mt-2 text-sm text-white/75">
                Empresas de qualquer estado, com a mesma proximidade de um escritório ao lado.
              </p>

              <ul className="mt-6 space-y-4">
                {SEM_FRONTEIRAS.map(([como, sente]) => (
                  <li key={como} className="border-l-2 border-secondary pl-4">
                    <p className="text-sm font-bold text-white">{como}</p>
                    <p className="text-sm text-white/70">{sente}</p>
                  </li>
                ))}
              </ul>

              <Link
                href="/atendimento-digital"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white"
              >
                Veja como funciona o atendimento digital <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}