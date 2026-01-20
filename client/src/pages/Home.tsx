import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ConceptCard from '@/components/ConceptCard';
import DataTable from '@/components/DataTable';
import DownloadSection from '@/components/DownloadSection';
import { BookOpen, Server, Network, Zap, Database, CheckCircle } from 'lucide-react';

const sections = [
  {
    id: 'intro',
    title: '1. Introdução',
  },
  {
    id: 'atendimento',
    title: '2. Gestão de Atendimento',
  },
  {
    id: 'hardware',
    title: '3. Hardware e Periféricos',
  },
  {
    id: 'servidores',
    title: '4. Servidores e Redes',
  },
  {
    id: 'sistemas-senior',
    title: '5. Sistemas Senior',
  },
  {
    id: 'backup',
    title: '6. Backup e Projetos',
  },
  {
    id: 'conclusao',
    title: '7. Conclusão',
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('intro');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection !== 'intro') {
      const element = document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <Sidebar sections={sections} activeSection={activeSection} onSectionClick={setActiveSection} />

      <main className="flex-1 md:ml-0 pt-20 md:pt-0">
        <div ref={contentRef} className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="text-primary" size={48} />
            </div>
            <h1 className="text-5xl font-bold text-primary mb-4">
              Guia Completo de Help Desk
            </h1>
            <p className="text-xl text-muted-foreground">
              Preparação profissional para atendimento e suporte técnico
            </p>
          </div>

          {/* Download Section */}
          <DownloadSection />

          {/* Section 1: Introduction */}
          <section id="intro" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">1. Introdução</h2>
            <p className="text-lg text-foreground mb-4 leading-relaxed">
              Este guia foi desenvolvido para fornecer o embasamento teórico e prático necessário para profissionais que desejam atuar na área de suporte técnico (Help Desk/Service Desk). O conteúdo abrange desde o atendimento ao cliente até a administração de infraestruturas complexas, alinhado às exigências do mercado atual.
            </p>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              O suporte técnico moderno não se resume a consertar máquinas; trata-se de gerenciar serviços e entregar valor ao negócio. Ao longo deste material, você compreenderá os conceitos fundamentais que diferenciavam um profissional de suporte excelente.
            </p>
          </section>

          {/* Section 2: Atendimento */}
          <section id="atendimento" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">2. Gestão de Atendimento e ITIL 4</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              A metodologia <strong>ITIL 4</strong> (Information Technology Infrastructure Library) é o padrão mundial para gestão de serviços de TI. Ela estabelece melhores práticas que transformam operações caóticas em processos estruturados e eficientes.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Conceitos Fundamentais</h3>
            <p className="text-base text-foreground mb-4">
              No dia a dia do Help Desk, você lidará com diferentes tipos de registros. É crucial saber diferenciá-los para priorizar corretamente suas tarefas:
            </p>

            <DataTable
              headers={['Termo', 'Definição', 'Exemplo Prático']}
              rows={[
                ['Incidente', 'Interrupção não planejada ou redução na qualidade de um serviço.', 'O computador não liga ou a internet caiu.'],
                ['Requisição', 'Solicitação do usuário para algo novo ou informação.', 'Pedido de instalação de um software ou novo mouse.'],
                ['Problema', 'A causa raiz de um ou mais incidentes recorrentes.', 'Vários usuários perdendo conexão devido a um switch defeituoso.'],
                ['Mudança', 'Adição ou modificação de algo que afeta os serviços de TI.', 'Atualização do sistema ERP da empresa no final de semana.'],
              ]}
            />

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">SLA (Acordo de Nível de Serviço)</h3>
            <p className="text-base text-foreground mb-4">
              O <strong>SLA</strong> é o contrato que define os tempos de atendimento. Ele é dividido em:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ConceptCard
                title="Tempo de Resposta"
                type="concept"
                icon={<Zap className="text-primary" size={20} />}
              >
                Prazo para o técnico dar o primeiro retorno ao usuário. Geralmente varia de 15 minutos a 1 hora dependendo da prioridade.
              </ConceptCard>
              <ConceptCard
                title="Tempo de Solução"
                type="concept"
                icon={<CheckCircle className="text-primary" size={20} />}
              >
                Prazo máximo para o problema ser resolvido definitivamente. Pode variar de 4 horas a 5 dias úteis.
              </ConceptCard>
            </div>

            <ConceptCard
              title="Dica de Ouro: Priorização de Chamados"
              type="tip"
            >
              A priorização deve ser baseada na matriz de <strong>Impacto</strong> (quantas pessoas são afetadas) e <strong>Urgência</strong> (o quanto o negócio para sem aquilo). Um diretor com o e-mail parado tem prioridade alta, assim como um setor inteiro sem internet.
            </ConceptCard>
          </section>

          {/* Section 3: Hardware */}
          <section id="hardware" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">3. Hardware e Manutenção de Equipamentos</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              O técnico de Help Desk é o responsável por garantir que as ferramentas de trabalho físicas estejam operacionais. Isso envolve tanto ações preventivas quanto corretivas.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Manutenção Preventiva vs. Corretiva</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ConceptCard
                title="Manutenção Preventiva"
                type="concept"
              >
                Limpeza interna de gabinetes, troca de pasta térmica a cada 6 meses, verificação de integridade de disco (S.M.A.R.T), atualização de drivers e BIOS/Firmware.
              </ConceptCard>
              <ConceptCard
                title="Manutenção Corretiva"
                type="concept"
              >
                Diagnóstico de falhas (BIPs da placa-mãe, telas azuis/BSOD), substituição de componentes (RAM, SSD/HD, Fonte) e reparo de periféricos.
              </ConceptCard>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Suporte a Periféricos e Impressoras</h3>
            <p className="text-base text-foreground mb-4">
              Grande parte dos chamados envolve impressoras. Você deve dominar:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6">
              <li>Configuração de impressoras em rede (via IP)</li>
              <li>Limpeza de roletes e sensores</li>
              <li>Resolução de atolamentos de papel e substituição de insumos (toner/cartucho)</li>
              <li>Instalação de drivers e configuração de scanners (SMB/FTP)</li>
            </ul>
          </section>

          {/* Section 4: Servidores e Redes */}
          <section id="servidores" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">4. Administração de Servidores e Redes</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Apoiar a administração de servidores exige conhecimento em sistemas operacionais robustos e na infraestrutura que os conecta.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Windows Server e Active Directory</h3>
            <p className="text-base text-foreground mb-4">
              O <strong>Active Directory (AD)</strong> é o coração da gestão de usuários em empresas. Suas tarefas comuns incluirão:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6">
              <li><strong>Reset de senhas</strong> e desbloqueio de contas</li>
              <li>Criação de novos usuários e grupos de segurança</li>
              <li>Gestão de permissões em pastas compartilhadas (NTFS)</li>
              <li>Entendimento básico de <strong>GPOs</strong> (Políticas de Grupo)</li>
            </ul>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Linux para Suporte</h3>
            <p className="text-base text-foreground mb-4">
              Muitos servidores de arquivos ou serviços web rodam Linux. Domine os comandos básicos:
            </p>

            <ConceptCard
              title="Comandos Linux Essenciais"
              type="concept"
              icon={<Server className="text-primary" size={20} />}
            >
              <div className="font-mono text-sm space-y-1">
                <div><strong>ls, cd, cp, mv, rm:</strong> Manipulação de arquivos</div>
                <div><strong>chmod, chown:</strong> Gestão de permissões</div>
                <div><strong>top, ps:</strong> Monitoramento de processos</div>
                <div><strong>tail -f /var/log/syslog:</strong> Visualização de logs</div>
              </div>
            </ConceptCard>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Fundamentos de Redes</h3>
            <p className="text-base text-foreground mb-4">
              Para solucionar problemas de conexão, você deve entender como os dados trafegam:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ConceptCard
                title="LAN e Wi-Fi"
                type="concept"
                icon={<Network className="text-primary" size={20} />}
              >
                Diferença entre redes cabeadas e sem fio, frequências (2.4GHz vs 5GHz) e segurança (WPA2/WPA3).
              </ConceptCard>
              <ConceptCard
                title="Cabeamento Estruturado"
                type="concept"
                icon={<Network className="text-primary" size={20} />}
              >
                Padrões T568A/T568B, categorias de cabos (Cat5e, Cat6, Cat6a), identificação de patch panels.
              </ConceptCard>
            </div>

            <ConceptCard
              title="Ferramentas de Diagnóstico"
              type="concept"
            >
              <div className="space-y-2">
                <div><strong>ping:</strong> Testa conectividade básica</div>
                <div><strong>tracert:</strong> Mostra o caminho dos dados pela rede</div>
                <div><strong>ipconfig/ifconfig:</strong> Verifica configurações de IP</div>
                <div><strong>nslookup:</strong> Resolve nomes de domínio</div>
              </div>
            </ConceptCard>
          </section>

          {/* Section 5: Sistemas Senior */}
          <section id="sistemas-senior" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">5. Sistemas de Gestão (ERP/HCM) - Foco em Senior</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Empresas de médio e grande porte utilizam sistemas integrados. A linha <strong>Senior</strong> é referência no Brasil.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Principais Módulos</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ConceptCard
                title="Sapiens (ERP)"
                type="concept"
              >
                Sistema de gestão empresarial que cobre finanças, suprimentos, vendas, produção e outros módulos.
              </ConceptCard>
              <ConceptCard
                title="Vetorh / HCM"
                type="concept"
              >
                Gestão de pessoas (folha de pagamento, ponto eletrônico, RH, benefícios, medicina e segurança do trabalho).
              </ConceptCard>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Atuação do Suporte</h3>
            <p className="text-base text-foreground mb-4">
              Como técnico, seu papel será garantir que o usuário consiga acessar o sistema. Isso envolve:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6">
              <li>Instalação do cliente Senior nas máquinas</li>
              <li>Configuração do Java (muito comum nesses sistemas)</li>
              <li>Ajuste de atalhos e variáveis de ambiente</li>
              <li>Resolução de erros de conexão com o banco de dados</li>
              <li>Conhecimento básico sobre o <strong>Senior Middleware</strong></li>
            </ul>

            <ConceptCard
              title="Dica de Ouro: Conhecimento Funcional"
              type="tip"
            >
              Além do suporte técnico, ter conhecimento básico sobre os processos de negócio que o sistema suporta (ex: como funciona uma folha de pagamento no Vetorh) ajuda a resolver problemas mais rapidamente e a comunicar-se melhor com os usuários.
            </ConceptCard>
          </section>

          {/* Section 6: Backup */}
          <section id="backup" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">6. Backup, Recuperação e Projetos</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              A segurança dos dados é a maior responsabilidade da TI. Um backup bem planejado pode ser a diferença entre uma recuperação rápida e um desastre corporativo.
            </p>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Estratégia de Backup - Regra 3-2-1</h3>
            <p className="text-base text-foreground mb-4">
              A estratégia mais confiável é conhecida como <strong>Regra 3-2-1</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ConceptCard
                title="3 Cópias"
                type="concept"
                icon={<Database className="text-primary" size={20} />}
              >
                Original + 2 backups (garantindo redundância)
              </ConceptCard>
              <ConceptCard
                title="2 Mídias"
                type="concept"
                icon={<Database className="text-primary" size={20} />}
              >
                Disco Local e Fita/Nuvem (evita falha de um único tipo)
              </ConceptCard>
              <ConceptCard
                title="1 Off-site"
                type="concept"
                icon={<Database className="text-primary" size={20} />}
              >
                Cópia fora da empresa (proteção contra desastres)
              </ConceptCard>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Tipos de Backup</h3>

            <DataTable
              headers={['Tipo', 'Descrição', 'Vantagem']}
              rows={[
                ['Full (Completo)', 'Cópia de todos os dados', 'Recuperação rápida e simples'],
                ['Incremental', 'Apenas o que mudou desde o último backup', 'Menor uso de espaço'],
                ['Diferencial', 'Tudo o que mudou desde o último full', 'Equilíbrio entre velocidade e espaço'],
              ]}
            />

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Conceitos Importantes</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ConceptCard
                title="RPO (Recovery Point Objective)"
                type="concept"
              >
                Quanto de dado a empresa aceita perder em caso de desastre (tempo). Ex: RPO de 1 hora significa que perderemos no máximo 1 hora de dados.
              </ConceptCard>
              <ConceptCard
                title="RTO (Recovery Time Objective)"
                type="concept"
              >
                Quanto tempo a empresa pode ficar parada até restaurar o serviço. Ex: RTO de 4 horas significa que o sistema deve estar operacional em no máximo 4 horas.
              </ConceptCard>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Apoio em Projetos e Melhorias</h3>
            <p className="text-base text-foreground mb-4">
              O Help Desk é o braço operacional em grandes mudanças. Você ajudará em:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-6">
              <li><strong>Migrações:</strong> Troca de sistemas operacionais (ex: Windows 10 para 11), migração de e-mails</li>
              <li><strong>Inventário:</strong> Manter controle de ativos (computadores, licenças, periféricos)</li>
              <li><strong>Documentação:</strong> Criar manuais para usuários (Knowledge Base)</li>
              <li><strong>Melhorias:</strong> Identificar gargalos e sugerir implementações</li>
            </ul>
          </section>

          {/* Section 7: Conclusão */}
          <section id="conclusao" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-primary mb-6">7. Conclusão</h2>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              Para ter sucesso na vaga de Help Desk, demonstre proatividade e vontade de aprender. O conhecimento técnico é a base, mas a <strong>empatia no atendimento</strong> e a <strong>organização nos registros</strong> são o que diferenciam um excelente profissional de suporte.
            </p>

            <ConceptCard
              title="Próximos Passos"
              type="tip"
            >
              <ul className="list-disc list-inside space-y-2">
                <li>Estude este material com atenção</li>
                <li>Pratique os comandos Linux e Windows em um ambiente de teste</li>
                <li>Familiarize-se com ferramentas de suporte (tickets, RMM)</li>
                <li>Desenvolva suas habilidades de comunicação com usuários</li>
                <li>Mantenha-se atualizado sobre tendências de TI</li>
              </ul>
            </ConceptCard>

            <p className="text-lg text-foreground mt-8 text-center font-semibold">
              Desejo muito sucesso na sua preparação e na conquista dessa vaga!
            </p>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2024 Guia Completo de Help Desk e Suporte Técnico</p>
            <p className="text-sm mt-2">Material educativo para preparação profissional</p>
            <p className="text-xs mt-4">Desenvolvido com ❤️ para profissionais de TI</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
