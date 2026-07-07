"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

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

            <h2 className="section-title mt-1">
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

            <Link href="#contato" className="btn btn-primary">
              Faça parte dessa história
            </Link>
          </div>

          {/* ── Coluna direita: Imagem ── */}
          <div
            className={`hidden lg:flex items-center justify-center
                        transition-all duration-700 delay-200
                        ${inView
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-10"}`}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow-xl"
              style={{ height: 500 }}
            >
              <Image
                src="https://barralcontabilidade.com.br/wp-content/uploads/2025/08/Home-Barral-Contabilidade-em-Recife-PE-Img-5-3.webp"
                alt="Ingrid barral — Fundadora da barral Contabilidade"
                fill
                className="object-cover object-center"
                /* ✅ Espelho horizontal — igual ao Elementor flipX do original */
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}