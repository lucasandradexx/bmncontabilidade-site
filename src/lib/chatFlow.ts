// Árvore de conversa do Assistente da BMN.
// Cada nó é uma pergunta/mensagem do bot; "menu" oferece opções clicáveis de navegação,
// "escolha_unica" é uma pergunta de múltipla escolha que salva a resposta em `campo`,
// "pergunta_aberta" espera o usuário digitar e salva a resposta em `campo`,
// "informativo" só exibe uma mensagem e segue para o próximo nó,
// "fim" encerra aquele ramo da conversa.

export type CampoLead =
  | "nome"
  | "produtoServico"
  | "funcionamentoNegocio"
  | "clientesAlvo"
  | "formatoAtividade"
  | "razaoSocialCnpj"
  | "atividadePrincipal"
  | "faturamentoMedio"
  | "motivoTroca"
  | "expectativaNovaContabilidade"
  | "prazoTroca"
  | "telefone";

type OpcaoMenu = {
  texto: string;
  proximo: string;
};

type NoMenu = {
  tipo: "menu";
  id: string;
  pergunta: string;
  opcoes: OpcaoMenu[];
};

type NoEscolhaUnica = {
  tipo: "escolha_unica";
  id: string;
  pergunta: string;
  campo: CampoLead;
  opcoes: string[];
  proximo: string;
};

type NoPerguntaAberta = {
  tipo: "pergunta_aberta";
  id: string;
  pergunta: string;
  campo: CampoLead;
  proximo: string;
};

type NoInformativo = {
  tipo: "informativo";
  id: string;
  mensagem: string;
  proximo: string;
};

type NoFim = {
  tipo: "fim";
  id: string;
  mensagem: string;
};

export type NoConversa =
  | NoMenu
  | NoEscolhaUnica
  | NoPerguntaAberta
  | NoInformativo
  | NoFim;

export const NO_INICIAL = "nome";

export const FLUXO_CONVERSA: Record<string, NoConversa> = {
  nome: {
    tipo: "pergunta_aberta",
    id: "nome",
    pergunta: "Olá! Eu sou o Assistente da BMN. Antes de começarmos, qual é o seu nome?",
    campo: "nome",
    proximo: "menu-principal",
  },

  "menu-principal": {
    tipo: "menu",
    id: "menu-principal",
    pergunta: "Como posso te ajudar hoje?",
    opcoes: [
      { texto: "Quero abrir uma empresa", proximo: "abrir-empresa-1" },
      { texto: "Quero trocar de contabilidade", proximo: "troca-contabilidade-1" },
      { texto: "Quais serviços vocês oferecem para o meu negócio?", proximo: "servicos-oferecidos" },
    ],
  },

  // ── Ramo: abrir empresa ──────────────────────────────────────────────
  "abrir-empresa-1": {
    tipo: "pergunta_aberta",
    id: "abrir-empresa-1",
    pergunta: "Qual produto ou serviço a empresa oferecerá?",
    campo: "produtoServico",
    proximo: "abrir-empresa-2",
  },
  "abrir-empresa-2": {
    tipo: "pergunta_aberta",
    id: "abrir-empresa-2",
    pergunta: "Como funcionará o negócio na prática?",
    campo: "funcionamentoNegocio",
    proximo: "abrir-empresa-3",
  },
  "abrir-empresa-3": {
    tipo: "pergunta_aberta",
    id: "abrir-empresa-3",
    pergunta: "Quem são os clientes-alvo?",
    campo: "clientesAlvo",
    proximo: "abrir-empresa-4",
  },
  "abrir-empresa-4": {
    tipo: "escolha_unica",
    id: "abrir-empresa-4",
    pergunta: "A atividade será realizada presencialmente, on-line ou nos dois formatos?",
    campo: "formatoAtividade",
    opcoes: ["Presencialmente", "On-line", "Nos dois formatos"],
    proximo: "abrir-empresa-5",
  },
  "abrir-empresa-5": {
    tipo: "pergunta_aberta",
    id: "abrir-empresa-5",
    pergunta: "Me informe seu telefone para que nossos especialistas entrem em contato.",
    campo: "telefone",
    proximo: "abrir-empresa-fim",
  },
  "abrir-empresa-fim": {
    tipo: "fim",
    id: "abrir-empresa-fim",
    mensagem:
      "Perfeito! Recebemos suas informações e em breve um especialista da BMN vai entrar em contato para te ajudar a abrir sua empresa.",
  },

  // ── Ramo: trocar de contabilidade ────────────────────────────────────
  // 2. Dados da empresa
  "troca-contabilidade-1": {
    tipo: "pergunta_aberta",
    id: "troca-contabilidade-1",
    pergunta: "Nome da empresa e CNPJ",
    campo: "razaoSocialCnpj",
    proximo: "troca-contabilidade-2",
  },
  "troca-contabilidade-2": {
    tipo: "pergunta_aberta",
    id: "troca-contabilidade-2",
    pergunta: "Qual é a atividade principal da empresa?",
    campo: "atividadePrincipal",
    proximo: "troca-contabilidade-3",
  },
  "troca-contabilidade-3": {
    tipo: "escolha_unica",
    id: "troca-contabilidade-3",
    pergunta: "Qual é o faturamento médio mensal?",
    campo: "faturamentoMedio",
    opcoes: [
      "Até R$ 10 mil",
      "De R$ 10 mil a R$ 50 mil",
      "Acima de R$ 50 mil",
      "Prefiro informar depois",
    ],
    proximo: "troca-contabilidade-4",
  },

  // 3. Motivo da troca
  "troca-contabilidade-4": {
    tipo: "escolha_unica",
    id: "troca-contabilidade-4",
    pergunta: "Por que você deseja trocar de contabilidade?",
    campo: "motivoTroca",
    opcoes: [
      "Falta de atendimento",
      "Demora nas respostas",
      "Erros ou atrasos",
      "Honorários elevados",
      "Falta de orientação",
      "Outro",
    ],
    proximo: "troca-contabilidade-5",
  },
  "troca-contabilidade-5": {
    tipo: "pergunta_aberta",
    id: "troca-contabilidade-5",
    pergunta: "O que você espera da nova contabilidade?",
    campo: "expectativaNovaContabilidade",
    proximo: "troca-contabilidade-6",
  },
  "troca-contabilidade-6": {
    tipo: "escolha_unica",
    id: "troca-contabilidade-6",
    pergunta: "Quando pretende realizar a troca?",
    campo: "prazoTroca",
    opcoes: [
      "Imediatamente",
      "Nos próximos 30 dias",
      "Nos próximos 60 dias",
      "Ainda estou pesquisando",
    ],
    proximo: "troca-contabilidade-7",
  },
  "troca-contabilidade-7": {
    tipo: "pergunta_aberta",
    id: "troca-contabilidade-7",
    pergunta: "Me informe seu telefone para que nossos especialistas entrem em contato.",
    campo: "telefone",
    proximo: "troca-contabilidade-fim",
  },
  "troca-contabilidade-fim": {
    tipo: "fim",
    id: "troca-contabilidade-fim",
    mensagem:
      "Perfeito! Recebemos suas informações e em breve um especialista da BMN vai entrar em contato para te ajudar na troca de contabilidade.",
  },

  // ── Ramo ainda simples (resposta única) — a detalhar depois ─────────
  "servicos-oferecidos": {
    tipo: "informativo",
    id: "servicos-oferecidos",
    mensagem:
      "Oferecemos planejamento para reforma tributária, contabilidade consultiva, bpo financeiro , bpo fiscal , folha de pagamento , regularização , gestão financeira  e controladoria",
    proximo: "menu-principal",
  },
};
