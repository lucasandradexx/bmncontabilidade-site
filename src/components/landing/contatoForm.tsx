"use client";

import { useInView } from "react-intersection-observer";
import { FaCheckCircle } from "react-icons/fa";
import LeadForm from "@/components/leadForm";

const DIFERENCIAIS = [
  "Atendimento direto com os sócios",
  "100% digital, para empresas de todos os estados",
  "Monitoramento fiscal contínuo e Área do Cliente",
  "Suporte direto via WhatsApp",
];

export default function ContatoForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Coluna esquerda: Apresentação ── */}
          <div
            className={`transition-all duration-700
                        ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <span className="tag-section">Envie-nos uma mensagem</span>

            <h2 className="section-title mt-2">Clareza para decidir, estratégia para crescer.</h2>

            <div className="divider-gradient" />

            <p className="section-text">
              Conte um pouco sobre a sua empresa. Nossa equipe retorna pelo WhatsApp para entender
              o momento do seu negócio e indicar o melhor próximo passo.
            </p>

            <ul className="mt-8 space-y-4">
              {DIFERENCIAIS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                  <FaCheckCircle className="text-secondary flex-shrink-0 text-base" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                Horário de Atendimento
              </p>
              <p className="text-sm text-gray-500">Segunda a sexta-feira, das 9h às 17h</p>
            </div>
          </div>

          {/* ── Coluna direita: Formulário ── */}
          <div
            className={`transition-all duration-700 delay-200
                        ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="card !p-8 lg:!p-10">
              <h3 className="text-xl font-bold text-primary mb-1">Fale com nossa equipe</h3>
              <p className="text-xs text-gray-400 mb-7">
                Campos marcados com <span className="text-red-500">*</span> são obrigatórios.
              </p>
              <LeadForm origem="Contato do site (início)" textoBotao="Enviar mensagem" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
