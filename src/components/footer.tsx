import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaDotCircle,
} from "react-icons/fa";
import { SERVICOS } from "@/lib/servicos";
import {
  ASSINATURA_MARCA,
  CRC_EMPRESA,
  EMAIL,
  ENDERECO_SEDE,
  HORARIO_ATENDIMENTO,
  MAPS_LINK,
  NOME_MARCA,
  RESPONSAVEL_TECNICO,
  WHATSAPP_EXIBICAO,
  waLink,
} from "@/lib/empresa";

// Endereços completos (/#...) para funcionarem também nas páginas internas.
const NAV_LINKS = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Diagnóstico Fiscal gratuito", href: "/diagnostico-fiscal" },
  { label: "Contabilidade Estratégica", href: "/contabilidade-estrategica" },
  { label: "Reforma Tributária", href: "/reforma-tributaria" },
  { label: "Tecnologia", href: "/tecnologia" },
  { label: "Atendimento Digital", href: "/atendimento-digital" },
  { label: "Blog", href: "/blog" },
  { label: "Entre em contato", href: "/#contato" },
];

const linkClasse =
  "flex items-center gap-2 text-sm text-white/65 hover:text-secondary hover:translate-x-1 transition-all duration-200";

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="gradient-dark text-white/75 bg-slate-900">
      {/* ── Corpo principal ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">

          {/* Coluna 1 — Marca */}
          <div className="xl:col-span-1">
            <Link href="/">
              <Image
                src="/logo-bmn-white.svg"
                alt="BMN Contabilidade Estratégica"
                width={395.041}
                height={202.668}
                className="h-24 w-auto mb-4"
              />
            </Link>

            <p className="text-sm text-white/80 italic leading-relaxed">{ASSINATURA_MARCA}</p>

            <div className="mt-4 space-y-1 text-xs text-white/55">
              <p>{CRC_EMPRESA}</p>
              {RESPONSAVEL_TECNICO && (
                <p>
                  Responsável técnico: {RESPONSAVEL_TECNICO.nome}, {RESPONSAVEL_TECNICO.categoria},{" "}
                  {RESPONSAVEL_TECNICO.crc}
                </p>
              )}
            </div>

            {/* Contatos rápidos */}
            <div className="mt-6 space-y-3">
              <Link
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/70 hover:text-secondary transition-colors"
              >
                <FaWhatsapp className="text-secondary text-base flex-shrink-0" />
                {WHATSAPP_EXIBICAO}
              </Link>

              <Link
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-sm text-white/70 hover:text-secondary transition-colors"
              >
                <FaEnvelope className="text-secondary text-base flex-shrink-0" />
                {EMAIL}
              </Link>

              <div className="flex items-center gap-3 text-sm text-white/70">
                <FaClock className="text-secondary text-base flex-shrink-0" />
                {HORARIO_ATENDIMENTO}
              </div>

              <Link
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/70 hover:text-secondary transition-colors"
              >
                <FaMapMarkerAlt className="text-secondary text-base flex-shrink-0 mt-0.5" />
                Sede: {ENDERECO_SEDE}
              </Link>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5 pb-3 border-b border-white/10">
              Navegação
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasse}>
                    <FaDotCircle className="text-secondary/60 text-[8px] flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Serviços (cada um na sua página) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5 pb-3 border-b border-white/10">
              Serviços
            </h4>
            <ul className="space-y-2.5">
              {SERVICOS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className={linkClasse}>
                    <FaDotCircle className="text-secondary/60 text-[8px] flex-shrink-0" />
                    {s.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — CTA */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5 pb-3 border-b border-white/10">
              Fale conosco
            </h4>

            <p className="text-sm text-white/65 leading-relaxed mb-6">
              Descubra a situação real da sua empresa e o que a Reforma Tributária muda para ela.
              Atendemos empresas de todo o Brasil, 100% digital.
            </p>

            <Link
              href="/diagnostico-fiscal"
              className="btn btn-primary flex items-center justify-center gap-2 !text-sm !px-5 !py-3 mt-3 w-full"
            >
              Diagnóstico Fiscal gratuito
            </Link>

            <Link
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex items-center justify-center gap-2 !text-sm !px-5 !py-3 mt-3 w-full"
            >
              <FaWhatsapp className="text-base" />
              Falar no WhatsApp
            </Link>
          </div>
        </div>
      </div>

      {/* ── Rodapé inferior ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/45">
            <p className="text-center md:text-left">
              {anoAtual} © {NOME_MARCA} · {CRC_EMPRESA}
            </p>

            <div className="flex items-center gap-6 flex-wrap justify-center">
              <Link href="/politica-de-privacidade" className="hover:text-secondary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos-de-uso" className="hover:text-secondary transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
