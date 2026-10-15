import { FaWhatsapp } from "react-icons/fa";
import { waLink } from "@/lib/empresa";

type HeroSectionProps = {
  tag: string;
  titulo: string;
  descricao: string;
  botaoPrincipal: { texto: string; mensagem: string };
  botaoSecundario: { texto: string; href: string };
  itens: string[];
  destaque: { rotulo: string; titulo: string; texto: string };
};

export default function HeroSection({
  tag,
  titulo,
  descricao,
  botaoPrincipal,
  botaoSecundario,
  itens,
  destaque,
}: HeroSectionProps) {
  return (
    <section className="bg-[#041d2c] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div className="flex items-center">
          <div className="w-full">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200 sm:text-xs">
              {tag}
            </span>

            <h1 className="mt-6 max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              {titulo}
            </h1>

            <p className="mt-5 max-w-xl text-base text-slate-200 sm:text-lg">{descricao}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={waLink(botaoPrincipal.mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300 sm:w-auto"
              >
                <FaWhatsapp className="text-base" />
                {botaoPrincipal.texto}
              </a>
              <a
                href={botaoSecundario.href}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:w-auto"
              >
                {botaoSecundario.texto}
              </a>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-200">
              {itens.map((item) => (
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
            <div className="rounded-2xl border border-white/10 bg-[#0b3f5e]/70 p-6 sm:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">{destaque.rotulo}</p>
              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">{destaque.titulo}</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-200">{destaque.texto}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
