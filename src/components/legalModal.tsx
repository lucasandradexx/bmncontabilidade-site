'use client';

import { useEffect, useRef } from "react";
import { FaTimes, FaShieldAlt, FaFileContract } from "react-icons/fa";

// Dados dos Termos de Uso (Conforme texto fornecido)
const TERMS_DATA = [
  {
    title: "1. Aceitação dos Termos",
    content: "Ao acessar e utilizar o nosso site, você concorda em cumprir os termos e condições aqui estabelecidos, bem como às leis e regulamentações aplicáveis. Caso não concorde com qualquer parte deste termo, você deve interromper o acesso e a utilização do site imediatamente. Os materiais contidos neste site estão protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis."
  },
  {
    title: "2. Licença de Uso",
    content: "É concedida ao usuário uma licença temporária, não exclusiva e intransferível para acessar e visualizar os materiais contidos neste site, exclusivamente para fins pessoais e não comerciais. Esta licença é concedida com as seguintes restrições:\n\n• Não modificar ou copiar os materiais.\n• Não utilizar os materiais para fins comerciais ou para exibição pública, seja comercial ou não.\n• Não realizar engenharia reversa, descompilar ou tentar extrair o código fonte de qualquer software presente no site.\n• Não remover quaisquer direitos autorais ou outras notificações de propriedade.\n• Não transferir ou “espelhar” os materiais em outros servidores.\n\nEsta licença será automaticamente rescindida caso você viole qualquer uma das restrições aqui descritas. Somos autorizados a revogá-la a qualquer momento."
  },
  {
    title: "3. Confidencialidade e Proteção de Dados Pessoais",
    content: "Nosso escritório contábil se compromete a tratar todas as informações fornecidas pelos usuários de forma confidencial e em conformidade com as disposições da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018). Os dados pessoais fornecidos pelos usuários serão usados exclusivamente para os fins para os quais foram coletados e não serão compartilhados com terceiros, exceto conforme permitido por lei ou mediante autorização expressa do titular dos dados."
  },
  {
    title: "4. Responsabilidade das Informações",
    content: "O escritório contábil não se responsabiliza pela veracidade, precisão ou completude das informações fornecidas pelos usuários. É de responsabilidade do cliente garantir que todos os dados fornecidos estejam corretos e atualizados para a execução dos serviços contábeis. O usuário concorda em manter os dados atualizados e comunicar ao escritório qualquer alteração relevante."
  },
  {
    title: "5. Isenção de Responsabilidade",
    content: "Não oferecemos garantias de que o conteúdo será adequado para um propósito específico, nem que os materiais estão livres de erros ou que o acesso ao site será contínuo ou ininterrupto. Além disso, o site não se responsabiliza pela precisão, confiabilidade ou resultados relacionados ao uso dos materiais presentes no site ou em links externos."
  },
  {
    title: "6. Limitações de Responsabilidade",
    content: "Em nenhum momento nosso escritório contábil, fornecedores ou parceiros serão responsáveis por quaisquer danos, diretos ou indiretos, incluindo, sem limitação, perda de dados, lucros cessantes ou qualquer outro prejuízo decorrente do uso ou da impossibilidade de uso dos materiais disponíveis neste site. Esta limitação de responsabilidade se aplica mesmo que o escritório contábil tenha sido previamente notificado sobre a possibilidade de tais danos."
  },
  {
    title: "7. Precisão dos Materiais",
    content: "Embora nos empenhemos para garantir que as informações e os materiais contidos no site sejam precisos, completos e atualizados, não garantimos que o conteúdo esteja livre de erros ou imprecisões. O site pode ser alterado a qualquer momento, sem aviso prévio, e não há compromisso de atualização contínua dos materiais disponibilizados."
  },
  {
    title: "8. Links para Sites de Terceiros",
    content: "Este site pode conter links para outros sites da web que não são controlados pelo nosso escritório. A inclusão de qualquer link não implica endosso ou responsabilidade sobre o conteúdo desses sites. O uso de sites externos é de sua exclusiva responsabilidade."
  },
  {
    title: "9. Modificações nos Termos",
    content: "Podemos revisar e alterar os termos de uso a qualquer momento, sem aviso prévio. Ao continuar a acessar e utilizar o site após alterações nos termos, você concorda em seguir e se vincular à versão mais recente destes termos de serviço."
  },
  {
    title: "10. Lei Aplicável e Jurisdição",
    content: "Estes termos são regidos e interpretados de acordo com as leis brasileiras. Você concorda que qualquer disputa relacionada ao uso do site estará sujeita à jurisdição exclusiva dos tribunais competentes do estado ou localidade."
  }
];

