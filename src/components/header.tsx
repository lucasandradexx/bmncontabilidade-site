"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";

const WA_LINK =
  "https://wa.me/558197058083?text=Ol%C3%A1!%20Encontrei%20seu%20site%20atrav%C3%A9s%20do%20Google%20e%20estou%20interessado(a)%20em%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%20Poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es,%20por%20favor?";

const navLinks = [
  { label: "Início",                  href: "#inicio"        },
  { label: "Segmentos",               href: "#especialidades" },
  { label: "Sobre Nós",               href: "#sobre"          },
  { label: "Serviços",                href: "#servicos"       },
  { label: "Propósito e Atendimento", href: "#proposito"      },
  { label: "Blog",                    href: "/blog"           },
  { label: "Entre em contato",        href: "#contato"        },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrollado,  setScrollado]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollado(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              src="logo-bmn-black.svg"
              alt="BMN Contabilidade"
              width={395.041}
              height={202.668}
              priority
              className="h-16 w-auto"
            />
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-secondary
                               link-underline transition-colors duration-200"
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

          {/* Mobile: ícone WA + hamburguer */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-secondary flex items-center
                         justify-center text-white hover:bg-primary transition-colors"
            >
              <FaWhatsapp className="text-xl" />
            </Link>

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              aria-label="Abrir menu"
              className="text-primary p-1"
            >
              {menuAberto
                ? <FaTimes  className="text-2xl" />
                : <FaBars   className="text-2xl" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${menuAberto ? "max-h-screen py-4" : "max-h-0"}`}
      >
        <nav className="max-w-7xl mx-auto px-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className="block py-3 px-2 text-sm font-medium text-gray-700
                         border-b border-gray-100 hover:text-secondary transition-colors"
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