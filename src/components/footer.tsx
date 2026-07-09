import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaDotCircle,
} from "react-icons/fa";

const WA_LINK =
  "https://wa.me/558194725310?text=Ol%C3%A1!%20Encontrei%20seu%20site%20atrav%C3%A9s%20do%20Google%20e%20estou%20interessado(a)%20em%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%20Poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es,%20por%20favor?";

const NAV_LINKS = [
  { label: "Início",                        href: "#inicio"         },
  { label: "Segmentos",                     href: "#especialidades" },
  { label: "Sobre Nós",                     href: "#sobre"          },
  { label: "Serviços",                      href: "#servicos"       },
  { label: "Propósito e modelo atendimento",href: "#proposito"      },
  { label: "Blog",                          href: "/blog"           },
  { label: "Entre em contato",              href: "#contato"        },
];

const SERVICOS_LINKS = [
  "Abertura e Legalização Empresarial",
  "Consultoria Estratégica e Planejamento",
  "Departamento Contábil e Financeiro",
  "Departamento Fiscal e Tributário",
  "Departamento Pessoal e RH",
  "MEI e Microempreendedores",
];

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="gradient-dark text-white/75">

      {/* ── Corpo principal ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">

          {/* Coluna 1 — Marca */}
          <div className="xl:col-span-1">
            <Link href="/">
              <Image
                src="/logo-bmn-white.svg"
                alt="BMN Contabilidade"
                width={395.041}
                height={202.668}
                className="h-24 w-auto mb-4"
              />
            </Link>

            <p className="text-xs text-white/50 mb-5">CRC: 033381/O-0</p>

            <p className="text-sm text-white/70 leading-relaxed">
              <strong className="text-white font-semibold">
                Toda empresa sólida começa por trás, onde poucos olham.
              </strong>
              <br />
              A BMN está nesse bastidor para que você esteja à frente com segurança.
            </p>

            {/* Contatos rápidos */}
            <div className="mt-6 space-y-3">
              <Link
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/70
                           hover:text-secondary transition-colors"
              >
                <FaWhatsapp className="text-secondary text-base flex-shrink-0" />
                (81) 99472-5310              </Link>

              <Link
                href="mailto:contato@bmncontabilidade.com"
                className="flex items-center gap-3 text-sm text-white/70
                           hover:text-secondary transition-colors"
              >
                <FaEnvelope className="text-secondary text-base flex-shrink-0" />
                contato@bmncontabilidade.com
              </Link>

              <div className="flex items-center gap-3 text-sm text-white/70">
                <FaClock className="text-secondary text-base flex-shrink-0" />
                Seg – Sex: 9h às 18h
              </div>

              <div className="flex items-start gap-3 text-sm text-white/70">
                <FaMapMarkerAlt className="text-secondary text-base flex-shrink-0 mt-0.5" />
                R. Cap. José da Luz, 25 – Coelhos, Recife/PE – CEP 50070-540 Empresarial Joaquim Cardoso, salas 505/506
              </div>
            </div>
          </div>

          {/* Coluna 2 — Navegação */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5
                           pb-3 border-b border-white/10">
              Navegação
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/65
                               hover:text-secondary hover:translate-x-1
                               transition-all duration-200"
                  >
                    <FaDotCircle className="text-secondary/60 text-[8px] flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Serviços */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5
                           pb-3 border-b border-white/10">
              Serviços
            </h4>
            <ul className="space-y-3">
              {SERVICOS_LINKS.map((s) => (
                <li key={s}>
                  <Link
                    href="#servicos"
                    className="flex items-center gap-2 text-sm text-white/65
                               hover:text-secondary hover:translate-x-1
                               transition-all duration-200"
                  >
                    <FaDotCircle className="text-secondary/60 text-[8px] flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — CTA */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-5
                           pb-3 border-b border-white/10">
              Fale conosco
            </h4>

            <p className="text-sm text-white/65 leading-relaxed mb-6">
              Pronto para transformar a gestão do seu negócio? Entre em contato e
              descubra como podemos ajudar.
            </p>

            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center justify-center
                         gap-2 !text-sm !px-5 !py-3 mt-3 w-full"
            >
              <FaWhatsapp className="text-base" />
              Falar no WhatsApp
            </Link>

            <Link
              href="#contato"
              className="btn btn-outline flex items-center justify-center
                         gap-2 !text-sm !px-5 !py-3 mt-3 w-full"
            >
              Enviar mensagem
            </Link>
          </div>
        </div>
      </div>

      {/* ── Rodapé inferior ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center
                          justify-between gap-4 text-xs text-white/45">

            {/* Copyright */}
            <p>
              {anoAtual} © Contabilidade em Recife - PE | BMN Contabilidade
            </p>

            {/* Links legais */}
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <Link
                href="/politica-de-privacidade"
                className="hover:text-secondary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos-de-uso"
                className="hover:text-secondary transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}