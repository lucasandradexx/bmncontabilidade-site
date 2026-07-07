"use client";

import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const schema = z.object({
  nome:     z.string().min(3,  "Digite seu nome completo"),
  telefone: z.string().min(10, "Digite um WhatsApp válido"),
  email:    z.string().email("Digite um e-mail válido"),
  assunto:  z.string().min(3,  "Digite o assunto"),
  mensagem: z.string().optional(),

  termo: z.boolean().refine((val) => val === true, {
    message: "Aceite a Política de Privacidade para continuar",
  }),
});

// O tipo será inferido automaticamente pelo zod
type FormData = z.infer<typeof schema>;
// termo agora é: boolean (em vez de literal true)

export default function ContatoForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [enviado,   setEnviado]   = useState(false);
  const [enviando,  setEnviando]  = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setEnviando(true);
    /* ── Substitua aqui pela sua integração de e-mail / API ── */
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Dados do formulário:", data);
    setEnviando(false);
    setEnviado(true);
    reset();
  }

  return (
    <section id="contato" className="section-padding bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Coluna esquerda: Apresentação ── */}
          <div
            className={`transition-all duration-700
                        ${inView
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10"}`}
          >
            <span className="tag-section">Envie-nos uma mensagem</span>

            <h2 className="section-title mt-2">
              Muito mais que uma contabilidade.
            </h2>

            <div className="divider-gradient" />

            <p className="section-text">
              Sua empresa merece uma gestão que inspire confiança, traga clareza e
              realmente faça a diferença. Estamos aqui para conduzir essa transformação
              com estratégia, proximidade e comprometimento real com os seus resultados.
            </p>

            {/* Diferenciais */}
            <ul className="mt-8 space-y-4">
              {[
                "Atendimento consultivo e personalizado",
                "Tecnologia de ponta para gestão eficiente",
                "Conformidade fiscal e tributária garantida",
                "Suporte direto via WhatsApp",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                  <FaCheckCircle className="text-secondary flex-shrink-0 text-base" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Horário */}
            <div className="mt-8 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">
                Horário de Atendimento
              </p>
              <p className="text-sm text-gray-500">
                Segunda a sexta-feira, das 9h às 18h
              </p>
            </div>
          </div>

          {/* ── Coluna direita: Formulário ── */}
          <div
            className={`transition-all duration-700 delay-200
                        ${inView
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-10"}`}
          >
            <div className="card !p-8 lg:!p-10">

              {/* ── Estado de sucesso ── */}
              {enviado ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FaCheckCircle className="text-6xl text-secondary mb-5" />
                  <h3 className="text-xl font-bold text-primary mb-2">
                    Mensagem enviada com sucesso!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Em breve nossa equipe entrará em contato com você.
                  </p>
                  <button
                    onClick={() => setEnviado(false)}
                    className="btn btn-primary"
                  >
                    Enviar outra mensagem
                  </button>
                </div>

              ) : (
                <>
                  <h3 className="text-xl font-bold text-primary mb-1">
                    Fale com nossa equipe
                  </h3>
                  <p className="text-xs text-gray-400 mb-7">
                    Campos marcados com{" "}
                    <span className="text-red-500">*</span> são obrigatórios.
                  </p>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    {/* Nome */}
                    <div className="form-field">
                      <label className="form-label">
                        Nome completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("nome")}
                        type="text"
                        placeholder="Seu nome completo"
                        className={`form-input ${errors.nome ? "!border-red-400" : ""}`}
                      />
                      {errors.nome && (
                        <span className="text-xs text-red-500 mt-1">
                          {errors.nome.message}
                        </span>
                      )}
                    </div>

                    {/* Telefone */}
                    <div className="form-field">
                      <label className="form-label">
                        WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("telefone")}
                        type="tel"
                        placeholder="(81) 99999-9999"
                        className={`form-input ${errors.telefone ? "!border-red-400" : ""}`}
                      />
                      {errors.telefone && (
                        <span className="text-xs text-red-500 mt-1">
                          {errors.telefone.message}
                        </span>
                      )}
                    </div>

                    {/* E-mail */}
                    <div className="form-field sm:col-span-2">
                      <label className="form-label">
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="seu@email.com"
                        className={`form-input ${errors.email ? "!border-red-400" : ""}`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Assunto */}
                    <div className="form-field sm:col-span-2">
                      <label className="form-label">
                        Assunto <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("assunto")}
                        type="text"
                        placeholder="Assunto da mensagem"
                        className={`form-input ${errors.assunto ? "!border-red-400" : ""}`}
                      />
                      {errors.assunto && (
                        <span className="text-xs text-red-500 mt-1">
                          {errors.assunto.message}
                        </span>
                      )}
                    </div>

                    {/* Mensagem */}
                    <div className="form-field sm:col-span-2">
                      <label className="form-label">Observação</label>
                      <textarea
                        {...register("mensagem")}
                        rows={4}
                        placeholder="Digite sua mensagem (opcional)..."
                        className="form-input resize-none"
                      />
                    </div>

                    {/* Aceite LGPD */}
                    <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                        {...register("termo", { setValueAs: (v) => v === true || v === "true" })}
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-secondary flex-shrink-0 cursor-pointer"
                        />
                        <span className="text-xs text-gray-500 leading-relaxed
                                        group-hover:text-gray-700 transition-colors">
                        Li e concordo com a{" "}
                        <a
                            href="/politica-de-privacidade"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary underline hover:text-primary transition-colors"
                        >
                            Política de Privacidade
                        </a>
                        .
                        </span>
                    </label>
                    {errors.termo && (
                        <span className="text-xs text-red-500 mt-1 block">
                        {errors.termo.message}
                        </span>
                    )}
                    </div>

                    {/* Botão enviar */}
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={enviando}
                        className="btn btn-primary w-full justify-center
                                   disabled:opacity-60 disabled:cursor-not-allowed
                                   disabled:hover:scale-100"
                      >
                        {enviando ? (
                          <>
                            <FaSpinner className="animate-spin text-lg" />
                            Enviando...
                          </>
                        ) : (
                          "Enviar mensagem"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}