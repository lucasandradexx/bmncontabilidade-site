"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaWhatsapp, FaChevronDown } from "react-icons/fa";

const WA_LINK =
  "https://wa.me/558194725310?text=Ol%C3%A1!%20Encontrei%20seu%20site%20atrav%C3%A9s%20do%20Google%20e%20estou%20interessado(a)%20em%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%20Poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es,%20por%20favor?";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Segmentos", href: "/#especialidades" },
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Propósito e Atendimento", href: "/#proposito" },
  { label: "Entre em contato", href: "/#contato" },
];

const servicosLinks = [
  { label: "Contabilidade consultiva", href: "/servicos/contabilidade-consultiva" },
  { label: "Planejamento tributário", href: "/servicos/planejamento-tributario" },
  { label: "Obrigações acessórias", href: "/servicos/obrigacoes-acessorias" },
  { label: "BPO Fiscal", href: "/servicos/bpo-fiscal" },
  { label: "BPO Financeiro", href: "/servicos/bpo-financeiro" },
  { label: "Gestão financeira", href: "/servicos/gestao-financeira" },
  { label: "Folha de pagamento", href: "/servicos/folha-de-pagamento" },
  { label: "E-social doméstico", href: "/servicos/e-social-domestico" },
  { label: "Abertura de empresas", href: "/servicos/abertura-de-empresas" },
  { label: "Regularização", href: "/servicos/regularizacao" },
  { label: "Imposto de renda", href: "/servicos/imposto-de-renda" },
  { label: "Certificado Digital", href: "/servicos/certificado-digital" },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrollado, setScrollado] = useState(false);
  const [servicosMobileAberto, setServicosMobileAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollado(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuAberto) setServicosMobileAberto(false);
  }, [menuAberto]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
        scrollado ? "shadow-lg" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-bmn-black.svg"
              alt="BMN Contabilidade"
              width={395.041}
              height={202.668}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/#inicio"
                  className="text-sm font-medium text-gray-700 hover:text-secondary link-underline transition-colors duration-200"
                >
                  Início
                </Link>
              </li>

              <li>
                <Link
                  href="/#especialidades"
                  className="text-sm font-medium text-gray-700 hover:text-secondary link-underline transition-colors duration-200"
                >
                  Segmentos
                </Link>
              </li>

              <li>
                <Link
                  href="/#sobre"
                  className="text-sm font-medium text-gray-700 hover:text-secondary link-underline transition-colors duration-200"
                >
                  Sobre Nós
                </Link>
              </li>

              {/* Serviços com dropdown */}
              <li className="relative group">
                <div className="inline-flex items-center gap-2">
                  <Link
                    href="/#servicos"
                    className="text-sm font-medium text-gray-700 hover:text-secondary link-underline transition-colors duration-200"
                  >
                    Serviços
                  </Link>
                  <FaChevronDown className="text-xs text-gray-600 transition-transform duration-200 group-hover:rotate-180" />
                </div>

                <div
                  className="
                    absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50
                    opacity-0 invisible -translate-y-1
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-200
                  "
                >
                  <div className="w-[620px] max-h-[420px] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {servicosLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>

              {/* Restante */}
              {navLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-secondary link-underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2 !px-5 !py-3 !text-sm"
            >
              <FaWhatsapp className="text-lg" />
              Fale com um especialista
            </Link>
          </nav>

          {/* MOBILE */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <FaWhatsapp className="text-xl" />
            </Link>

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              aria-label="Abrir menu"
              className="text-primary p-1"
            >
              {menuAberto ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          menuAberto ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 flex flex-col gap-1">
          <Link
            href="/#inicio"
            onClick={() => setMenuAberto(false)}
            className="block py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-secondary transition-colors"
          >
            Início
          </Link>

          <Link
            href="/#especialidades"
            onClick={() => setMenuAberto(false)}
            className="block py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-secondary transition-colors"
          >
            Segmentos
          </Link>

          <Link
            href="/#sobre"
            onClick={() => setMenuAberto(false)}
            className="block py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-secondary transition-colors"
          >
            Sobre Nós
          </Link>

          {/* Serviços (mobile) */}
          <div className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => setServicosMobileAberto((prev) => !prev)}
              className="w-full py-3 px-2 text-sm font-medium text-gray-700 hover:text-secondary transition-colors flex items-center justify-between"
              aria-expanded={servicosMobileAberto}
            >
              Serviços
              <FaChevronDown
                className={`text-xs transition-transform duration-200 ${
                  servicosMobileAberto ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                servicosMobileAberto ? "max-h-[520px] pb-2" : "max-h-0"
              }`}
            >
              <Link
                href="/#servicos"
                onClick={() => {
                  setServicosMobileAberto(false);
                  setMenuAberto(false);
                }}
                className="block py-2 pl-6 pr-2 text-sm text-gray-600 hover:text-secondary transition-colors"
              >
                Ver seção de Serviços
              </Link>

              {servicosLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setServicosMobileAberto(false);
                    setMenuAberto(false);
                  }}
                  className="block py-2 pl-6 pr-2 text-sm text-gray-600 hover:text-secondary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className="block py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuAberto(false)}
            className="btn btn-primary justify-center mt-4"
          >
            <FaWhatsapp />
            Fale com um especialista
          </Link>
        </nav>
      </div>
    </header>
  );
}