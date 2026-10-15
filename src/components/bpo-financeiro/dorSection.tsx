type DorSectionProps = {
  titulo: string;
  dores: string[];
  destaque: string;
};

export default function DorSection({ titulo, dores, destaque }: DorSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Você se reconhece?</p>
        <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">{titulo}</h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {dores.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-lg text-red-600">
              ✕
            </div>
            <p className="text-base leading-relaxed text-slate-700">{item}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-cyan-200 bg-cyan-50 p-6 text-center text-lg text-slate-700">
        {destaque}
      </div>
    </section>
  );
}