// Dados da Política de Privacidade (Conforme texto fornecido)
const PRIVACY_DATA = [
  {
    title: "Introdução",
    content: "Esta Política de Privacidade da Empresa cobre a coleta, uso e divulgação de informações pessoais que podem ser coletadas pela Empresa a qualquer momento que você interagir com a Empresa, como visitar nosso site, adquirir produtos ou serviços, ou entrar em contato com a Empresa. A sua privacidade é uma prioridade da Empresa e não medimos esforços para a proteger.\n\nVocê reconhece que esta Política de Privacidade faz parte dos nossos Termos de Serviço e, ao acessar ou usar nosso site ou comprar qualquer uma das ofertas associadas, você concorda em obedecer a todos os seus termos e condições. Esta Política de Privacidade cobre a coleta, uso e divulgação de informações pessoais que podem ser coletadas. Leia atentamente o seguinte para saber como coletamos informações, ou práticas de informações, incluindo que tipo de informações são coletadas, como essas informações são usadas, a quem divulgamos as informações e como protegemos suas informações pessoais. Se você não concorda com estes termos, por favor, não acesse ou use este site.\n\nNós nos reservamos o direito de alterar esta Política de Privacidade a qualquer momento. Quaisquer alterações, modificações, acréscimos ou exclusões entrarão em vigor imediatamente. Você reconhece e concorda que é sua responsabilidade revisar este site e esta Política periodicamente e estar ciente de quaisquer modificações. Seu uso continuado do site após tais modificações constituirá seu reconhecimento da Política modificada e concordância em obedecer e ser regido pela Política modificada."
  },
  {
    title: "Tipos de Informações Coletadas",
    content: "A fim de melhor lhe fornecer nossos diversos serviços, coletamos dois tipos de informações sobre nossos usuários: Informações de identificação pessoal e Informações de identificação não pessoal. Nosso principal objetivo ao coletar informações sobre você é fornecer uma experiência tranquila, eficiente e personalizada ao usar nosso site e contratar nossas ofertas de produtos e/ou serviços.\n\nInformação pessoalmente identificável: Refere-se a informações que nos permitem saber quem você é. Quando você se envolve em certas atividades neste site, como pedido de um produto ou serviço, envio de conteúdo e/ou postagem de conteúdo em nosso blog, fóruns de discussão ou outras áreas públicas, ou nos enviando comentários, podemos pedir que você forneça certas informações sobre você, preenchendo e enviando um formulário online. É totalmente opcional para você se envolver nessas atividades. Se você decidir se envolver nessas atividades, no entanto, podemos pedir que nos forneça informações pessoais, como seu nome e sobrenome, endereço para correspondência (incluindo código postal), endereço de e-mail e outras informações de identificação pessoal. Ao solicitar produtos ou serviços no site, você pode ser solicitado a fornecer um número de cartão de crédito. Dependendo da atividade, algumas das informações que pedimos que você forneça são identificadas como obrigatórias e outras como voluntárias. Se você não fornecer os dados obrigatórios com relação a uma atividade específica, não poderá participar dessa atividade.\n\nInformações não pessoalmente identificáveis: Refere-se a informações que não identificam por si só um indivíduo específico. Coletamos certas informações sobre você com base em onde você visita em nosso site de várias maneiras. Essas informações são compiladas e analisadas de forma pessoal e agregada. Essas informações podem incluir o Uniform Resource Locator (“URL”) do site da Web de onde você acabou de chegar, qual URL você acessa em seguida, qual navegador está usando e seu endereço de protocolo de Internet (“IP”)."
  },
  {
    title: "Método de Coleta e Uso de Informações",
    content: "Não coletamos nenhuma informação de identificação pessoal sobre você, a menos que você a forneça voluntariamente. Você nos fornece certas Informações de Identificação Pessoal quando: se inscreve em nossos serviços e registra seu endereço de e-mail conosco; inscreve-se para ofertas especiais de terceiros selecionados; envia mensagens de e-mail, envia formulários ou transmiti outras informações por telefone ou mensagens eletrônicas; ou envie seu cartão de crédito ou outras informações de pagamento ao solicitar e comprar produtos e serviços em nosso site. Também podemos coletar informações suas em outros pontos do nosso site que afirmam que tais informações estão sendo coletadas.\n\nAlém disso, também podemos coletar, ou nosso servidor de anúncios e/ou servidor de conteúdo de terceiros pode coletar, certas Informações não pessoalmente identificáveis. Em última análise, essas informações são armazenadas na forma de categorias de loja e, em alguns casos, URLs específicos. Usamos seu endereço IP para diagnosticar problemas com nossos servidores e software, para administrar nosso site e para coletar informações demográficas. Nossos servidores de anúncios de terceiros também nos fornecerão relatórios resumidos, mas não individuais, que nos dirão quantos anúncios foram apresentados e clicados em nosso site.\n\nUsaremos principalmente suas informações de identificação pessoal para fornecer nossos serviços a você, conforme exigido por nossos contratos com você. Também usaremos as Informações de Identificação Pessoal para aprimorar a operação de nosso site, atender pedidos, melhorar nossos esforços de marketing e promocionais, analisar estatisticamente o uso do site, melhorar nossas ofertas de produtos e serviços e personalizar o conteúdo, layout e serviços de nosso site. Podemos usar informações de identificação pessoal para fornecer informações a você e contatá-lo a respeito de notificações administrativas. Também podemos usar as Informações de Identificação Pessoal para resolver disputas, solucionar problemas e fazer cumprir nossos acordos com você. Implementamos padrões geralmente aceitos de tecnologia e segurança operacional para proteger as informações. Apenas pessoal autorizado e fornecedores terceirizados têm acesso às suas informações pessoais, e esses funcionários e fornecedores são obrigados a tratar essas informações como confidenciais. Apesar dessas precauções, não podemos garantir que pessoas não autorizadas não obtenham acesso às suas informações pessoais."
  },
  {
    title: "Liberação da Informação",
    content: "Divulgação de informações para provedores de serviços e fornecedores terceirizados. A Empresa pode divulgar suas Informações de Identificação Pessoal a prestadores de serviços e fornecedores terceirizados para efetuar ou realizar qualquer transação que você tenha solicitado da Empresa ou conforme necessário para concluir suas obrigações contratuais com você. Isso inclui provedores de serviços de e-mail, provedores de serviços e aplicativos de marketing direto.\n\nA Empresa proíbe contratualmente a venda ou transferência de Informações de Identificação Pessoal por tais provedores de serviços e fornecedores. A Empresa pode compartilhar Informações de Identificação Pessoal com empresas afiliadas que são direta ou indiretamente controladas por, ou sob o controle comum da Empresa.\n\nOferecemos alguns de nossos serviços por meio de acordos contratuais com afiliados, prestadores de serviços, parceiros e outros terceiros. Nós e nossos parceiros de serviço usamos suas informações de identificação pessoal para operar nossos sites e fornecer seus serviços.\n\nOcasionalmente, podemos ser solicitados pelas autoridades policiais ou judiciais a fornecer Informações de identificação pessoal às autoridades governamentais apropriadas. Divulgaremos informações de identificação pessoal após o recebimento de uma ordem judicial, intimação ou para cooperar com uma investigação policial. Cooperamos totalmente com as agências de aplicação da lei na identificação daqueles que usam nossos serviços para atividades ilegais. Nós nos reservamos o direito de relatar às agências de aplicação da lei quaisquer atividades que, de boa-fé, acreditamos ser ilegais.\n\nTambém podemos fornecer informações de identificação não pessoal sobre as vendas de nossos clientes, padrões de tráfego e informações de sites relacionadas a anunciantes terceiros, mas essas estatísticas não incluem nenhuma informação de identificação pessoal.\n\nA Empresa possui salvaguardas para manter suas informações pessoais precisas, completas e atualizadas para os fins para os quais são usadas. Você sempre tem o direito de acessar e corrigir as informações pessoais fornecidas e pode nos ajudar a garantir que suas informações de contato e preferências sejam precisas, completas e atualizadas verificando este site."
  },
  {
    title: "Segurança da Informação",
    content: "Em nosso site, você pode ter certeza de que suas informações de identificação pessoal estão seguras, de acordo com os padrões atuais da indústria. A importância da segurança para todas as informações de identificação pessoal associadas ao nosso usuário é de extrema preocupação para nós. Suas informações de identificação pessoal são protegidas de várias maneiras e residem em um servidor seguro ao qual apenas funcionários selecionados da Empresa e contratados têm acesso por meio de senha.\n\nPara atendê-lo com mais eficiência, as transações de cartão de crédito e o atendimento de pedidos são administrados por bancos terceirizados, agentes de processamento e instituições de distribuição. Eles recebem as informações necessárias para verificar e autorizar seu cartão de crédito ou outras informações de pagamento e para processar e enviar seu pedido.\n\nInfelizmente, nenhuma transmissão de dados pela Internet ou qualquer rede sem fio pode ser garantida como 100% segura. Como resultado, enquanto nos esforçamos para proteger suas informações de identificação pessoal, você reconhece que: existem limitações de segurança e privacidade da Internet que estão além do nosso controle; a segurança, integridade e privacidade de toda e qualquer informação e dados trocados entre você e nós através deste site não podem ser garantidos; e quaisquer informações e dados podem ser visualizados ou adulterados em trânsito por terceiros."
  },
  {
    title: "Cookies",
    content: "Quando você usa nosso site, armazenamos cookies em seu computador para facilitar e personalizar sua experiencia de uso em nosso site. Um cookie é um pequeno arquivo de texto de dados, que um site da Web armazena no disco rígido do seu computador (se seu navegador da Web permitir) que pode ser recuperado posteriormente para identificá-lo para nós. Nossos cookies armazenam números de identificação de usuário atribuídos aleatoriamente, o país onde você está localizado e seu primeiro nome para recebê-lo de volta ao nosso site. Os cookies facilitam a sua utilização do site, facilitam o funcionamento do site e ajudam-nos a manter um site seguro. Você está sempre livre para recusar nossos cookies se seu navegador permitir, mas algumas partes de nosso site podem não funcionar corretamente nesse caso.\n\nPodemos usar uma empresa externa de veiculação de anúncios para exibir anúncios em banner em nosso site. Como parte do serviço, eles colocarão um cookie separado em seu computador. Não forneceremos a nenhum servidor de anúncios de terceiros nenhuma das suas informações de identificação pessoal ou informações sobre suas compras. Nós e nosso servidor de anúncios terceirizado coletaremos e usaremos informações de identificação não pessoal sobre você, como seu endereço IP, tipo de navegador, o servidor em que seu computador está conectado, o código de área e código postal associados ao seu servidor e se você respondeu a um determinado anúncio. Outros anunciantes também podem colocar banners em nosso site da mesma maneira que acima, mas não divulgaremos nenhuma informação de identificação pessoal a eles."
  },
  {
    title: "Políticas de Privacidade de Sites de Terceiros",
    content: "Este documento trata apenas do uso e divulgação de informações que coletamos de você. Outros sites acessíveis através do nosso site têm suas próprias políticas de privacidade e coleta de dados, uso e prática de divulgação. Não somos responsáveis pelas políticas ou práticas de terceiros. Além disso, outras empresas que colocam publicidade em nosso site podem coletar informações sobre você quando você visualiza ou clica em sua publicidade por meio do uso de cookies. Nós não podemos controlar essa coleção de informação. Você deve entrar em contato com esses anunciantes diretamente se tiver alguma dúvida sobre o uso das informações que eles coletam."
  },
  {
    title: "Conformidade com a Lei Geral de Proteção de Dados (LGPD)",
    content: "A empresa precisa coletar e usar certas informações sobre os indivíduos para aprimorar a experiência e compreender algumas dimensões qualitativas e quantitativas sobre os indivíduos, otimizando assim toda a empresa como um ciclo de feedback ativo. Esses indivíduos podem incluir clientes, afiliados, contatos comerciais, funcionários e outras pessoas com as quais a organização tem um relacionamento ou pode precisar entrar em contato.\n\nTemos o compromisso de proteger seus dados, para os quais os protocolos foram exercidos conforme descrito nesta Política de Privacidade. A LGPD estipula protocolos e práticas rígidas em relação à forma como a coleta de dados e o consentimento dos indivíduos são gerenciados. Ao aderir a essas regulamentações, a Empresa demonstra ainda mais nosso compromisso em proteger a segurança e privacidade dos dados de nossos clientes, capacitando nossos clientes com o controle de como suas informações e consentimento são coletados, registrados e usados."
  },
  {
    title: "Atendendo aos Princípios da LGPD",
    content: "A Lei Geral de Proteção de Dados – LGPD descreve como as organizações devem coletar, manipular e armazenar informações pessoais. Essas regras se aplicam independentemente de os dados serem armazenados eletronicamente, em papel ou em outros materiais. Para cumprir a lei, as informações pessoais devem ser coletadas e usadas de forma justa, armazenadas com segurança e não divulgadas de forma ilegal.\n\nA LGPD-BR é sustentada por dez (10) princípios importantes. Esses princípios afirmam que os dados pessoais devem:\n• Ter finalidade específica e informada explicitamente ao titular;\n• Adequação a finalidade previamente acordada e divulgada;\n• Necessidade do tratamento, limitado ao uso de dados essenciais para alcançar a finalidade essencial;\n• Acesso livre, fácil e gratuito das pessoas à forma como seus dados serão tratados;\n• Qualidade dos dados, deixando-os exatos e atualizados, segundo a real necessidade no tratamento;\n• Transparência, ao titular, com informações claras e acessíveis sobre o tratamento e seus responsáveis;\n• Segurança para coibir situações acidentais ou ilícitas como invasão, destruição, perda, difusão;\n• Proteção contra danos ao titular e a demais envolvidos;\n• Não discriminação, ou seja, não permitir atos ilícitos ou abusivos; e\n• Responsabilização do agente, obrigado a demonstrar a eficácia das medidas adotadas."
  },
  {
    title: "Por Que Esta Política Existe",
    content: "Esta política de proteção de dados garante que a Empresa:\n• Cumpre as leis de proteção de dados e segue as boas práticas;\n• Protege os direitos de clientes, funcionários, afiliados e parceiros;\n• É aberto sobre como armazena e processa dados de indivíduos; e\n• Protege-se do risco de violação de dados."
  },
  {
    title: "Foco na Privacidade e Segurança",
    content: "Na empresa, nossa visão é que os dados do cliente são um dos ativos mais valiosos que uma empresa possui e, quando esses dados nos são fornecidos, nosso trabalho é protegê-los e usá-los apenas para os fins que nos foram fornecidos."
  },
  {
    title: "Fornecendo Informações",
    content: "A empresa visa garantir que os indivíduos estejam cientes de que seus dados estão sendo processados e que compreendam:\n• Como os dados estão sendo usados; e\n• Como exercer seus direitos."
  },
  {
    title: "Base Legal para Processamento e Direitos do Titular",
    content: "A Empresa obtém o consentimento dos usuários que concordam com os Termos de Serviço e esta Política de Privacidade ao se inscrever em nossos serviços ou em nossa plataforma. Os usuários podem retirar o consentimento a qualquer momento, fazendo uma solicitação formal.\n\nA empresa promulgou políticas para proteger os direitos dos usuários. Permitimos que nossos clientes optem por não receber notificações e sempre responderemos a solicitações de acesso a dados.\n\nAo final do seu compromisso com a Empresa, você pode solicitar a exclusão de todos os dados que nos sejam enviados para verificação. Sempre atendemos a essas solicitações."
  },
  {
    title: "Atividades de Processamento e Notificações",
    content: "Em conformidade com a LGPD, mantemos um registro de nossas atividades de processamento. Fornecemos essas informações aos nossos clientes assim que uma solicitação formal é feita.\n\nFazemos o nosso melhor para proteger seus dados, embora o inesperado possa acontecer. Temos o compromisso de sempre ser totalmente transparentes e notificar a autoridade supervisora e todas as partes afetadas de acordo com os requisitos da LGPD.\n\nRevisada em 30/09/2020."
  }
];

