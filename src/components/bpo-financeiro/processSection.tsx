type Processo = {
  numero: string;
  titulo: string;
  descricao: string;
};

type ProcessSectionProps = {
  titulo: string;
  passos: Processo[];
};

export default function ProcessSection({ titulo, passos }: ProcessSectionProps) {
  return (
    <section className="bg-white py-16 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Como funciona</p>
          <h2 className="mt-4 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
            {titulo}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {passos.map((passo) => (
            <div
              key={passo.numero}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-lg font-black text-cyan-700">
                {passo.numero}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{passo.titulo}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{passo.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
