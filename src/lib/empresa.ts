// src/lib/empresa.ts
// Dados institucionais da BMN usados em todo o site.
// Campos com valor `null` ainda precisam ser informados pelos sócios: enquanto
// estiverem vazios, o trecho correspondente simplesmente não aparece no site.

export const NOME_MARCA = "BMN Contabilidade Estratégica";
export const ASSINATURA_MARCA =
  "BMN Contabilidade Estratégica — clareza para decidir, estratégia para crescer.";

export const CRC_EMPRESA = "CRC-PE 033381/O-0";

// TODO(sócios): razão social e CNPJ (exigidos na Política de Privacidade).
export const RAZAO_SOCIAL: string | null = null;
export const CNPJ: string | null = null;

// TODO(sócios): responsável técnico, obrigatório no rodapé e em todas as peças (NBC PG 01).
// Exemplo: { nome: "Yuri Matos", categoria: "Contador", crc: "CRC-PE 000000/O-0" }
export const RESPONSAVEL_TECNICO: { nome: string; categoria: string; crc: string } | null = null;

export const EMAIL = "contato@bmncontabilidade.com";

// Encarregado de dados (LGPD). Sem nome definido, o contato é o e-mail geral.
export const ENCARREGADO_DADOS: { nome: string | null; email: string } = {
  nome: null,
  email: EMAIL,
};

export const WHATSAPP_NUMERO = "558194725310";
export const WHATSAPP_EXIBICAO = "(81) 99472-5310";
export const HORARIO_ATENDIMENTO = "Seg – Sex: 9h às 17h";

export const ENDERECO_SEDE =
  "R. Cap. José da Luz, 25, salas 505/506 – Empresarial Joaquim Cardoso, Coelhos, Recife-PE – CEP 50070-540";
export const ENDERECO_CURTO = "R. Cap. José da Luz, 25, salas 505/506, Coelhos, Recife-PE";
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Rua+Capit%C3%A3o+Jos%C3%A9+da+Luz%2C+25%2C+Coelhos%2C+Recife%2C+PE%2C+50070-540";

export const AREA_DO_CLIENTE_LINK =
  "https://mnconsultoria.app.questorpublico.com.br/Authorize/LogOn?ReturnUrl=%2fempresa%2finicio";

export type Socio = {
  nome: string;
  cargo: string;
  foto: string;
  objectPosition: string;
  // TODO(sócios): "Contador, CRC-PE nº ..."
  registro: string | null;
  // TODO(sócios): texto curto em primeira pessoa (formação, experiência, frente que lidera).
  bio: string | null;
};

export const SOCIOS: Socio[] = [
  {
    nome: "Yuri Matos",
    cargo: "Sócio",
    foto: "/yuri.jpg",
    objectPosition: "50% 30%",
    registro: null,
    bio: null,
  },
  {
    nome: "Admys Lucas",
    cargo: "Sócio",
    foto: "/lucas.jpg",
    objectPosition: "50% 22%",
    registro: null,
    bio: null,
  },
];

// TODO(sócios): prazo real de resposta e frequência das reuniões.
// Enquanto estiverem `null`, o site usa uma redação sem números.
export const PRAZO_RESPOSTA_WHATSAPP: string | null = null; // ex.: "2 horas úteis"
export const FREQUENCIA_REUNIAO: string | null = null; // ex.: "trimestre"

// Mensagens prontas do WhatsApp: cada botão identifica a página de origem.
export const MENSAGENS_WHATSAPP = {
  padrao: "Olá! Vim pelo site e gostaria de conversar com a BMN.",
  diagnostico: "Olá! Vim pelo site e quero agendar meu Diagnóstico Fiscal gratuito.",
  trocaContador: "Olá! Vim pelo site e estou pensando em trocar de contador.",
  socios: "Olá! Vim pelo site e gostaria de conversar com os sócios da BMN.",
  raioXFinanceiro:
    "Olá! Vim pela página de BPO Financeiro e quero agendar o Raio-X Financeiro.",
  propostaBpoFinanceiro: "Olá! Vim pela página de BPO Financeiro e quero uma proposta.",
  bpoFiscal:
    "Olá! Vim pela página de BPO Fiscal e quero agendar meu Diagnóstico Fiscal gratuito.",
  reforma:
    "Olá! Vim pela página da Reforma Tributária e quero o Raio-X da Reforma da minha empresa.",
  contabilidadeEstrategica:
    "Olá! Vim pela página de Contabilidade Estratégica e quero agendar meu Diagnóstico Fiscal gratuito.",
  tecnologia: "Olá! Vim pela página de Tecnologia e gostaria de conhecer a Área do Cliente.",
  atendimentoDigital:
    "Olá! Vim pela página de Atendimento Digital e gostaria de saber como funciona para a minha empresa.",
  blog: "Olá! Vim pelo blog da BMN e gostaria de conversar.",
} as const;

export function waLink(mensagem: string = MENSAGENS_WHATSAPP.padrao) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}
