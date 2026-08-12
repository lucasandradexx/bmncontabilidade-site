// src/lib/servicos.ts

export type IconeServico =
  | "consultoria"
  | "tributario"
  | "documentos"
  | "fiscal"
  | "financeiro"
  | "gestao"
  | "folha"
  | "esocial"
  | "abertura"
  | "regularizacao"
  | "irpf"
  | "certificado";

export type EtapaServico = {
  titulo: string;
  descricao: string;
};

export type PlanoServico = {
  nome: "Basic" | "Platinum" | "Diamond" | string;
  descricao: string;
  preco?: string;
  recursos: string[];
  destaque?: boolean;
  ctaTexto?: string;
  ctaHref?: string;
};

export type FAQItem = {
  pergunta: string;
  resposta: string;
};

export type CTA = {
  titulo: string;
  descricao: string;
  botaoTexto: string;
  botaoHref: string;
  externo?: boolean;
};

export type Seo = {
  title: string;
  description: string;
};

export type Servico = {
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  icone: IconeServico;
  imagem: string;
  destaque?: string;
  seo: Seo;
  beneficios: string[];
  entregaveis: string[];
  paraQuem: string[];
  etapas: EtapaServico[];
  faq: FAQItem[];
  cta: CTA;
  relacionados: string[];
  mostrarFormulario?: boolean;
  planos?: PlanoServico[];
};

const WA_MESSAGE = encodeURIComponent(
  "Olá! Quero saber mais sobre os serviços da BMN."
);

const CTA_PADRAO: CTA = {
  titulo: "Vamos estruturar esse serviço no seu negócio?",
  descricao:
    "Fale com nossa equipe e receba um plano de atendimento conforme a sua realidade.",
  botaoTexto: "Falar com especialista",
  botaoHref: `https://wa.me/558194725310?text=${WA_MESSAGE}`,
  externo: true,
};

