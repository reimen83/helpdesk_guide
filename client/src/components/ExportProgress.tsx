import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';

export default function ExportProgress() {
  const { progress, getProgress } = useProgress();
  const { completed, total, percentage } = getProgress();

  const sections = [
    { id: 'intro', name: 'Introdução' },
    { id: 'atendimento', name: 'Gestão de Atendimento' },
    { id: 'hardware', name: 'Hardware e Periféricos' },
    { id: 'servidores', name: 'Servidores e Redes' },
    { id: 'sistemas-senior', name: 'Sistemas Senior' },
    { id: 'backup', name: 'Backup e Projetos' },
    { id: 'conclusao', name: 'Conclusão' },
  ];

  const exportProgressPDF = () => {
    const completedSections = sections.filter(s => progress[s.id]?.completed);
    const completionDates = completedSections.map(s => {
      const timestamp = progress[s.id]?.timestamp;
      return timestamp ? new Date(timestamp).toLocaleDateString('pt-BR') : 'N/A';
    });

    const reportContent = `
╔════════════════════════════════════════════════════════════════╗
║           RELATÓRIO DE PROGRESSO - HELP DESK GUIDE             ║
╚════════════════════════════════════════════════════════════════╝

RESUMO GERAL
────────────────────────────────────────────────────────────────
Progresso Total: ${percentage}% (${completed}/${total} seções)
Data do Relatório: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
Status: ${percentage === 100 ? '✓ CONCLUÍDO' : percentage >= 75 ? '⚡ QUASE CONCLUÍDO' : percentage >= 50 ? '💪 EM PROGRESSO' : '🚀 INICIADO'}

PROGRESSO POR SEÇÃO
────────────────────────────────────────────────────────────────
${sections.map((section, idx) => {
  const isCompleted = progress[section.id]?.completed;
  const date = isCompleted ? new Date(progress[section.id].timestamp).toLocaleDateString('pt-BR') : 'Não iniciado';
  return `${idx + 1}. ${section.name}
   Status: ${isCompleted ? '✓ CONCLUÍDO' : '○ NÃO CONCLUÍDO'}
   Data: ${date}\n`;
}).join('')}

ANÁLISE DE APRENDIZADO
────────────────────────────────────────────────────────────────
• Seções Concluídas: ${completed}
• Seções Pendentes: ${total - completed}
• Taxa de Conclusão: ${percentage}%
• Tempo Estimado de Estudo: ${Math.ceil((total - completed) * 1.5)} horas

RECOMENDAÇÕES
────────────────────────────────────────────────────────────────
${percentage === 100 
  ? `✓ Parabéns! Você completou todo o guia!
  
  Próximos passos:
  1. Faça o Quiz para validar seu conhecimento
  2. Estude os PDFs do Mini Curso e Guia Rápido
  3. Prepare-se para entrevistas técnicas
  4. Considere fazer certificações (CompTIA A+, ITIL)` 
  : percentage >= 75 
  ? `⚡ Você está quase lá! Apenas ${total - completed} seção(ões) faltando.
  
  Continue estudando:
  1. Complete as seções pendentes
  2. Revise as seções já estudadas
  3. Faça o Quiz para testar seus conhecimentos` 
  : percentage >= 50 
  ? `💪 Ótimo progresso! Você já completou metade do guia.
  
  Mantenha o ritmo:
  1. Dedique tempo diário ao estudo
  2. Faça anotações das seções importantes
  3. Pratique com as ferramentas recomendadas` 
  : `🚀 Você começou bem! Continue estudando para melhorar seu progresso.
  
  Dicas:
  1. Estude uma seção por dia
  2. Use os recursos gratuitos disponíveis
  3. Faça o Quiz para avaliar seu aprendizado`}

CERTIFICAÇÕES RECOMENDADAS
────────────────────────────────────────────────────────────────
Para profissionais de Help Desk:
• CompTIA A+ (Hardware, SO, Redes)
• ITIL Foundation (Gestão de Serviços)
• Microsoft Certified: Azure Fundamentals
• Linux Essentials (LPI)

CONTATO E SUPORTE
────────────────────────────────────────────────────────────────
Email: reimentutors@gmail.com
Dúvidas? Acesse a página de Contato no site.

════════════════════════════════════════════════════════════════

Relatório gerado automaticamente pelo Help Desk Guide
Data e hora: ${new Date().toLocaleString('pt-BR')}
    `;

    const element = document.createElement('a');
    const file = new Blob([reportContent], { type: 'text/plain; charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `progresso-helpdesk-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="text-purple-600" size={24} />
          <div>
            <h3 className="text-lg font-bold text-purple-900">Exportar Progresso</h3>
            <p className="text-sm text-purple-700">Baixe um relatório detalhado do seu progresso</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">{completed}</p>
            <p className="text-xs text-gray-600">Seções Concluídas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{total - completed}</p>
            <p className="text-xs text-gray-600">Seções Pendentes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{percentage}%</p>
            <p className="text-xs text-gray-600">Progresso</p>
          </div>
        </div>
      </div>

      <Button
        onClick={exportProgressPDF}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
      >
        <Download size={20} />
        Baixar Relatório de Progresso
      </Button>

      <p className="text-xs text-purple-600 mt-3 text-center">
        O relatório inclui: seções completadas, datas, análise de aprendizado e recomendações
      </p>
    </div>
  );
}
