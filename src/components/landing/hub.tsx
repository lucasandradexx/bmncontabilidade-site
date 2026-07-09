"use client";

import Link from "next/link";

type HubItem = {
  id: string;
  label: string;
  href: string;
  x: number;
  y: number;
  side: "left" | "right" | "top" | "bottom";
};

const CARD_W = 225; // 250 * 0.9
const CARD_H = 52; // 58 * 0.9

const DESKTOP_W = 1080; // 1200 * 0.9
const DESKTOP_H = 702; // 780 * 0.9

const CENTER_X = DESKTOP_W / 2;
const CENTER_Y = 333; // 370 * 0.9
const CENTER_R = 99; // 110 * 0.9

const ITENS: HubItem[] = [
  {
    id: "contabilidade-consultiva",
    label: "Contabilidade consultiva",
    href: "/servicos/contabilidade-consultiva",
    x: CENTER_X - CARD_W / 2,
    y: 36,
    side: "bottom",
  },
  {
    id: "planejamento-tributario",
    label: "Planejamento tributário",
    href: "/servicos/planejamento-tributario",
    x: 702,
    y: 86,
    side: "left",
  },
  {
    id: "obrigacoes-acessorias",
    label: "Obrigações acessórias",
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
    href: "/servicos/bpo-financeiro",
    x: 815,
    y: 396,
    side: "left",
  },
  {
    id: "gestao-financeira",
    label: "Gestão financeira",
    href: "/servicos/gestao-financeira",
    x: 702,
    y: 500,
    side: "left",
  },
  {
    id: "folha-pagamento",
    label: "Folha de pagamento",
    href: "/servicos/folha-de-pagamento",
    x: CENTER_X - CARD_W / 2,
    y: 576,
    side: "top",
  },
  {
    id: "e-social-domestico",
    label: "E-social doméstico",
    href: "/servicos/e-social-domestico",
    x: 153,
    y: 500,
    side: "right",
  },
  {
    id: "abertura-empresas",
    label: "Abertura de empresas",
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
    label: "Imposto de renda",
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
    sx: CENTER_X + (dx / dist) * CENTER_R,
    sy: CENTER_Y + (dy / dist) * CENTER_R,
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

  const endOffset = 13;

  if (item.side === "left" || item.side === "right") {
    const ex = item.side === "left" ? ax - endOffset : ax + endOffset;
    const mx = (sx + ex) / 2;
    return `${sx},${sy} ${mx},${sy} ${mx},${ay} ${ex},${ay}`;
  }

  const ey = item.side === "top" ? ay - endOffset : ay + endOffset;
  const my = (sy + ey) / 2;
  return `${sx},${sy} ${sx},${my} ${ax},${my} ${ax},${ey}`;
}

function HubItemCard({ item }: { item: HubItem }) {
  return (
    <Link
      href={item.href}
      aria-label={`Abrir serviço: ${item.label}`}
      className="
        group relative flex items-center justify-center
        w-[225px] h-[52px] rounded-2xl bg-white/95
        px-3
        text-[16px] font-semibold text-slate-800 text-center leading-tight
        border border-white/60 shadow-[0_9px_20px_rgba(0,0,0,0.28)]
        transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.35)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
      "
    >
      <span
        className="
          pointer-events-none absolute inset-0 rounded-2xl border-2 border-cyan-400/95
          opacity-0 group-hover:opacity-100
          transition-opacity duration-150
        "
      />
      <span className="relative z-10 block w-full text-center">{item.label}</span>
    </Link>
  );
}

export default function HubServicosSection() {
  return (
    <section
      className="py-14"
      style={{ background: "linear-gradient(160deg, #020e17 0%, #041d2c 50%, #020e17 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-3">
          <span className="inline-block text-cyan-300/90 text-[12px] font-medium tag-section">
            Nossas soluções estratégicas
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            Hub de Serviços BMN
          </h2>
        </div>

        {/* MOBILE/TABLET */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto mt-6">
          {ITENS.map((item) => (
            <HubItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block">
          <div className="relative mx-auto" style={{ width: DESKTOP_W, height: DESKTOP_H }}>
            <svg
              className="absolute inset-0 pointer-events-none z-10"
              width={DESKTOP_W}
              height={DESKTOP_H}
              viewBox={`0 0 ${DESKTOP_W} ${DESKTOP_H}`}
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="arrow-cyan"
                  markerWidth="9"
                  markerHeight="9"
                  refX="7"
                  refY="4.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L9,4.5 L0,9 Z" fill="#22d3ee" />
                </marker>
              </defs>

              {ITENS.map((item) => (
                <polyline
                  key={`line-${item.id}`}
                  points={getPolylinePoints(item)}
                  fill="none"
                  stroke="#22d3ee"
                  strokeOpacity="0.85"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  markerEnd="url(#arrow-cyan)"
                />
              ))}
            </svg>

            {/* núcleo central */}
            <div
              className="
                absolute z-20 rounded-full bg-white border-4 border-white/90
                shadow-[0_16px_34px_rgba(0,0,0,0.35)]
              "
              style={{
                width: CENTER_R * 2,
                height: CENTER_R * 2,
                left: CENTER_X - CENTER_R,
                top: CENTER_Y - CENTER_R,
              }}
            >
              <strong
                className="
                  absolute inset-0 flex items-center justify-center
                  text-[58px] leading-none text-[#063755]
                "
              >
                BMN
              </strong>

              <div className="absolute left-1/2 top-102/200 -translate-x-1/2 translate-y-[20px] flex flex-col items-center leading-none">
                <span className="text-[13px] font-bold text-[#139A9E] uppercase">
                  Contabilidade
                </span>
                <span className="text-[13px] font-bold text-[#063755] uppercase">
                  Estratégica
                </span>
              </div>
            </div>

            {ITENS.map((item) => (
              <div key={item.id} className="absolute z-30" style={{ left: item.x, top: item.y }}>
                <HubItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}