interface LegalModalProps {
  isOpen: boolean;
  type: "terms" | "privacy" | null;
  onClose: () => void;
}

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Fecha no "Esc" e trava o scroll da página de fundo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Fecha se clicar no fundo desfocado
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !type) return null;

  const activeContent = type === "terms" ? TERMS_DATA : PRIVACY_DATA;
  const activeTitle = type === "terms" ? "Termos de Uso" : "Política de Privacidade";

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-3xl max-h-[85vh] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-850 rounded-t-2xl">
          <div className="flex items-center gap-3">
            {type === "terms" ? (
              <FaFileContract className="text-secondary text-xl" />
            ) : (
              <FaShieldAlt className="text-secondary text-xl" />
            )}
            <h3 className="text-lg font-bold text-white">{activeTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
            aria-label="Fechar Modal"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Conteúdo com scroll independente */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-sm text-white/80 leading-relaxed custom-scrollbar">
          {activeContent.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-base font-semibold text-white">
                {section.title}
              </h4>
              <p className="whitespace-pre-line text-white/70">
                {section.content}
              </p>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-700/50 text-xs text-white/50 text-center">
            Se você tiver dúvidas sobre nossos termos ou políticas de privacidade, entre em contato através de{" "}
            <a href="mailto:contato@bmncontabilidade.com" className="text-secondary hover:underline cursor-pointer">
              contato@bmncontabilidade.com
            </a>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/40 rounded-b-2xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-white bg-secondary hover:bg-secondary/90 hover:scale-[1.02] active:scale-95 rounded-lg transition-all cursor-pointer"
          >
            Entendi e Aceito
          </button>
        </div>
      </div>
    </div>
  );
}