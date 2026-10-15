"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { SERVICOS } from "@/lib/servicos";
import { AREA_DO_CLIENTE_LINK } from "@/lib/empresa";

const navAntes = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre Nós", href: "/#sobre" },
];

const navDepois = [
  { label: "Reforma Tributária", href: "/reforma-tributaria" },
  { label: "Atendimento Digital", href: "/atendimento-digital" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/#contato" },
];

const estrategiaLinks = [
  { label: "Diagnóstico Fiscal gratuito", href: "/diagnostico-fiscal" },
  { label: "Contabilidade Estratégica", href: "/contabilidade-estrategica" },
  { label: "Reforma Tributária", href: "/reforma-tributaria" },
  { label: "Tecnologia", href: "/tecnologia" },
];

const servicosLinks = SERVICOS.map((s) => ({ label: s.titulo, href: `/servicos/${s.slug}` }));
const metade = Math.ceil(servicosLinks.length / 2);
const servicosColuna1 = servicosLinks.slice(0, metade);
const servicosColuna2 = servicosLinks.slice(metade);

const linkDesktop =
  "text-sm font-medium text-gray-700 hover:text-secondary link-underline transition-colors duration-200";
const linkMobile =
  "block py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-100 hover:text-secondary transition-colors";
const itemDropdown =
  "block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrollado, setScrollado] = useState(false);
  const [servicosMobileAberto, setServicosMobileAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollado(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fecharTudo = () => {
    setServicosMobileAberto(false);
    setMenuAberto(false);
  };

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
              alt="BMN Contabilidade Estratégica"
              width={395.041}
              height={202.668}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navAntes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkDesktop}>
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Serviços com dropdown */}
              <li className="relative group">
                <div className="inline-flex items-center gap-2">
                  <Link href="/#servicos" className={linkDesktop}>
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
                  <div className="w-[660px] max-h-[520px] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl p-3">
                    <p className="px-3 pt-1 pb-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                      Estratégia
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 mb-2 pb-2 border-b border-gray-100">
                      {estrategiaLinks.map((item) => (
                        <Link key={item.href} href={item.href} className={itemDropdown}>
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <p className="px-3 pt-1 pb-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                      Serviços
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        {servicosColuna1.map((item) => (
                          <Link key={item.href} href={item.href} className={itemDropdown}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {servicosColuna2.map((item) => (
                          <Link key={item.href} href={item.href} className={itemDropdown}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {navDepois.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkDesktop}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={AREA_DO_CLIENTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex items-center gap-2 !px-5 !py-3 !text-sm"
            >
              Área do Cliente
            </Link>
          </nav>

          {/* MOBILE */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={AREA_DO_CLIENTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !px-4 !py-2 !text-sm"
            >
              Área do Cliente
            </Link>

            <button
              onClick={() => (menuAberto ? fecharTudo() : setMenuAberto(true))}
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
        className={`lg:hidden bg-white border-t border-gray-100 overflow-y-auto transition-all duration-300 ease-in-out ${
          menuAberto ? "max-h-[calc(100svh-5rem)] py-4" : "max-h-0"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 flex flex-col gap-1">
          {navAntes.map((link) => (
            <Link key={link.href} href={link.href} onClick={fecharTudo} className={linkMobile}>
              {link.label}
            </Link>
          ))}

          {/* Serviços (mobile) */}
          <div className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => setServicosMobileAberto((prev) => !prev)}
              className="w-full py-3 px-2 text-sm font-medium text-gray-700 hover:text-secondary transition-colors flex items-center justify-between"
              aria-expanded={servicosMobileAberto}
            >
              Serviços e soluções
              <FaChevronDown
                className={`text-xs transition-transform duration-200 ${
                  servicosMobileAberto ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                servicosMobileAberto ? "max-h-[1000px] pb-2" : "max-h-0"
              }`}
            >
              {[...estrategiaLinks, ...servicosLinks].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={fecharTudo}
                  className="block py-2 pl-6 pr-2 text-sm text-gray-600 hover:text-secondary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {navDepois.map((link) => (
            <Link key={link.href} href={link.href} onClick={fecharTudo} className={linkMobile}>
              {link.label}
            </Link>
          ))}

          <Link href="/diagnostico-fiscal" onClick={fecharTudo} className="btn btn-primary justify-center mt-4">
            Diagnóstico Fiscal gratuito
          </Link>
        </nav>
      </div>
    </header>
  );
}
