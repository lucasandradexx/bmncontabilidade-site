export default function CtaSection() {
  return (
    <section className="bg-[#041d2c] py-20 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Pronto para profissionalizar?</p>
        <h2 className="mt-5 text-3xl font-black sm:text-5xl">
          Pronto para profissionalizar a gestão do seu negócio?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">
          Fale com um de nossos especialistas. Faremos um diagnóstico gratuito da sua operação e mostraremos como a BMN pode te ajudar a lucrar mais.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="https://wa.me/558194725310?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20especialista%20sobre%20BPO%20Financeiro."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
          >
            Falar com um especialista no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
