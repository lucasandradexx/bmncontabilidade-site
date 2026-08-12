"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type HubItem = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  side: "left" | "right" | "top" | "bottom";
};

const CARD_W = 225;
const CARD_H = 52;

// Base do desenho
const BASE_W = 1080;
const BASE_H = 702;

const CENTER_X = BASE_W / 2;
const CENTER_Y = 333;
const CENTER_R = 99;

// Linhas
const LINE_COLOR = "#22d3ee";
const LINE_STROKE = 6;
const START_OFFSET = 14;
const END_OFFSET = 0;

const ITENS: HubItem[] = [
  {
    id: "contabilidade-consultiva",
    label: "Contabilidade Consultiva",
    href: "/servicos/contabilidade-consultiva",
    x: CENTER_X - CARD_W / 2,
    y: 36,
    side: "bottom",
  },
  {
    id: "planejamento-tributario",
    label: "Planejamento Tributário",
    href: "/servicos/planejamento-tributario",
    x: 702,
    y: 86,
    side: "left",
  },
  {
    id: "obrigacoes-acessorias",
    label: "Obrigações Acessórias",
    href: "/servicos/obrigacoes-acessorias",
    x: 815,
    y: 189,
    side: "left",
  },
  {
    id: "bpo-fiscal",
    label: "BPO Fiscal",
    href: "/servicos/bpo-fiscal",
    x: 855,
    y: 293,
    side: "left",
  },
  {
    id: "bpo-financeiro",
    label: "BPO Financeiro",
    href: "/bpo-financeiro",
    x: 815,
    y: 396,
    side: "left",
  },
  {
    id: "gestao-financeira",
    label: "Gestão Financeira",
    href: "/servicos/gestao-financeira",
    x: 702,
    y: 500,
    side: "left",
  },
  {
    id: "folha-pagamento",
    label: "Folha de Pagamento",
    href: "/servicos/folha-de-pagamento",
    x: CENTER_X - CARD_W / 2,
    y: 576,
    side: "top",
  },
  {
    id: "e-social-domestico",
    label: "E-Social Doméstico",
    href: "/servicos/e-social-domestico",
    x: 153,
    y: 500,
    side: "right",
  },
  {
    id: "abertura-empresas",
    label: "Abertura de Empresas",
    href: "/servicos/abertura-de-empresas",
    x: 41,
    y: 396,
    side: "right",
  },
  {
    id: "regularizacao",
    label: "Regularização",
    href: "/servicos/regularizacao",
    x: 0,
    y: 293,
    side: "right",
  },
  {
    id: "imposto-renda",
    label: "Imposto de Renda",
    href: "/servicos/imposto-de-renda",
    x: 41,
    y: 189,
    side: "right",
  },
  {
    id: "certificado-digital",
    label: "Certificado Digital",
    href: "/servicos/certificado-digital",
    x: 153,
    y: 86,
    side: "right",
  },
];

function getStartPoint(targetX: number, targetY: number) {
  const dx = targetX - CENTER_X;
  const dy = targetY - CENTER_Y;
  const dist = Math.hypot(dx, dy) || 1;

  return {
    sx: CENTER_X + (dx / dist) * (CENTER_R + START_OFFSET),
    sy: CENTER_Y + (dy / dist) * (CENTER_R + START_OFFSET),
  };
}

function getAnchor(item: HubItem) {
  switch (item.side) {
    case "left":
      return { ax: item.x, ay: item.y + CARD_H / 2 };
    case "right":
      return { ax: item.x + CARD_W, ay: item.y + CARD_H / 2 };
    case "top":
      return { ax: item.x + CARD_W / 2, ay: item.y };
    case "bottom":
      return { ax: item.x + CARD_W / 2, ay: item.y + CARD_H };
  }
}

