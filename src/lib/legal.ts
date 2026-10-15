// src/lib/legal.ts
// Textos da Política de Privacidade e dos Termos de Uso.
// Revisar com o jurídico antes de cada alteração relevante.

import {
  CNPJ,
  EMAIL,
  ENCARREGADO_DADOS,
  ENDERECO_SEDE,
  NOME_MARCA,
  RAZAO_SOCIAL,
  WHATSAPP_EXIBICAO,
} from "@/lib/empresa";

export type SecaoLegal = { titulo: string; conteudo: string };

export const ATUALIZACAO_LEGAL = "9 de outubro de 2026";

const identificacao = [
  RAZAO_SOCIAL ? `Razão social: ${RAZAO_SOCIAL}` : `Nome: ${NOME_MARCA}`,
  CNPJ ? `CNPJ: ${CNPJ}` : null,
  `Endereço: ${ENDERECO_SEDE}`,
  `E-mail: ${EMAIL}`,
  `WhatsApp: ${WHATSAPP_EXIBICAO}`,
]
  .filter(Boolean)
  .map((linha) => `• ${linha}`)
  .join("\n");

const encarregado = ENCARREGADO_DADOS.nome
  ? `${ENCARREGADO_DADOS.nome}, pelo e-mail ${ENCARREGADO_DADOS.email}`
  : `pelo e-mail ${ENCARREGADO_DADOS.email}`;

export const POLITICA_PRIVACIDADE: SecaoLegal[] = [
  {
    titulo: "1. Quem somos",
    conteudo: `Esta Política explica como a ${NOME_MARCA} ("BMN", "nós") trata os dados pessoais de quem visita este site ou entra em contato conosco, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD). A BMN é a controladora desses dados.\n\n${identificacao}`,
  },
  {
    titulo: "2. Quais dados coletamos",
    conteudo:
      "• Dados que você nos informa nos formulários: nome, WhatsApp, cidade, ramo da empresa, regime tributário, número de funcionários e o motivo do contato.\n• Mensagens trocadas conosco pelo WhatsApp, por e-mail ou pelo chat do site.\n• Dados de navegação: endereço IP, tipo de navegador, páginas visitadas, origem do acesso e cookies, coletados por ferramentas de medição como Google Analytics, Google Tag Manager e Pixel da Meta.\n\nNão pedimos dados sensíveis pelo site. Informações como CNPJ, faturamento e documentos da empresa só são solicitadas na conversa com a nossa equipe, quando necessárias para o atendimento.",
  },
  {
    titulo: "3. Para que usamos os dados",
    conteudo:
      "• Responder ao seu contato e agendar diagnósticos, reuniões e propostas (procedimentos preliminares a um contrato, art. 7º, V, da LGPD).\n• Prestar os serviços contratados e cumprir obrigações legais e regulatórias da profissão contábil (art. 7º, II e V).\n• Medir o desempenho do site e das campanhas e melhorar a comunicação (legítimo interesse, art. 7º, IX, ou consentimento, quando exigido).\n\nNão vendemos dados pessoais.",
  },
  {
    titulo: "4. Com quem compartilhamos",
    conteudo:
      "Compartilhamos dados apenas com fornecedores necessários para operar o site e o atendimento, que tratam os dados conforme nossas instruções: hospedagem do site, provedor de e-mail, WhatsApp/Meta e Google (ferramentas de medição e anúncios). Também podemos compartilhar dados quando houver obrigação legal ou ordem de autoridade competente.",
  },
  {
    titulo: "5. Cookies e ferramentas de medição",
    conteudo:
      "Usamos cookies para o funcionamento do site e para medir visitas, cliques no WhatsApp e envios de formulário. As ferramentas de medição (Google Analytics, Google Tag Manager e Pixel da Meta) podem usar esses dados para avaliar anúncios. Você pode bloquear ou apagar cookies nas configurações do seu navegador; algumas partes do site podem deixar de funcionar corretamente.",
  },
  {
    titulo: "6. Por quanto tempo guardamos",
    conteudo:
      "Dados de contato de quem não se tornou cliente são mantidos por até 24 meses após o último contato, salvo pedido de exclusão antes disso. Dados de clientes são mantidos durante o contrato e pelos prazos exigidos pela legislação contábil, fiscal e trabalhista.",
  },
  {
    titulo: "7. Segurança e sigilo profissional",
    conteudo:
      "Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não autorizado, perda ou alteração. Além da LGPD, seguimos o sigilo profissional previsto no Código de Ética Profissional do Contador. Nenhuma transmissão pela internet é totalmente imune a riscos; em caso de incidente relevante, comunicaremos os titulares afetados e a ANPD, conforme a lei.",
  },
  {
    titulo: "8. Seus direitos",
    conteudo:
      "Você pode, a qualquer momento e sem custo: confirmar se tratamos seus dados; acessar, corrigir ou atualizar dados; pedir anonimização, bloqueio ou eliminação de dados desnecessários; pedir a portabilidade; saber com quem compartilhamos; revogar o consentimento; e se opor a tratamentos feitos com base em legítimo interesse (art. 18 da LGPD). Também é possível apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
  },
  {
    titulo: "9. Encarregado de dados (DPO)",
    conteudo: `Pedidos e dúvidas sobre dados pessoais podem ser enviados ao encarregado de dados da BMN ${encarregado}. Respondemos em até 15 dias.`,
  },
  {
    titulo: "10. Alterações desta Política",
    conteudo: `Podemos atualizar esta Política para refletir mudanças na lei ou nos nossos serviços. A versão vigente estará sempre nesta página. Última atualização: ${ATUALIZACAO_LEGAL}.`,
  },
];

