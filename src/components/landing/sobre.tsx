import { FaWhatsapp } from "react-icons/fa";
import { CardsSocios, Tabela } from "@/components/paginas/blocos";
import {
  CRC_EMPRESA,
  FREQUENCIA_REUNIAO,
  MENSAGENS_WHATSAPP,
  PRAZO_RESPOSTA_WHATSAPP,
  waLink,
} from "@/lib/empresa";

const FRENTES: [string, string][] = [
  [
    "Diagnóstico e regularização",
    "Levantamento de pendências na Receita, PGFN, estado e município, com plano para colocar a empresa em dia",
  ],
  [
    "Planejamento tributário e Reforma",
    "Escolha do regime, simulações e preparação para a CBS e o IBS",
  ],
  [
    "Contabilidade e BPO",
    "Contabilidade mensal, BPO Fiscal e BPO Financeiro, com relatórios que ajudam a decidir",
  ],
  ["Departamento Pessoal", "Folha, admissões, rescisões, eSocial e FGTS Digital"],
  ["Estruturação da empresa", "Abertura, alterações contratuais e organização societária"],
];

const CONFIANCA = [
  {
    titulo: "Registro profissional",
    texto: `Escritório registrado no ${CRC_EMPRESA}, com contador responsável identificado.`,
  },
  {
    titulo: "Sigilo profissional e LGPD",
    texto: "Dados tratados com sigilo e conforme a Lei Geral de Proteção de Dados.",
  },
  {
    titulo: "Processos documentados",
    texto: "Rotinas com procedimentos padronizados e conferência antes de cada entrega.",
  },
  {
    titulo: "Tecnologia",
    texto: "Área do Cliente, monitoramento fiscal contínuo e documentos digitais.",
  },
];

const COMPROMISSOS = [
  PRAZO_RESPOSTA_WHATSAPP
    ? `Resposta no WhatsApp em até ${PRAZO_RESPOSTA_WHATSAPP}`
    : "Resposta rápida no WhatsApp, com quem cuida da sua conta",
  FREQUENCIA_REUNIAO
    ? `Reunião de acompanhamento com os sócios a cada ${FREQUENCIA_REUNIAO}`
    : "Reuniões periódicas de acompanhamento com os sócios",
  "Aviso antecipado de prazos e mudanças que afetam a empresa",
  "Linguagem clara: sem contabilês",
];

export default function Sobre() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Abertura */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="tag-section">Sobre nós</span>
          <h2 className="section-title mt-1">Quem está por trás dos seus números</h2>
          <div className="divider-gradient mx-auto" />
          <p className="mt-6 text-base leading-relaxed text-gray-600">
            A <strong className="font-semibold text-primary">BMN Contabilidade Estratégica</strong>{" "}
            nasceu de uma convicção: o dono de uma pequena ou média empresa merece o mesmo nível de
            estratégia tributária que as grandes empresas têm. Por isso, aqui cada cliente é
            acompanhado de perto pelos sócios, com técnica, tecnologia e uma comunicação que
            qualquer empresário entende. Com sede em Recife-PE, atendemos empresas de todo o Brasil.
          </p>
        </div>

        {/* Manifesto */}
        <blockquote className="mx-auto mt-10 max-w-3xl rounded-2xl border-l-4 border-secondary bg-slate-50 p-6 text-base italic leading-relaxed text-gray-700 sm:p-8">
          Todo dono de empresa já tomou uma decisão importante sem saber quanto ela custaria em
          impostos. A BMN existe para mudar isso. Unimos contabilidade técnica, tecnologia e
          acompanhamento próximo dos sócios para que pequenas e médias empresas de todo o Brasil
          cresçam em dia com o fisco e preparadas para a Reforma Tributária.{" "}
          <strong className="not-italic text-primary">
            Nós cuidamos dos números. Você cuida do crescimento.
          </strong>
        </blockquote>

        {/* O que fazemos por você */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-xl font-bold text-primary">O que fazemos por você</h3>
          <Tabela cabecalho={["Frente", "O que entregamos"]} linhas={FRENTES} />
        </div>

        {/* Os sócios */}
        <div className="mt-16 text-center">
          <h3 className="mb-6 text-xl font-bold text-primary">Os sócios</h3>
          <CardsSocios />
          <p className="mx-auto mt-8 max-w-2xl text-base italic text-gray-600">
            Aqui você não fala com uma central de atendimento. Você fala com quem cuida da sua
            empresa e responde por ela.
          </p>
        </div>

        {/* Por que confiar + compromissos */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 text-xl font-bold text-primary">Por que confiar na BMN</h3>
            <ul className="space-y-4">
              {CONFIANCA.map((item) => (
                <li key={item.titulo} className="valor-badge !block !py-3 !text-sm leading-relaxed">
                  <strong className="text-primary">{item.titulo}:</strong> {item.texto}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-bold text-primary">Nossos compromissos com o cliente</h3>
            <ul className="space-y-4">
              {COMPROMISSOS.map((item) => (
                <li key={item} className="valor-badge !block !py-3 !text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chamada final */}
        <div className="mt-12 text-center">
          <a
            href={waLink(MENSAGENS_WHATSAPP.socios)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <FaWhatsapp className="text-lg" />
            Converse diretamente com os sócios
          </a>
        </div>
      </div>
    </section>
  );
}
