"use client";

import { useState, type FormEvent } from "react";

type FormSectionProps = {
  titulo?: string;
  buttonLabel?: string;
};

const ROTULOS: Record<string, string> = {
  nome: "Nome",
  razaoSocial: "Razão Social",
  cnpj: "CNPJ",
  email: "E-mail",
  telefone: "Telefone / WhatsApp",
  segmento: "Segmento",
  regimeTributacao: "Regime de tributação",
  quantidadeColaboradores: "Quantidade de colaboradores",
  faturamento: "Faturamento",
  jaPossuiContador: "Já possui contador",
  desejaMigrar: "Deseja migrar de contabilidade",
  volumeTransacoes: "Volume de transações",
  descricaoEmpresa: "Sobre a empresa",
};

export default function FormSection({ titulo, buttonLabel }: FormSectionProps) {
  const tituloExibido =
    titulo ?? "Não sabe qual o plano ideal para sua empresa? Responda esse formulário e lhe auxiliaremos na escolha";
  const textoBotao = buttonLabel ?? "Quero receber a indicação do plano ideal";

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEnviando(true);
    setErro(null);

    const formData = new FormData(event.currentTarget);
    const campos = Object.entries(ROTULOS)
      .map(([campo, label]) => {
        const valor = formData.get(campo);
        return valor ? { label, valor: String(valor) } : null;
      })
      .filter((c): c is { label: string; valor: string } => c !== null);

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assunto: "Novo lead: BPO Financeiro",
          campos,
        }),
      });

      if (!res.ok) throw new Error("Falha no envio");

      setEnviado(true);
      event.currentTarget.reset();
    } catch {
      setErro("Não foi possível enviar sua mensagem. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="bg-[#0b3f5e] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cyan-300/30 bg-[#0d4d69] p-5 shadow-[0_20px_50px_rgba(15,41,57,0.25)] sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">BPO Financeiro</p>
            <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              {tituloExibido}
            </h2>
          </div>

          {enviado ? (
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-cyan-300/30 bg-white/5 p-8 text-center">
              <h3 className="text-xl font-bold text-white">Recebemos sua solicitação!</h3>
              <p className="mt-2 text-sm text-cyan-50">
                Em breve nossa equipe entrará em contato com a indicação do plano ideal.
              </p>
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
              >
                Enviar outra solicitação
              </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Nome *</label>
              <input
                type="text"
                name="nome"
                required
                placeholder="Seu nome completo"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Razão Social *</label>
              <input
                type="text"
                name="razaoSocial"
                required
                placeholder="Razão social da empresa"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">CNPJ *</label>
              <input
                type="text"
                name="cnpj"
                required
                placeholder="00.000.000/0000-00"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">E-mail *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Telefone / WhatsApp *</label>
              <input
                type="tel"
                name="telefone"
                required
                placeholder="(81) 99999-9999"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Segmento *</label>
              <input
                type="text"
                name="segmento"
                required
                placeholder="Ex: comércio, serviços, indústria"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Qual o regime de tributação da empresa? *</label>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {['Simples Nacional', 'Lucro Presumido', 'Lucro Real', 'MEI'].map((opcao) => (
                  <label key={opcao} className="flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-white/5 px-3 py-2 text-sm text-cyan-50">
                    <input type="radio" name="regimeTributacao" value={opcao} required className="h-4 w-4 shrink-0 accent-cyan-400" />
                    <span className="leading-relaxed">{opcao}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Quantos colaboradores a empresa possui? *</label>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
                {[
                  'Nenhum colaborador',
                  '1 a 5 colaboradores',
                  '6 a 20 colaboradores',
                  '21 a 50 colaboradores',
                  'Mais de 50 colaboradores',
                ].map((opcao) => (
                  <label key={opcao} className="flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-white/5 px-3 py-2 text-sm text-cyan-50">
                    <input type="radio" name="quantidadeColaboradores" value={opcao} required className="h-4 w-4 shrink-0 accent-cyan-400" />
                    <span className="leading-relaxed">{opcao}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Qual o faturamento da empresa? *</label>
              <input
                type="text"
                name="faturamento"
                required
                placeholder="Ex.: R$ 80.000/mês"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Já possui contador? *</label>
              <div className="flex flex-wrap gap-4 rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3">
                {['Sim', 'Não'].map((opcao) => (
                  <label key={opcao} className="flex items-center gap-2 text-sm text-cyan-50">
                    <input type="radio" name="jaPossuiContador" value={opcao} required className="h-4 w-4 accent-cyan-400" />
                    {opcao}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Deseja migrar de contabilidade? *</label>
              <div className="flex flex-wrap gap-4 rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3">
                {['Sim', 'Não'].map((opcao) => (
                  <label key={opcao} className="flex items-center gap-2 text-sm text-cyan-50">
                    <input type="radio" name="desejaMigrar" value={opcao} required className="h-4 w-4 accent-cyan-400" />
                    {opcao}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Volume de transações *</label>
              <input
                type="text"
                name="volumeTransacoes"
                required
                placeholder="Ex: até 50, 100, 200 ou mais"
                className="w-full rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-cyan-50">Fale um pouco sobre sua empresa *</label>
              <textarea
                rows={5}
                name="descricaoEmpresa"
                required
                placeholder="Conte um pouco sobre sua operação, volume de transações, pendências financeiras e o que você procura no BPO Financeiro..."
                className="w-full resize-none rounded-xl border border-cyan-300/30 bg-white/5 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-cyan-300 focus:bg-white/10"
              />
            </div>

            <div className="md:col-span-2 flex flex-col items-center gap-3">
              {erro && <p className="text-sm text-red-300">{erro}</p>}
              <button
                type="submit"
                disabled={enviando}
                className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {enviando ? "Enviando..." : textoBotao}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
