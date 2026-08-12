export default function HeroSection() {
  return (
    <section className="bg-[#041d2c] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div className="flex items-center">
          <div className="w-full">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
              BPO Financeiro
            </span>

            <h1 className="mt-6 max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Pare de perder tempo pagando contas e foque no que realmente importa: Crescer a sua empresa.
            </h1>

            <p className="mt-5 max-w-xl text-base text-slate-200 sm:text-lg">
              A BMN Contabilidade Estratégica assume 100% da sua rotina financeira. Chega de atrasos, multas e planilhas confusas. Tenha previsibilidade e dados claros com o nosso serviço de BPO Financeiro.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#planos"
                className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300 sm:w-auto"
              >
                Quero terceirizar meu financeiro
              </a>
              <a
                href="https://wa.me/558194725310?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20o%20BPO%20Financeiro."
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:w-auto"
              >
                Falar no WhatsApp
              </a>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-200">
              {[
                "Controle de fluxo de caixa",
                "Pagamentos e notas organizados",
                "Acompanhamento financeiro com clareza",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-900">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full rounded-3xl border border-cyan-400/20 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_rgba(4,29,44,0.96)_55%)] p-5 shadow-2xl shadow-cyan-950/30 sm:p-8">
            <div className="rounded-2xl border border-white/10 bg-[#0b3f5e]/70 p-5 sm:p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Resultado</p>
              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">+ previsibilidade</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-cyan-300">3x</p>
                  <p className="mt-2 text-sm text-slate-200">mais organização na rotina financeira</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-cyan-300">0</p>
                  <p className="mt-2 text-sm text-slate-200">atrasos e multas por falta de controle</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                  <p className="text-2xl font-black text-cyan-300">100%</p>
                  <p className="mt-2 text-sm text-slate-200">da rotina financeira em mãos da BMN, com você aprovando o que precisa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
