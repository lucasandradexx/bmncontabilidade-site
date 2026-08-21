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
    resumo: "Elisão fiscal para reduzir a carga tributária dentro da lei, com segurança jurídica.",
    descricao:
      "Planejamento Tributário é o estudo técnico da operação da empresa para identificar, dentro da legalidade, o regime e as estratégias fiscais mais vantajosas, reduzindo a carga tributária sem correr riscos com o Fisco.\n\nNão é sonegação. É elisão fiscal: o uso de mecanismos previstos em lei para pagar exatamente o que é devido, e não mais do que isso. Muitas empresas pagam mais impostos do que deveriam simplesmente por estarem no regime tributário errado ou por não aproveitarem benefícios fiscais aos quais têm direito.\n\nO trabalho passa por simular cenários, comparar regimes e entender como cada decisão da empresa, contratação, faturamento, estrutura societária, impacta a carga tributária no curto e no longo prazo.",
    icone: "tributario",
    imagem: "/servicos/planejamento-tributario.jpg",
    destaque: "Eficiência tributária com segurança jurídica.",
    seo: {
      title: "Planejamento Tributário | BMN Contabilidade",
      description:
        "Reduza a carga tributária dentro da lei com estudo de regime, simulação de cenários e identificação de benefícios fiscais.",
    },
    beneficios: [
      "Redução legal da carga tributária",
      "Escolha do regime tributário mais adequado",
      "Mais previsibilidade sobre custos fiscais",
      "Identificação de benefícios fiscais aplicáveis",
      "Segurança jurídica",
      "Suporte para decisões estruturais",
    ],
    entregaveis: [
      "Análise da operação, faturamento e regime tributário atual",
      "Simulação de cenários e definição da estratégia mais vantajosa",
      "Revisão periódica do planejamento conforme mudanças no negócio ou na legislação",
    ],
    paraQuem: [
      "Empresas que querem reduzir custos tributários dentro da lei",
      "Negócios em fase de expansão ou mudança de atividade",
      "Empresas avaliando mudança de regime tributário",
      "Empresários que buscam segurança nas decisões fiscais",
      "Negócios que nunca revisaram formalmente sua carga tributária",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Análise da operação, do faturamento e do regime tributário atual da empresa, identificando pontos de atenção e oportunidades." },
      { titulo: "Estruturação", descricao: "Simulação de cenários tributários e definição da estratégia mais vantajosa para o perfil e os planos da empresa." },
      { titulo: "Acompanhamento", descricao: "Revisão periódica do planejamento, sempre que houver mudança relevante no negócio ou na legislação." },
    ],
    faq: [
      {
        pergunta: "Planejamento tributário é o mesmo que sonegação?",
        resposta:
          "Não. É elisão fiscal: reduzir tributos por meios lícitos e previstos em lei. Sonegação é omitir ou fraudar informações, algo que a BMN nunca recomenda ou pratica.",
      },
      {
        pergunta: "Com que frequência o planejamento deve ser revisado?",
        resposta:
          "Idealmente ao menos uma vez por ano, ou sempre que houver mudança relevante no faturamento, na atividade ou na legislação tributária.",
      },
      {
        pergunta: "Vale a pena para empresas pequenas?",
        resposta:
          "Sim. Muitas vezes é justamente nas empresas menores que a escolha errada de regime tributário pesa proporcionalmente mais no caixa.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["bpo-fiscal", "contabilidade-consultiva", "obrigacoes-acessorias"],
  },

  {
    slug: "obrigacoes-acessorias",
    titulo: "Obrigações Acessórias",
    resumo: "Declarações e informações enviadas corretamente e no prazo, sem depender da memória de ninguém.",
    descricao:
      "Obrigações Acessórias são todas as declarações, informações e documentos que a empresa precisa enviar periodicamente aos órgãos fiscais, mesmo quando não há imposto a pagar naquele momento. É o \"dever de informar\" que acompanha o \"dever de pagar\".\n\nO calendário fiscal brasileiro é extenso (PGDAS, DCTF, EFD-Contribuições, SPED Fiscal, SPED Contábil, DEFIS, entre outras) e um único envio em atraso ou com erro pode gerar multa, mesmo que a empresa esteja em dia com todos os seus impostos.\n\nGarantimos que cada obrigação aplicável ao seu negócio seja identificada, calculada e enviada corretamente, dentro do calendário fiscal.",
    icone: "documentos",
    imagem: "/servicos/obrigacoes-acessorias.jpg",
    seo: {
      title: "Obrigações Acessórias | BMN Contabilidade",
      description:
        "Gestão completa das declarações fiscais obrigatórias (PGDAS, DCTF, SPED, DEFIS e outras) com controle ativo de prazos.",
    },
    beneficios: [
      "Cumprimento de prazos sem falhas",
      "Redução do risco de multas",
      "Visão completa das obrigações da empresa",
      "Tranquilidade para focar no negócio",
      "Consistência entre as declarações",
    ],
    entregaveis: [
      "Levantamento de todas as obrigações aplicáveis conforme regime, atividade e porte",
      "Calendário fiscal completo com processos internos de apuração",
      "Envio periódico das declarações com conferência antes da transmissão",
    ],
    paraQuem: [
      "Empresas de qualquer porte e regime tributário",
      "Negócios que já sofreram multas por atraso ou erro em declarações",
      "Empresários que buscam eliminar riscos fiscais silenciosos",
      "Empresas em crescimento, que passam a ter mais obrigações à medida que faturam mais",
      "Negócios que querem previsibilidade tributária no dia a dia",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento de todas as obrigações aplicáveis à empresa, considerando regime tributário, atividade e porte." },
      { titulo: "Estruturação", descricao: "Organização do calendário fiscal completo e dos processos internos de apuração de cada obrigação." },
      { titulo: "Acompanhamento", descricao: "Envio periódico das declarações, com controle ativo de prazos e conferência das informações antes da transmissão." },
    ],
    faq: [
      {
        pergunta: "Quais obrigações estão incluídas?",
        resposta:
          "Depende do regime tributário da empresa, mas normalmente incluem declarações como PGDAS, DCTF, EFD-Contribuições, SPED Fiscal e Contábil, DEFIS, entre outras.",
      },
      {
        pergunta: "O que acontece se uma obrigação atrasar?",
        resposta:
          "Pode gerar multa e, em alguns casos, restrições fiscais para a empresa. Por isso mantemos controle ativo de todos os prazos, sem depender de lembretes manuais.",
      },
      {
        pergunta: "Minha empresa é do Simples Nacional, ainda tenho obrigações acessórias?",
        resposta:
          "Sim. Mesmo empresas do Simples Nacional têm obrigações acessórias específicas, embora normalmente em menor volume que Lucro Presumido ou Real.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["bpo-fiscal", "planejamento-tributario", "regularizacao"],
  },

  {
    slug: "bpo-fiscal",
    titulo: "BPO Fiscal",
    resumo: "Terceirização completa da apuração, emissão e envio das obrigações fiscais, com conformidade garantida.",
    descricao:
      "BPO Fiscal é a terceirização de toda a rotina de apuração, emissão e envio das obrigações fiscais da empresa: cálculo dos impostos devidos, emissão de guias, geração de declarações e cumprimento de cada prazo exigido pelo Fisco federal, estadual e municipal.\n\nA legislação tributária brasileira é complexa e muda com frequência. Um erro de apuração ou um prazo perdido pode gerar multa, inconsistências no CNPJ e até bloquear a emissão de certidões.\n\nDiferente de simplesmente \"enviar a obrigação no prazo\", o BPO Fiscal também identifica inconsistências antes que virem problema, cruzando dados fiscais com a operação real da empresa para reduzir o risco de autuações.",
    icone: "fiscal",
    imagem: "/servicos/bpo-fiscal.jpg",
    seo: {
      title: "BPO Fiscal | BMN Contabilidade",
      description:
        "Terceirização da rotina fiscal com apuração, emissão de guias e conformidade com o Fisco federal, estadual e municipal.",
    },
    beneficios: [
      "Conformidade fiscal garantida",
      "Redução do risco de autuações e multas",
      "Tranquilidade operacional",
      "Adaptação ao regime tributário da empresa",
      "Histórico fiscal organizado",
      "Suporte em caso de notificação",
    ],
    entregaveis: [
      "Diagnóstico do regime tributário e das obrigações aplicáveis",
      "Rotina de apuração e emissão com calendário próprio de prazos",
      "Apuração, emissão e envio mensal das obrigações fiscais",
    ],
    paraQuem: [
      "Empresas com rotina fiscal complexa ou múltiplas obrigações",
      "Negócios que estão migrando ou pretendem migrar de contabilidade",
      "Empresas que já foram autuadas ou notificadas anteriormente",
      "Empresários que buscam segurança e previsibilidade tributária",
      "Negócios em crescimento que precisam de uma rotina fiscal que acompanhe esse ritmo",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Análise do regime tributário, enquadramento e das obrigações fiscais que já se aplicam (ou deveriam se aplicar) à operação." },
      { titulo: "Estruturação", descricao: "Organização da rotina de apuração e emissão de documentos fiscais, com calendário próprio de prazos e checagens." },
      { titulo: "Acompanhamento", descricao: "Execução da apuração, emissão e envio das obrigações fiscais mês a mês, monitorando prazos e mudanças na legislação." },
    ],
    faq: [
      {
        pergunta: "O BPO Fiscal substitui o contador?",
        resposta:
          "Não substitui. É a execução operacional da rotina fiscal, sempre supervisionada pela equipe contábil da BMN, que responde tecnicamente por cada apuração.",
      },
      {
        pergunta: "Serve para qualquer regime tributário?",
        resposta:
          "Sim. O serviço se adapta a Simples Nacional, Lucro Presumido e Lucro Real, cada um com suas particularidades de apuração.",
      },
      {
        pergunta: "O que acontece se a empresa já tiver pendências fiscais?",
        resposta:
          "Fazemos o diagnóstico completo e, se necessário, encaminhamos junto com a Regularização de Empresas antes de estabilizar a rotina mensal.",
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
    resumo: "Informações financeiras transformadas em decisão estratégica, com previsibilidade de caixa.",
    descricao:
      "Gestão Financeira é administrar o dinheiro da empresa de forma estratégica: planejar receitas e despesas, controlar custos, acompanhar indicadores financeiros, analisar resultados, projetar o fluxo de caixa e tomar decisões baseadas em informações confiáveis.\n\nEnquanto o BPO Financeiro organiza e executa a rotina financeira do dia a dia, a Gestão Financeira analisa essas informações para definir os rumos do negócio: qual investimento vale a pena, quanto a empresa pode se comprometer sem colocar o caixa em risco, e onde estão os desperdícios.\n\nEmpresas raramente encerram atividades só por falta de faturamento. Na maioria dos casos, encerram por não administrar adequadamente os recursos que tinham. É exatamente esse risco que a Gestão Financeira existe para evitar: transformar informação financeira em decisão de negócio, com segurança e previsibilidade.",
    icone: "gestao",
    imagem: "/servicos/gestao-financeira.jpg",
    seo: {
      title: "Gestão Financeira | BMN Contabilidade",
      description:
        "Controle real dos resultados, previsibilidade de caixa e decisões estratégicas baseadas em dados para sua empresa crescer com equilíbrio.",
    },
    beneficios: [
      "Controle real dos resultados financeiros",
      "Previsibilidade de caixa",
      "Gestão eficiente do capital de giro",
      "Redução de desperdícios",
      "Base sólida para decisões estratégicas",
      "Planejamento de curto, médio e longo prazo",
    ],
    entregaveis: [
      "Diagnóstico completo de fluxo de caixa, custos e indicadores",
      "Controles gerenciais e projeções financeiras estruturadas",
      "Rotina de acompanhamento com recomendações práticas",
    ],
    paraQuem: [
      "Empresas em fase de crescimento ou expansão de operações",
      "Negócios com dificuldades recorrentes de fluxo de caixa",
      "Empresários que querem aumentar a lucratividade, mas não sabem onde estão perdendo dinheiro",
      "Empresas que pretendem buscar financiamento ou atrair investidores",
      "Negócios que ainda tomam decisões financeiras \"no feeling\", sem indicadores de apoio",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Análise dos demonstrativos, fluxo de caixa, custos, despesas, receitas e indicadores para identificar os gargalos financeiros." },
      { titulo: "Estruturação", descricao: "Estruturação dos controles gerenciais, elaboração das projeções financeiras e avaliação da necessidade de capital de giro." },
      { titulo: "Acompanhamento", descricao: "Reuniões periódicas para analisar indicadores, revisar projeções e orientar as próximas decisões com recomendações práticas." },
    ],
    faq: [
      {
        pergunta: "Gestão Financeira é a mesma coisa que BPO Financeiro?",
        resposta:
          "Não. O BPO Financeiro executa a rotina de contas a pagar, contas a receber e conciliação bancária. A Gestão Financeira usa essas informações para analisar indicadores, projetar cenários e apoiar decisões estratégicas. Muitas empresas contratam os dois juntos, mas são camadas diferentes.",
      },
      {
        pergunta: "Minha empresa já tem contabilidade. Por que também preciso de Gestão Financeira?",
        resposta:
          "A contabilidade cuida do cumprimento das obrigações legais e fiscais. A Gestão Financeira olha para dentro do negócio: lucratividade real, capital de giro, fluxo de caixa projetado e viabilidade de investimentos.",
      },
      {
        pergunta: "O que acontece se eu deixar isso de lado?",
        resposta:
          "Na prática, a empresa perde rentabilidade, opera sem capital de giro suficiente, aumenta o endividamento e toma decisões baseadas em percepção, não em dados, o que compromete a continuidade do negócio a médio prazo.",
      },
      {
        pergunta: "Serve para empresas pequenas ou só para as grandes?",
        resposta:
          "Serve especialmente para quem está em crescimento ou sentindo dificuldade de fluxo de caixa. É justamente nesse momento que decisões mal fundamentadas custam mais caro.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["bpo-financeiro", "contabilidade-consultiva", "planejamento-tributario"],
  },

  {
    slug: "folha-de-pagamento",
    titulo: "Folha de Pagamento",
    resumo: "Administração completa da remuneração dos colaboradores, do início ao fim.",
    descricao:
      "Folha de Pagamento é a administração completa da remuneração dos colaboradores da empresa: cálculo de salários, encargos, benefícios, férias, décimo terceiro e rescisões, sempre em conformidade com a legislação trabalhista e previdenciária.\n\nErros na folha não são apenas um transtorno interno. Geram passivos trabalhistas, insatisfação dos colaboradores e risco de autuações. A legislação trabalhista brasileira tem particularidades que mudam conforme categoria, convenção coletiva e regime de contratação, o que torna esse cálculo mais delicado do que parece.\n\nA BMN assume essa rotina do início ao fim, cuidando de cada colaborador da admissão até a rescisão, com precisão e dentro dos prazos legais.",
    icone: "folha",
    imagem: "/servicos/folha-de-pagamento.jpg",
    seo: {
      title: "Folha de Pagamento | BMN Contabilidade",
      description:
        "Gestão completa da folha de pagamento: salários, encargos, férias, décimo terceiro e rescisões em conformidade legal.",
    },
    beneficios: [
      "Cálculos corretos e dentro do prazo",
      "Conformidade com legislação trabalhista e previdenciária",
      "Gestão completa do ciclo do colaborador",
      "Guias e impostos calculados corretamente (FGTS, INSS, IRRF)",
      "Segurança jurídica",
      "Tranquilidade para o RH ou para o próprio empresário",
    ],
    entregaveis: [
      "Levantamento do quadro de colaboradores, regimes e convenções aplicáveis",
      "Rotina de processamento com calendário e conferência antes do fechamento",
      "Processamento mensal da folha com envio de guias e relatórios",
    ],
    paraQuem: [
      "Empresas com colaboradores registrados em CLT",
      "Negócios que querem eliminar erros e riscos trabalhistas na folha",
      "Empresários que não têm estrutura de RH própria",
      "Empresas em crescimento, contratando novos colaboradores com frequência",
      "Negócios que já tiveram problemas com cálculo de rescisão ou férias",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento do quadro de colaboradores, dos regimes de contratação e das regras (convenções coletivas, benefícios) que se aplicam a cada caso." },
      { titulo: "Estruturação", descricao: "Implantação da rotina de processamento da folha, com calendário definido e processos de conferência antes de cada fechamento." },
      { titulo: "Acompanhamento", descricao: "Processamento mensal da folha, com envio de guias e relatórios, e suporte para admissões, férias e rescisões conforme surgem." },
    ],
    faq: [
      {
        pergunta: "O serviço inclui admissões e demissões?",
        resposta:
          "Sim, todo o ciclo do colaborador é contemplado, desde a admissão até a rescisão, incluindo os cálculos específicos de cada etapa.",
      },
      {
        pergunta: "Como funciona o envio de guias e impostos?",
        resposta:
          "A BMN calcula e disponibiliza as guias FGTS, INSS e IRRF dentro dos prazos legais para pagamento, evitando multas por atraso.",
      },
      {
        pergunta: "E se minha empresa tem colaboradores em convenções coletivas diferentes?",
        resposta:
          "Sem problema. Consideramos as particularidades de cada convenção coletiva aplicável no cálculo da folha.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["e-social-domestico", "bpo-financeiro", "obrigacoes-acessorias"],
  },

  {
    slug: "e-social-domestico",
    titulo: "e-Social",
    resumo: "Envio correto e integrado de todos os eventos trabalhistas, previdenciários e fiscais dos colaboradores.",
    descricao:
      "e-Social é o sistema do governo que unifica o envio de informações trabalhistas, previdenciárias e fiscais relacionadas aos colaboradores da empresa. Cada admissão, alteração contratual, afastamento, férias ou rescisão precisa ser informada dentro de prazos específicos, e qualquer inconsistência pode impactar diretamente os encargos da empresa.\n\nÉ um sistema integrado por natureza: os dados enviados se conectam com a folha de pagamento, com as obrigações fiscais e com o histórico trabalhista de cada colaborador. Um erro em um evento pode gerar efeito cascata em outros, por isso esse serviço exige atenção técnica constante, e não apenas envio pontual.\n\nA BMN cuida de toda essa rotina, integrando o e-Social à folha de pagamento da empresa, para que cada evento seja enviado corretamente e no prazo certo.",
    icone: "esocial",
    imagem: "/servicos/e-social-domestico.jpg",
    seo: {
      title: "e-Social | BMN Contabilidade",
      description:
        "Gestão integrada do e-Social: admissões, afastamentos, férias e rescisões enviados corretamente e no prazo, sem retrabalho.",
    },
    beneficios: [
      "Cumprimento correto e no prazo dos eventos obrigatórios",
      "Redução de riscos de inconsistências e multas",
      "Integração completa com a folha de pagamento",
      "Menos exposição a fiscalizações trabalhistas",
      "Suporte técnico em casos específicos",
    ],
    entregaveis: [
      "Levantamento dos eventos e prazos aplicáveis, considerando o quadro de colaboradores",
      "Organização dos processos de envio integrados à folha de pagamento",
      "Transmissão periódica dos eventos com monitoramento de pendências",
    ],
    paraQuem: [
      "Empresas com colaboradores registrados",
      "Negócios que já tiveram inconsistências ou atrasos no envio de eventos",
      "Empresários que querem eliminar riscos trabalhistas silenciosos",
      "Empresas em crescimento, com admissões e mudanças de quadro frequentes",
      "Negócios que preferem ter esse processo integrado à folha, sem retrabalho",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento dos eventos e prazos aplicáveis à empresa, considerando o quadro de colaboradores e o histórico já enviado ao sistema." },
      { titulo: "Estruturação", descricao: "Organização dos processos de envio e da integração entre o e-Social e a folha de pagamento da empresa." },
      { titulo: "Acompanhamento", descricao: "Transmissão periódica dos eventos e monitoramento de pendências, inconsistências ou alertas do sistema." },
    ],
    faq: [
      {
        pergunta: "O e-Social é obrigatório para todas as empresas com funcionários?",
        resposta:
          "Sim, toda empresa com colaboradores registrados precisa cumprir as obrigações do e-Social, independente do porte.",
      },
      {
        pergunta: "O que acontece em caso de erro no envio?",
        resposta:
          "Pode gerar inconsistências que impactam os encargos da empresa e, em alguns casos, disparar fiscalizações. Por isso o acompanhamento técnico contínuo é essencial.",
      },
      {
        pergunta: "O e-Social substitui outras obrigações trabalhistas?",
        resposta:
          "Ele unifica o envio de várias informações que antes eram enviadas separadamente, mas não elimina a necessidade de conformidade com a legislação trabalhista em si.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["folha-de-pagamento", "bpo-fiscal", "obrigacoes-acessorias"],
  },

  {
    slug: "abertura-de-empresas",
    titulo: "Abertura de Empresas",
    resumo: "Formalização completa da empresa, com enquadramento certo desde o início.",
    descricao:
      "Abertura de CNPJ é o processo completo de formalização de uma empresa: definição do enquadramento jurídico e tributário, escolha da atividade (CNAE), elaboração dos documentos societários e registro nos órgãos competentes até a emissão do CNPJ.\n\nEssa etapa define muito do que vem depois. Escolher o enquadramento errado, uma atividade mal definida ou um regime tributário inadequado no início pode gerar retrabalho e custos evitáveis lá na frente. Por isso a abertura não é tratada como um processo burocrático isolado, mas como o primeiro passo de uma estrutura contábil e tributária pensada para o negócio.\n\nA empresa já sai desse processo com o CNPJ ativo e a rotina contábil estruturada, pronta para operar com segurança desde o primeiro dia.",
    icone: "abertura",
    imagem: "/servicos/abertura-de-empresas.jpg",
    seo: {
      title: "Abertura de Empresas | BMN Contabilidade",
      description:
        "Abertura de CNPJ com enquadramento jurídico e tributário correto, documentos societários e contabilidade já estruturada.",
    },
    beneficios: [
      "Processo de abertura ágil e sem erros",
      "Escolha do enquadramento e regime mais adequados",
      "Empresa pronta para operar de forma regular",
      "Já sai com contabilidade estruturada",
      "Orientação sobre próximos passos (inscrições e licenças)",
    ],
    entregaveis: [
      "Levantamento do tipo de negócio, atividade e necessidades do empresário",
      "Definição do enquadramento jurídico e tributário e registro dos documentos societários",
      "Emissão do CNPJ e orientação sobre alvará, inscrições e início da rotina contábil",
    ],
    paraQuem: [
      "Pessoas que estão iniciando um negócio",
      "Profissionais autônomos que querem formalizar a atividade",
      "Empresários que estão abrindo uma nova filial ou empresa",
      "Sócios estruturando uma nova operação em conjunto",
      "Quem quer começar já com a parte contábil e tributária organizada",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento do tipo de negócio, da atividade pretendida e das necessidades específicas do empresário." },
      { titulo: "Estruturação", descricao: "Definição do enquadramento jurídico e tributário mais adequado, e elaboração e registro dos documentos societários." },
      { titulo: "Acompanhamento", descricao: "Emissão do CNPJ e orientação sobre os próximos passos: alvará, inscrições estaduais e municipais, e início da rotina contábil." },
    ],
    faq: [
      {
        pergunta: "Quanto tempo leva para abrir uma empresa?",
        resposta:
          "Varia conforme o município e a atividade escolhida, mas o processo é conduzido de forma ágil pela BMN, sem etapas desnecessárias.",
      },
      {
        pergunta: "Já saio com contador definido?",
        resposta:
          "Sim. A abertura já inclui a estruturação da rotina contábil da nova empresa, para que ela comece a operar em conformidade desde o primeiro dia.",
      },
      {
        pergunta: "Como sei qual o melhor enquadramento para o meu negócio?",
        resposta:
          "Isso faz parte do diagnóstico inicial: avaliamos a atividade, o faturamento previsto e os planos da empresa para indicar o enquadramento mais vantajoso.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["regularizacao", "certificado-digital", "contabilidade-consultiva"],
  },

  {
    slug: "regularizacao",
    titulo: "Regularização de Empresas",
    resumo: "Coloque sua empresa em dia com o fisco e órgãos reguladores.",
    descricao:
      "Regularização de Empresas é o serviço voltado para negócios com pendências fiscais, cadastrais ou societárias: situações que impedem a empresa de operar plenamente, emitir certidões, participar de licitações ou até renovar o CNPJ.\n\nEssas pendências costumam se acumular silenciosamente: uma obrigação não enviada, um débito não pago, uma alteração societária não registrada. Isoladamente, cada uma parece pequena, mas juntas colocam a empresa em situação de irregularidade, com consequências que vão desde multas até o bloqueio de operações.\n\nA BMN faz o levantamento completo da situação da empresa e conduz cada etapa da regularização, junto aos órgãos competentes, até a empresa voltar a operar de forma plena.",
    icone: "regularizacao",
    imagem: "/servicos/regularizacao.jpg",
    seo: {
      title: "Regularização de Empresas | BMN Contabilidade",
      description:
        "Regularize pendências fiscais, cadastrais e societárias com diagnóstico completo e acompanhamento até a normalização.",
    },
    beneficios: [
      "Empresa apta a operar sem restrições",
      "Eliminação de riscos de bloqueios e multas",
      "Acesso facilitado a crédito",
      "Segurança para venda ou transferência da empresa",
      "Tranquilidade jurídica",
    ],
    entregaveis: [
      "Levantamento completo das pendências fiscais, cadastrais e societárias",
      "Plano de regularização com ordem de prioridade e prazo estimado",
      "Execução das ações junto aos órgãos até a regularização completa",
    ],
    paraQuem: [
      "Empresas com pendências fiscais ou cadastrais acumuladas",
      "Negócios que foram notificados por órgãos públicos",
      "Empresários que precisam vender, transferir ou encerrar a empresa de forma regular",
      "Empresas que estão inaptas ou com restrições junto à Receita Federal",
      "Negócios que precisam de certidões negativas para contratos ou licitações",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento completo de todas as pendências fiscais, cadastrais e societárias junto aos órgãos competentes." },
      { titulo: "Estruturação", descricao: "Elaboração do plano de regularização, com a ordem de prioridade das providências e o prazo estimado para cada etapa." },
      { titulo: "Acompanhamento", descricao: "Execução das ações necessárias junto aos órgãos até a regularização completa, com atualização periódica sobre o andamento." },
    ],
    faq: [
      {
        pergunta: "Quais tipos de pendência podem ser regularizados?",
        resposta:
          "Débitos fiscais, obrigações acessórias em atraso, situação cadastral irregular junto à Receita Federal e pendências societárias, entre outras.",
      },
      {
        pergunta: "Quanto tempo leva o processo?",
        resposta:
          "Varia conforme a complexidade da situação. Após o diagnóstico, apresentamos um prazo estimado e realista para a regularização completa.",
      },
      {
        pergunta: "Minha empresa está inapta na Receita Federal, ainda dá para regularizar?",
        resposta:
          "Sim. É um dos cenários mais comuns que atendemos. O diagnóstico vai identificar exatamente o que precisa ser feito para reverter a situação.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["abertura-de-empresas", "obrigacoes-acessorias", "bpo-fiscal"],
  },

  {
    slug: "imposto-de-renda",
    titulo: "Imposto de Renda",
    resumo: "Apuração e declaração de IRPF e IRPJ com segurança e aproveitamento de deduções legais.",
    descricao:
      "Imposto de Renda é a apuração e declaração anual de rendimentos, tanto para pessoa física (IRPF) quanto para pessoa jurídica (IRPJ), garantindo o cumprimento correto das obrigações junto à Receita Federal.\n\nErros ou omissões na declaração podem levar à malha fina, gerar cobranças retroativas e multas. Por outro lado, uma declaração bem feita pode identificar deduções legais que muitos contribuintes deixam de aproveitar por desconhecimento.\n\nA BMN cuida de todo esse processo, do levantamento dos documentos até o envio da declaração, e permanece disponível para dar suporte caso surja alguma exigência da Receita Federal depois do envio.",
    icone: "irpf",
    imagem: "/servicos/imposto-de-renda.jpg",
    seo: {
      title: "Imposto de Renda | BMN Contabilidade",
      description:
        "Declaração de IRPF e IRPJ com aproveitamento de deduções legais, conferência antes do envio e suporte em exigências.",
    },
    beneficios: [
      "Declaração correta e dentro do prazo",
      "Aproveitamento de deduções legais permitidas",
      "Redução do risco de malha fina",
      "Suporte em caso de exigências da Receita Federal",
      "Atendimento para pessoa física e jurídica em um único lugar",
    ],
    entregaveis: [
      "Levantamento dos dados e documentos necessários",
      "Apuração dos valores devidos ou a restituir e elaboração da declaração",
      "Envio dentro do prazo e suporte em eventuais exigências",
    ],
    paraQuem: [
      "Pessoas físicas com obrigação de declarar",
      "Empresas que precisam declarar o IRPJ",
      "Quem já caiu na malha fina e precisa de suporte para regularização",
      "Contribuintes que suspeitam estar pagando mais imposto do que deveriam",
      "Quem busca segurança e aproveitamento correto das deduções legais",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Levantamento dos dados e documentos necessários para a declaração, sejam eles de pessoa física ou jurídica." },
      { titulo: "Estruturação", descricao: "Apuração dos valores devidos ou a restituir e elaboração da declaração com atenção às deduções aplicáveis." },
      { titulo: "Acompanhamento", descricao: "Envio da declaração dentro do prazo e suporte em eventuais exigências ou notificações da Receita Federal." },
    ],
    faq: [
      {
        pergunta: "O serviço atende pessoa física e jurídica?",
        resposta:
          "Sim, a BMN atende tanto a declaração de Imposto de Renda Pessoa Física (IRPF) quanto a de Pessoa Jurídica (IRPJ).",
      },
      {
        pergunta: "E se eu cair na malha fina?",
        resposta:
          "A BMN presta suporte completo para identificar o motivo, reunir a documentação necessária e responder às exigências da Receita Federal até a regularização.",
      },
      {
        pergunta: "Posso perder prazo e ainda assim declarar?",
        resposta:
          "Sim, mas normalmente com incidência de multa. Por isso, quanto antes reunirmos a documentação, menor o risco de atraso.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["planejamento-tributario", "obrigacoes-acessorias", "contabilidade-consultiva"],
  },

  {
    slug: "certificado-digital",
    titulo: "Certificado Digital",
    resumo: "Identidade digital com validade jurídica para acessar sistemas fiscais e assinar documentos.",
    descricao:
      "Certificado Digital é o documento eletrônico que garante a identidade da empresa ou da pessoa física no ambiente digital, com validade jurídica equivalente a uma assinatura física. É por meio dele que a empresa acessa sistemas fiscais, assina contratos digitalmente e cumpre obrigações que exigem autenticação eletrônica, incluindo o e-Social.\n\nSem o certificado digital válido, a empresa pode ficar impedida de emitir notas fiscais, enviar obrigações fiscais ou assinar documentos com validade legal. É um detalhe simples, mas que pode travar a operação em um momento crítico se não for renovado a tempo.\n\nA BMN cuida de todo o processo, desde a identificação do tipo de certificado necessário até a emissão e orientação sobre uso e renovação.",
    icone: "certificado",
    imagem: "/servicos/certificado-digital.jpg",
    seo: {
      title: "Certificado Digital | BMN Contabilidade",
      description:
        "Emissão de e-CNPJ e e-CPF com validação presencial ou por videoconferência e orientação sobre uso e renovação.",
    },
    beneficios: [
      "Acesso a serviços fiscais e bancários online sem interrupções",
      "Assinatura digital de documentos com validade jurídica",
      "Processo de emissão rápido e assistido",
      "Conformidade com obrigações que exigem certificado",
      "Orientação sobre prazos de renovação",
    ],
    entregaveis: [
      "Identificação do tipo de certificado necessário (e-CNPJ ou e-CPF)",
      "Agendamento e condução da validação, presencial ou por videoconferência",
      "Emissão do certificado e orientação sobre uso e renovação",
    ],
    paraQuem: [
      "Empresas que precisam cumprir obrigações fiscais online",
      "Negócios com colaboradores registrados no e-Social",
      "Empresários que precisam assinar documentos digitalmente com validade jurídica",
      "Empresas com certificado prestes a vencer",
      "Quem está abrindo uma nova empresa e ainda não possui certificado digital",
    ],
    etapas: [
      { titulo: "Diagnóstico", descricao: "Identificação do tipo de certificado necessário para a empresa ou pessoa física, e-CNPJ ou e-CPF, conforme o uso pretendido." },
      { titulo: "Estruturação", descricao: "Agendamento e condução da validação, presencial ou por videoconferência, conforme a modalidade escolhida." },
      { titulo: "Acompanhamento", descricao: "Emissão do certificado e orientação sobre o uso correto e o prazo de renovação, para evitar surpresas de última hora." },
    ],
    faq: [
      {
        pergunta: "Qual a validade do certificado digital?",
        resposta:
          "Geralmente de 1 a 3 anos, dependendo do tipo e da mídia escolhida (cartão, token ou nuvem).",
      },
      {
        pergunta: "É obrigatório para todas as empresas?",
        resposta:
          "É obrigatório para diversas obrigações fiscais e para empresas que possuem funcionários registrados no e-Social, entre outras situações.",
      },
      {
        pergunta: "Posso emitir o certificado por videoconferência?",
        resposta:
          "Sim, dependendo da modalidade escolhida, o processo pode ser feito totalmente à distância, sem necessidade de deslocamento.",
      },
    ],
    cta: CTA_PADRAO,
    relacionados: ["abertura-de-empresas", "e-social-domestico", "regularizacao"],
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