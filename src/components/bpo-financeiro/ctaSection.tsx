import { FaWhatsapp } from "react-icons/fa";
import { waLink } from "@/lib/empresa";

type CtaSectionProps = {
  rotulo: string;
  titulo: string;
  descricao: string;
  botao: { texto: string; mensagem: string };
};

export default function CtaSection({ rotulo, titulo, descricao, botao }: CtaSectionProps) {
  return (
    <section className="bg-[#041d2c] py-20 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">{rotulo}</p>
        <h2 className="mt-5 text-3xl font-black sm:text-5xl">{titulo}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-200">{descricao}</p>

        <div className="mt-8 flex justify-center">
          <a
            href={waLink(botao.mensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-4 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
          >
            <FaWhatsapp className="text-base" />
            {botao.texto}
          </a>
        </div>
      </div>
    </section>
  );
}