export const SERVICOS: Servico[] = [
  {
    slug: "contabilidade-consultiva",
    titulo: "Contabilidade Consultiva",
    resumo: "Informações contábeis transformadas em decisão estratégica.",
    descricao:
      "A contabilidade consultiva vai além de cumprir obrigações. Ela organiza dados, traduz indicadores e orienta decisões para crescimento com segurança.",
    icone: "consultoria",
    imagem: "/servicos/contabilidade-consultiva.jpg",
    destaque: "Decisão baseada em números reais.",
    seo: {
      title: "Contabilidade Consultiva | BMN Contabilidade",
      description:
        "Apoio contábil estratégico com indicadores, análise de desempenho e plano de ação para sua empresa crescer com segurança.",
    },
    beneficios: [
      "Maior previsibilidade financeira",
      "Decisões com base em indicadores",
      "Redução de riscos na gestão",
    ],
    entregaveis: [
      "Relatórios gerenciais periódicos",
      "Análise de resultados e margens",
      "Reuniões de alinhamento com recomendações",
    ],
    paraQuem: [
      "Empresas em crescimento",
      "Empresários que precisam de visão estratégica",
      "Negócios que querem profissionalizar a gestão",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento da situação atual da empresa." },
      { titulo: "Estruturação", descricao: "Definição de indicadores e rotina de acompanhamento." },
      { titulo: "Acompanhamento", descricao: "Reuniões periódicas com plano de ação." },
    ],
    faq: [
      {
        pergunta: "Qual a diferença para a contabilidade tradicional?",
        resposta:
          "A tradicional foca no cumprimento fiscal e legal. A consultiva adiciona análise gerencial e suporte à decisão.",
      },
      {
        pergunta: "Com que frequência são feitos os acompanhamentos?",
        resposta: "Normalmente mensal, podendo ser quinzenal conforme a necessidade da empresa.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["gestao-financeira", "planejamento-tributario", "bpo-financeiro"],
  },

  {
    slug: "planejamento-tributario",
    titulo: "Planejamento Tributário",
    resumo: "Estratégia fiscal para pagar tributos de forma correta e inteligente.",
    descricao:
      "Analisamos o regime tributário, operação e estrutura da empresa para reduzir carga fiscal dentro da lei e evitar passivos.",
    icone: "tributario",
    imagem: "/servicos/planejamento-tributario.jpg",
    destaque: "Eficiência tributária com segurança jurídica.",
    seo: {
      title: "Planejamento Tributário | BMN Contabilidade",
      description:
        "Reduza carga tributária com segurança e conformidade legal por meio de estudo de regime e revisão fiscal.",
    },
    beneficios: [
      "Redução legal de tributos",
      "Prevenção de passivos fiscais",
      "Escolha correta de regime tributário",
    ],
    entregaveis: [
      "Estudo comparativo de regimes",
      "Mapa de oportunidades tributárias",
      "Plano de enquadramento e revisão",
    ],
    paraQuem: [
      "Empresas de comércio, serviços e indústria",
      "Empresas em expansão",
      "Negócios com alta carga tributária",
    ],
    etapas: [
      { titulo: "Levantamento", descricao: "Coleta de dados fiscais e operacionais." },
      { titulo: "Simulação", descricao: "Comparação técnica de cenários tributários." },
      { titulo: "Implementação", descricao: "Aplicação e monitoramento do novo modelo." },
    ],
    faq: [
      {
        pergunta: "Planejamento tributário é legal?",
        resposta:
          "Sim. Desde que feito com base na legislação e com documentação adequada, é plenamente legal.",
      },
      {
        pergunta: "Posso trocar de regime a qualquer momento?",
        resposta:
          "Depende do regime atual e das regras de opção. Em geral, a mudança é anual, com exceções específicas.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["obrigacoes-acessorias", "bpo-fiscal", "contabilidade-consultiva"],
  },

  {
    slug: "obrigacoes-acessorias",
    titulo: "Obrigações Acessórias",
    resumo: "Envio correto e no prazo de todas as declarações obrigatórias.",
    descricao:
      "Executamos e monitoramos suas obrigações acessórias para evitar multas, inconsistências e riscos fiscais.",
    icone: "documentos",
    imagem: "/servicos/obrigacoes-acessorias.jpg",
    seo: {
      title: "Obrigações Acessórias | BMN Contabilidade",
      description:
        "Gestão completa de declarações e obrigações acessórias com conformidade e controle de prazos.",
    },
    beneficios: ["Conformidade fiscal", "Menos risco de autuações", "Controle de prazos e protocolos"],
    entregaveis: [
      "Envio das declarações obrigatórias",
      "Conferência de consistência",
      "Relatório de competências entregues",
    ],
    paraQuem: [
      "Empresas obrigadas a declarações fiscais e contábeis",
      "Negócios que tiveram notificações",
      "Empresas sem rotina interna de controle",
    ],
    etapas: [
      { titulo: "Mapeamento", descricao: "Identificação de todas as obrigações por regime e atividade." },
      { titulo: "Execução", descricao: "Processamento e envio de cada obrigação dentro do prazo." },
      { titulo: "Controle", descricao: "Acompanhamento de recibos, pendências e retificações." },
    ],
    faq: [
      {
        pergunta: "Quais obrigações estão incluídas?",
        resposta: "Variam conforme regime e atividade. Definimos isso no diagnóstico inicial.",
      },
      {
        pergunta: "Vocês fazem retificação se necessário?",
        resposta: "Sim, analisamos impacto e realizamos a correção técnica quando aplicável.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["bpo-fiscal", "planejamento-tributario", "regularizacao"],
  },

  {
    slug: "bpo-fiscal",
    titulo: "BPO Fiscal",
    resumo: "Terceirização inteligente das rotinas fiscais da empresa.",
    descricao:
      "Assumimos a operação fiscal com processo estruturado, controle e conformidade, liberando seu time para foco no core do negócio.",
    icone: "fiscal",
    imagem: "/servicos/bpo-fiscal.jpg",
    seo: {
      title: "BPO Fiscal | BMN Contabilidade",
      description:
        "Terceirização fiscal com processos, compliance, apuração e controle para sua empresa operar com segurança.",
    },
    beneficios: [
      "Padronização de processos fiscais",
      "Menor custo operacional interno",
      "Acompanhamento técnico especializado",
    ],
    entregaveis: ["Apuração de tributos", "Escrituração fiscal", "Conciliação e relatórios fiscais"],
    paraQuem: [
      "Empresas com volume fiscal alto",
      "Negócios sem time fiscal interno",
      "Empresas que buscam escala com controle",
    ],
    etapas: [
      { titulo: "Transição", descricao: "Integração de documentos, sistemas e regras fiscais." },
      { titulo: "Operação", descricao: "Execução recorrente de apurações e obrigações." },
      { titulo: "Governança", descricao: "Indicadores, conferências e melhoria contínua." },
    ],
    faq: [
      {
        pergunta: "Preciso trocar de sistema?",
        resposta: "Nem sempre. Avaliamos integração com o sistema atual antes de qualquer mudança.",
      },
      {
        pergunta: "Como funciona a troca de documentos?",
        resposta: "Pode ser via integração, nuvem compartilhada ou rotina definida com sua equipe.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["obrigacoes-acessorias", "planejamento-tributario", "regularizacao"],
  },

  {
    slug: "bpo-financeiro",
    titulo: "BPO Financeiro",
    resumo: "Gestão financeira terceirizada com rotina, previsibilidade e controle.",
    descricao:
      "Cuidamos do operacional financeiro (contas a pagar/receber, conciliação, fluxo de caixa e relatórios) para melhorar sua gestão.",
    icone: "financeiro",
    imagem: "/servicos/bpo-financeiro.jpg",
    seo: {
      title: "BPO Financeiro | BMN Contabilidade",
      description:
        "Terceirização financeira com controle de caixa, conciliações, contas e relatórios gerenciais.",
    },
    beneficios: ["Organização do financeiro", "Maior previsibilidade de caixa", "Apoio para tomada de decisão"],
    entregaveis: [
      "Rotina de contas a pagar e receber",
      "Conciliação bancária",
      "Relatório de fluxo de caixa",
    ],
    paraQuem: [
      "Empresas com desorganização financeira",
      "Negócios em expansão",
      "Empreendedores sem equipe financeira estruturada",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Mapeamento da rotina e gargalos financeiros." },
      { titulo: "Implementação", descricao: "Estruturação de processos e calendário financeiro." },
      { titulo: "Rotina", descricao: "Execução diária e fechamento gerencial periódico." },
    ],
    faq: [
      {
        pergunta: "BPO financeiro substitui a contabilidade?",
        resposta: "Não. Ele complementa, focando no operacional e gestão financeira do dia a dia.",
      },
      {
        pergunta: "Vocês fazem cobrança de clientes?",
        resposta: "Podemos estruturar régua de cobrança conforme escopo contratado.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["gestao-financeira", "contabilidade-consultiva", "folha-de-pagamento"],
    planos: [
      {
        nome: "Plano BNM Essencial",
        descricao: "Para microempresas e profissionais liberais que precisam organizar a casa.",
        preco: "A partir de R$ 300,00 / mês",
        recursos: [
          "1 conta bancária parceira (Banco Cora)",
          "Até 50 transações financeiras mensais",
          "Emissão de até 16 Notas Fiscais/mês",
          "Conciliação bancária mensal",
          "Organização digital de documentos",
          "Relatório mensal do Fluxo de Caixa",
        ],
        ctaTexto: "Quero o Plano Essencial",
        ctaHref: `https://wa.me/558194725310?text=${encodeURIComponent("Olá! Tenho interesse no plano BNM Essencial de BPO Financeiro.")}`,
      },
      {
        nome: "Plano BNM Performance",
        descricao: "Para pequenas empresas em crescimento que precisam de agilidade e dados gerenciais.",
        preco: "A partir de R$ 497,00 / mês",
        destaque: true,
        recursos: [
          "Gestão de até 2 contas bancárias",
          "Até 200 transações financeiras mensais",
          "Emissão de Notas Fiscais e Boletos (até 30/mês)",
          "Conciliação bancária diária",
          "Agendamento de pagamentos no banco",
          "Apresentação mensal do Fluxo de Caixa e DRE",
        ],
        ctaTexto: "Quero o Plano Performance",
        ctaHref: `https://wa.me/558194725310?text=${encodeURIComponent("Olá! Tenho interesse no plano BNM Performance de BPO Financeiro.")}`,
      },
      {
        nome: "Plano BNM Estratégico",
        descricao: "Para médias empresas e startups que exigem gestão robusta e inteligência de dados.",
        preco: "A partir de R$ 850,00 / mês",
        recursos: [
          "Múltiplas contas e integração com seu ERP",
          "Volume de transações e notas sob medida",
          "Gestão ativa de inadimplência (cobrança)",
          "Dashboards financeiros em tempo real (BI)",
          "Projeção de Fluxo de Caixa (3 a 6 meses)",
          "Reunião mensal de consultoria estratégica",
        ],
        ctaTexto: "Quero o Plano Estratégico",
        ctaHref: `https://wa.me/558194725310?text=${encodeURIComponent("Olá! Tenho interesse no plano BNM Estratégico de BPO Financeiro.")}`,
      },
    ],

  },

  {
    slug: "gestao-financeira",
    titulo: "Gestão Financeira",
    resumo: "Planejamento e controle financeiro para sustentação do crescimento.",
    descricao:
      "Aprimoramos indicadores, metas e rotinas para que a empresa tenha saúde financeira e base sólida para crescer.",
    icone: "gestao",
    imagem: "/servicos/gestao-financeira.jpg",
    seo: {
      title: "Gestão Financeira | BMN Contabilidade",
      description:
        "Estruturação da gestão financeira com indicadores, metas e acompanhamento para decisões mais seguras.",
    },
    beneficios: ["Melhor margem de lucro", "Controle de custos", "Planejamento de curto e médio prazo"],
    entregaveis: ["Painel de indicadores financeiros", "Orçamento empresarial", "Plano de ação financeiro"],
    paraQuem: ["Empresas com baixa margem", "Negócios em reestruturação", "Empresas com crescimento desordenado"],
    etapas: [
      { titulo: "Análise", descricao: "Leitura de resultados, custos e estrutura financeira." },
      { titulo: "Planejamento", descricao: "Definição de metas, indicadores e prioridades." },
      { titulo: "Acompanhamento", descricao: "Monitoramento contínuo com revisão de estratégia." },
    ],
    faq: [
      {
        pergunta: "É diferente de BPO financeiro?",
        resposta: "Sim. O BPO executa a rotina; a gestão financeira atua no nível estratégico e gerencial.",
      },
      {
        pergunta: "Quanto tempo para enxergar resultados?",
        resposta: "Normalmente entre 60 e 120 dias, dependendo da maturidade do negócio.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["bpo-financeiro", "contabilidade-consultiva", "planejamento-tributario"],
  },

  {
    slug: "folha-de-pagamento",
    titulo: "Folha de Pagamento",
    resumo: "Processamento de folha com conformidade trabalhista e segurança.",
    descricao:
      "Processamos admissões, férias, rescisões e folha mensal com precisão, reduzindo risco trabalhista e operacional.",
    icone: "folha",
    imagem: "/servicos/folha-de-pagamento.jpg",
    seo: {
      title: "Folha de Pagamento | BMN Contabilidade",
      description:
        "Gestão de folha, encargos e eventos trabalhistas com segurança e cumprimento legal.",
    },
    beneficios: ["Conformidade trabalhista", "Redução de erros em cálculos", "Cumprimento de prazos legais"],
    entregaveis: ["Folha mensal processada", "Guias e encargos", "Rotinas de admissão/demissão/férias"],
    paraQuem: [
      "Empresas com colaboradores CLT",
      "Empresas sem departamento pessoal interno",
      "Negócios em crescimento de equipe",
    ],
    etapas: [
      { titulo: "Cadastro", descricao: "Organização de dados de colaboradores e regras internas." },
      { titulo: "Processamento", descricao: "Cálculo mensal de folha e eventos trabalhistas." },
      { titulo: "Fechamento", descricao: "Geração de guias, conferência e suporte de dúvidas." },
    ],
    faq: [
      {
        pergunta: "Vocês cuidam de admissões e rescisões?",
        resposta: "Sim, conforme escopo contratado e documentação entregue pela empresa.",
      },
      {
        pergunta: "Atendem eSocial junto da folha?",
        resposta: "Sim, folha e eSocial são tratados de forma integrada.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["e-social-domestico", "bpo-financeiro", "obrigacoes-acessorias"],
  },

  {
    slug: "e-social-domestico",
    titulo: "eSocial Doméstico",
    resumo: "Regularização e gestão das obrigações do empregador doméstico.",
    descricao:
      "Cuidamos de toda a rotina do eSocial doméstico, com cálculos corretos, guias e suporte para evitar problemas legais.",
    icone: "esocial",
    imagem: "/servicos/e-social-domestico.jpg",
    seo: {
      title: "eSocial Doméstico | BMN Contabilidade",
      description:
        "Suporte completo para empregador doméstico: cadastro, folha, guias e obrigações no eSocial.",
    },
    beneficios: ["Regularidade no eSocial", "Cálculos corretos", "Tranquilidade para o empregador"],
    entregaveis: ["Cadastro e parametrização", "Folha doméstica", "Geração de DAE e orientações"],
    paraQuem: [
      "Empregadores domésticos",
      "Famílias que desejam regularizar vínculo",
      "Quem já possui vínculo e quer apoio contínuo",
    ],
    etapas: [
      { titulo: "Configuração", descricao: "Cadastro de empregador e empregado no sistema." },
      { titulo: "Rotina", descricao: "Fechamento mensal com cálculo e guias." },
      { titulo: "Eventos", descricao: "Gestão de férias, afastamentos e desligamentos." },
    ],
    faq: [
      {
        pergunta: "Posso regularizar atrasados?",
        resposta: "Sim, avaliamos o período e orientamos a regularização correta.",
      },
      {
        pergunta: "Vocês dão suporte mensal?",
        resposta: "Sim, com rotina contínua conforme plano contratado.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["folha-de-pagamento", "regularizacao", "imposto-de-renda"],
  },

  {
    slug: "abertura-de-empresas",
    titulo: "Abertura de Empresas",
    resumo: "Constituição de empresa com enquadramento correto desde o início.",
    descricao:
      "Cuidamos de todo o processo de abertura, definição de natureza jurídica, CNAEs e regime tributário para começar certo.",
    icone: "abertura",
    imagem: "/servicos/abertura-de-empresas.jpg",
    seo: {
      title: "Abertura de Empresas | BMN Contabilidade",
      description:
        "Abra sua empresa com segurança jurídica e tributária, com orientação completa em todas as etapas.",
    },
    beneficios: ["Abertura sem burocracia", "Enquadramento tributário adequado", "Início com conformidade"],
    entregaveis: ["Viabilidade e registro", "CNPJ e inscrições", "Orientação inicial de operação fiscal e contábil"],
    paraQuem: ["Empreendedores iniciantes", "Profissionais liberais", "Empresas migrando de MEI para outro porte"],
    etapas: [
      { titulo: "Planejamento", descricao: "Definição de atividade, porte e enquadramento." },
      { titulo: "Registro", descricao: "Protocolos e formalização nos órgãos competentes." },
      { titulo: "Implantação", descricao: "Parametrização inicial para operação regular." },
    ],
    faq: [
      {
        pergunta: "Quanto tempo leva para abrir empresa?",
        resposta: "Depende da cidade e atividade, mas em média de alguns dias a poucas semanas.",
      },
      {
        pergunta: "Vocês ajudam na escolha do regime?",
        resposta: "Sim, essa é uma etapa essencial para evitar custos desnecessários.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["planejamento-tributario", "contabilidade-consultiva", "regularizacao"],
  },

  {
    slug: "regularizacao",
    titulo: "Regularização",
    resumo: "Coloque sua empresa em dia com o fisco e órgãos reguladores.",
    descricao:
      "Atuamos na regularização de pendências fiscais, cadastrais e contábeis, com plano técnico para retomada da conformidade.",
    icone: "regularizacao",
    imagem: "/servicos/regularizacao.jpg",
    seo: {
      title: "Regularização Empresarial | BMN Contabilidade",
      description:
        "Regularize pendências fiscais e cadastrais com suporte técnico e plano de recuperação de conformidade.",
    },
    beneficios: ["Redução de riscos de multas", "Recuperação da conformidade", "Retomada segura das operações"],
    entregaveis: ["Diagnóstico de pendências", "Plano de regularização", "Acompanhamento até normalização"],
    paraQuem: ["Empresas com pendências fiscais", "Negócios com CNPJ inapto/irregular", "Empresas com histórico de atraso"],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Mapeamento completo de débitos e pendências." },
      { titulo: "Execução", descricao: "Correção de obrigações e protocolos necessários." },
      { titulo: "Monitoramento", descricao: "Acompanhamento até a completa regularização." },
    ],
    faq: [
      {
        pergunta: "Empresa inapta pode voltar a operar?",
        resposta: "Sim, em muitos casos é possível reativar após regularização adequada.",
      },
      {
        pergunta: "Vocês parcelam débitos?",
        resposta: "Orientamos e executamos o parcelamento quando houver viabilidade.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["obrigacoes-acessorias", "bpo-fiscal", "abertura-de-empresas"],
  },

  {
    slug: "imposto-de-renda",
    titulo: "Imposto de Renda",
    resumo: "Declaração e planejamento do IR para pessoa física e empresarial.",
    descricao:
      "Realizamos declaração, revisão e planejamento do IR para reduzir riscos de malha fina e otimizar sua situação tributária.",
    icone: "irpf",
    imagem: "/servicos/imposto-de-renda.jpg",
    seo: {
      title: "Imposto de Renda | BMN Contabilidade",
      description:
        "Declaração de IR com segurança, revisão de dados e planejamento para evitar inconsistências.",
    },
    beneficios: ["Declaração correta e segura", "Menos risco de inconsistência", "Acompanhamento de pendências"],
    entregaveis: ["Preenchimento e envio da declaração", "Conferência documental", "Suporte pós-envio"],
    paraQuem: ["Pessoa física", "Sócios e administradores", "Profissionais com múltiplas fontes de renda"],
    etapas: [
      { titulo: "Coleta", descricao: "Recebimento e organização dos documentos necessários." },
      { titulo: "Apuração", descricao: "Análise, preenchimento e conferência técnica." },
      { titulo: "Envio", descricao: "Transmissão, recibo e orientações de acompanhamento." },
    ],
    faq: [
      {
        pergunta: "Vocês retificam declaração já enviada?",
        resposta: "Sim, avaliamos o caso e fazemos a retificação quando necessário.",
      },
      {
        pergunta: "Atendem IR de pessoa jurídica?",
        resposta: "Sim, conforme regime e tipo de obrigação da empresa.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["contabilidade-consultiva", "planejamento-tributario", "e-social-domestico"],
  },

  {
    slug: "certificado-digital",
    titulo: "Certificado Digital",
    resumo: "Emissão e renovação de certificado para pessoa física e jurídica.",
    descricao:
      "Apoiamos na escolha, emissão e renovação de certificado digital para garantir assinatura eletrônica e acesso aos sistemas oficiais.",
    icone: "certificado",
    imagem: "/servicos/certificado-digital.jpg",
    seo: {
      title: "Certificado Digital | BMN Contabilidade",
      description:
        "Emissão e renovação de certificado digital com orientação técnica para uso em operações fiscais e contábeis.",
    },
    beneficios: [
      "Segurança nas assinaturas digitais",
      "Agilidade em processos eletrônicos",
      "Conformidade com exigências legais",
    ],
    entregaveis: [
      "Orientação de tipo de certificado",
      "Suporte na emissão/renovação",
      "Apoio para instalação e uso",
    ],
    paraQuem: [
      "Empresas e sócios",
      "Profissionais liberais",
      "Pessoas físicas com demandas de assinatura digital",
    ],
    etapas: [
      { titulo: "Escolha", descricao: "Definição do certificado ideal para o seu uso." },
      { titulo: "Emissão", descricao: "Conferência de documentos e processo de validação." },
      { titulo: "Ativação", descricao: "Suporte para instalação e testes iniciais." },
    ],
    faq: [
      {
        pergunta: "Qual validade do certificado?",
        resposta: "Depende do tipo contratado. Existem opções com diferentes prazos de validade.",
      },
      {
        pergunta: "Vocês ajudam na renovação?",
        resposta: "Sim, fazemos todo o acompanhamento para renovação no prazo correto.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["obrigacoes-acessorias", "folha-de-pagamento", "bpo-fiscal"],
  },
  {
    slug: "emissao-de-notas",
    titulo: "Emissão de Notas",
    resumo: "Emissão correta de NF-e e NFS-e com segurança fiscal e conformidade.",
    descricao:
      "Executamos e monitoramos a emissão de notas fiscais eletrônicas (NF-e e NFS-e), com validação de dados, regras tributárias e acompanhamento de rejeições para reduzir riscos fiscais e operacionais.",
    icone: "fiscal",
    imagem: "/servicos/emissao-de-notas.jpg",
    destaque: "Notas emitidas com precisão e menos risco de autuação.",
    seo: {
      title: "Emissão de Notas | BMN Contabilidade",
      description:
        "Serviço de emissão de notas fiscais (NF-e e NFS-e) com validação tributária, controle de rejeições e conformidade fiscal.",
    },
    beneficios: [
      "Redução de erros na emissão",
      "Menos rejeições e retrabalho",
      "Conformidade fiscal nas operações",
      "Maior controle documental",
    ],
    entregaveis: [
      "Emissão de NF-e e NFS-e conforme rotina definida",
      "Validação cadastral e tributária antes do envio",
      "Acompanhamento de rejeições e correções",
      "Relatório periódico de emissões e pendências",
    ],
    paraQuem: [
      "Empresas com alto volume de faturamento",
      "Negócios com erros recorrentes em notas fiscais",
      "Empresas sem rotina fiscal estruturada",
    ],
    etapas: [
      {
        titulo: "Diagnóstico",
        descricao:
          "Mapeamento de operação, tipo de nota, regras de tributação e fluxo de faturamento.",
      },
      {
        titulo: "Parametrização",
        descricao:
          "Ajuste de cadastro de clientes/serviços/produtos e regras fiscais de emissão.",
      },
      {
        titulo: "Operação e controle",
        descricao:
          "Emissão recorrente, tratamento de rejeições e monitoramento de conformidade.",
      },
    ],
    faq: [
      {
        pergunta: "Vocês emitem NF-e e NFS-e?",
        resposta:
          "Sim. Atendemos emissão conforme o tipo de operação e regras fiscais aplicáveis.",
      },
      {
        pergunta: "E quando a nota é rejeitada?",
        resposta:
          "Fazemos a análise da rejeição, corrigimos a inconsistência e realizamos nova transmissão.",
      },
      {
        pergunta: "Esse serviço substitui o BPO Fiscal?",
        resposta:
          "Não necessariamente. A emissão de notas pode ser contratada isoladamente ou integrada ao BPO Fiscal.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["bpo-fiscal", "obrigacoes-acessorias", "planejamento-tributario"],
  },
];


// Slugs que mostram formulário
export const SLUGS_COM_FORM = new Set<string>([
  "contabilidade-consultiva",
  "planejamento-tributario",
  "bpo-financeiro",
  "bpo-fiscal", // BPO Fiscal - Emissão de Notas
  "gestao-financeira",
  "folha-de-pagamento",
  "e-social-domestico",
  "abertura-de-empresas",
  "regularizacao", // Regularização de Empresas
  "imposto-de-renda",
  "emissao-de-notas",
]);

// Função centralizada para decidir se exibe form
export function deveMostrarFormulario(servico: Servico): boolean {
  // Se o item tiver mostrarFormulario definido manualmente, ele manda.
  if (typeof servico.mostrarFormulario === "boolean") {
    return servico.mostrarFormulario;
  }

  // Senão, usa a regra por slug
  return SLUGS_COM_FORM.has(servico.slug);
}

export function getServicoBySlug(slug: string): Servico | undefined {
  const normalized = slug.trim().toLowerCase();
  return SERVICOS.find((s) => s.slug === normalized);
}

export function getServicosRelacionados(slugs: string[]): Servico[] {
  return SERVICOS.filter((s) => slugs.includes(s.slug));
}