function getPolylinePoints(item: HubItem) {
  const { ax, ay } = getAnchor(item);
  const { sx, sy } = getStartPoint(ax, ay);

  if (item.side === "left" || item.side === "right") {
    const ex = item.side === "left" ? ax - END_OFFSET : ax + END_OFFSET;
    const mx = (sx + ex) / 2;
    return `${sx},${sy} ${mx},${sy} ${mx},${ay} ${ex},${ay}`;
  }

  const ey = item.side === "top" ? ay - END_OFFSET : ay + END_OFFSET;
  const my = (sy + ey) / 2;
  return `${sx},${sy} ${sx},${my} ${ax},${my} ${ax},${ey}`;
}

/** CARD DESKTOP */
function HubItemCard({ item }: { item: HubItem }) {
  return (
    <Link
      href={item.href}
      aria-label={`Abrir serviço: ${item.label}`}
      className="
        group relative flex items-center justify-center
        w-[225px] h-[52px] rounded-full bg-white/10
        px-3
        text-[16px] font-semibold text-white text-center leading-tight
        border border-white/25 shadow-[0_9px_20px_rgba(0,0,0,0.28)]
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.35)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
      "
    >
      <span
        className="
          pointer-events-none absolute inset-0 rounded-full border-2 border-white/10
          opacity-0 group-hover:opacity-100
          transition-opacity duration-150
        "
      />
      <span className="relative z-10 block w-full text-center">{item.label}</span>
    </Link>
  );
}

/** CARD MOBILE/TABLET */
function HubItemCardMobile({ item, index }: { item: HubItem; index: number }) {
  return (
    <Link
      href={item.href}
      aria-label={`Abrir serviço: ${item.label}`}
      className="
        group rounded-2xl border border-slate-200 bg-white
        p-4 shadow-sm transition-all
        hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
      "
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
          {index + 1}
        </span>
        <p className="text-sm font-semibold leading-snug text-slate-800 group-hover:text-slate-900">
          {item.label}
        </p>
      </div>
    </Link>
  );
}

export default function HubServicosSection() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 1024) {
        setScale(1);
        return;
      }

      const availableW = window.innerWidth - 40;
      const availableH = window.innerHeight - 170;

      const next = Math.min(availableW / BASE_W, availableH / BASE_H);
      setScale(Math.max(0.85, next));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <section className="py-14 bg-gradient-to-r from-secondary via-primary to-[#0f5c72]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-3">
          <span className="inline-block text-white/80 text-[12px] font-medium tag-section">
            Nossas soluções estratégicas
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            Hub de Serviços BMN
          </h2>
        </div>

        {/* MOBILE/TABLET */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-5xl mx-auto mt-6">
          {ITENS.map((item, index) => (
            <HubItemCardMobile key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block mt-12 scale-128">
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-2 xl:px-4">
          <div className="mx-auto flex min-h-[calc(100vh-170px)] items-center justify-center overflow-hidden">
            <div
              className="relative origin-center"
              style={{
                width: BASE_W,
                height: BASE_H,
                transform: `scale(${scale})`,
              }}
            >
              <svg
                className="absolute inset-0 pointer-events-none z-10"
                width={BASE_W}
                height={BASE_H}
                viewBox={`0 0 ${BASE_W} ${BASE_H}`}
                aria-hidden="true"
              >
                {ITENS.map((item) => (
                  <polyline
                    key={`line-${item.id}`}
                    points={getPolylinePoints(item)}
                    fill="none"
                    stroke={LINE_COLOR}
                    strokeOpacity="0.95"
                    strokeWidth={LINE_STROKE}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>

              {/* núcleo central */}
              <div
                className="
                  absolute z-20 rounded-full border-[8px] border-[#22d3ee] bg-transparent
                  shadow-[0_16px_34px_rgba(0,0,0,0.35)]
                "
                style={{
                  width: CENTER_R * 2 + 32,
                  height: CENTER_R * 2 + 32,
                  left: CENTER_X - (CENTER_R + 16),
                  top: CENTER_Y - (CENTER_R + 16),
                }}
              >
                <strong
                  className="
                    absolute inset-0 flex items-center justify-center
                    text-[72px] leading-none text-white
                  "
                >
                  BMN
                </strong>
              </div>

              {ITENS.map((item) => (
                <div key={item.id} className="absolute z-30" style={{ left: item.x, top: item.y }}>
                  <HubItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}