export const TERMOS_DE_USO: SecaoLegal[] = [
  {
    titulo: "1. Aceitação dos Termos",
    conteudo: `Ao acessar e utilizar este site, mantido pela ${NOME_MARCA}, você concorda com estes Termos de Uso e com a nossa Política de Privacidade. Caso não concorde, interrompa o uso do site. Os materiais do site são protegidos pelas leis de direitos autorais e de marcas.`,
  },
  {
    titulo: "2. Licença de Uso",
    conteudo:
      "É concedida ao usuário uma licença temporária, não exclusiva e intransferível para acessar e visualizar os materiais deste site, exclusivamente para fins pessoais e não comerciais. Não é permitido:\n\n• Modificar ou copiar os materiais.\n• Utilizar os materiais para fins comerciais ou para exibição pública.\n• Realizar engenharia reversa ou tentar extrair o código-fonte de qualquer software do site.\n• Remover avisos de direitos autorais ou de propriedade.\n• Transferir ou “espelhar” os materiais em outros servidores.\n\nEsta licença termina automaticamente se qualquer dessas restrições for violada.",
  },
  {
    titulo: "3. Conteúdo informativo",
    conteudo:
      "Os textos do site têm caráter informativo e não substituem a análise do caso concreto por um profissional. Regras tributárias, inclusive as da Reforma Tributária, mudam com frequência; decisões devem ser tomadas com orientação contábil específica para a sua empresa.",
  },
  {
    titulo: "4. Confidencialidade e Proteção de Dados",
    conteudo:
      "As informações enviadas pelo site são tratadas com sigilo profissional e conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Os detalhes estão na Política de Privacidade.",
  },
  {
    titulo: "5. Responsabilidade das Informações",
    conteudo:
      "O usuário é responsável pela veracidade e pela atualização dos dados que fornece. Informações incorretas podem prejudicar o atendimento e a análise feita pela BMN.",
  },
  {
    titulo: "6. Limitações de Responsabilidade",
    conteudo:
      "A BMN se empenha para manter o site disponível e as informações corretas, mas não garante que o acesso será ininterrupto ou livre de erros. A BMN não responde por danos decorrentes do uso ou da impossibilidade de uso dos materiais do site, nem por conteúdo de sites de terceiros acessados por links.",
  },
  {
    titulo: "7. Links para Sites de Terceiros",
    conteudo:
      "Este site pode conter links para sites que não são controlados pela BMN, como WhatsApp, Google Maps e a Área do Cliente. A inclusão de um link não implica endosso, e o uso desses sites segue as regras de cada um.",
  },
  {
    titulo: "8. Modificações nos Termos",
    conteudo: `Estes Termos podem ser revisados a qualquer momento. A versão vigente estará sempre nesta página. Última atualização: ${ATUALIZACAO_LEGAL}.`,
  },
  {
    titulo: "9. Lei Aplicável e Foro",
    conteudo:
      "Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de Recife-PE para resolver eventuais disputas, ressalvado o direito do consumidor de ajuizar ação no foro do seu domicílio.",
  },
];
