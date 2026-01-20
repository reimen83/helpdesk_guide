import { Download, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DownloadSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-green-50 py-12 px-4 rounded-lg border border-blue-200 my-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BookOpen className="text-primary" size={32} />
          <h3 className="text-3xl font-bold text-primary">Materiais de Estudo</h3>
        </div>

        <p className="text-center text-foreground mb-8 text-lg">
          Baixe nossos materiais completos em PDF para estudar offline e se preparar para a vaga de Help Desk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mini Curso PDF */}
          <div className="bg-white p-6 rounded-lg border-2 border-primary shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="text-primary mt-1" size={24} />
              <div>
                <h4 className="font-bold text-lg text-primary">Mini Curso Completo</h4>
                <p className="text-sm text-muted-foreground">PDF com 8 módulos detalhados</p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-4">
              Conteúdo completo abordando: ITIL 4, Hardware, Servidores, Redes, Sistemas Senior, Backup, Projetos e Soft Skills.
            </p>

            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <span>📄 ~50 páginas</span>
              <span>•</span>
              <span>🎓 Nível: Iniciante a Intermediário</span>
            </div>

            <a href="/Mini_Curso_HelpDesk_Completo.pdf" download>
              <Button className="w-full bg-primary hover:bg-blue-800 text-white gap-2">
                <Download size={18} />
                Baixar Mini Curso (PDF)
              </Button>
            </a>
          </div>

          {/* Guia Rápido */}
          <div className="bg-white p-6 rounded-lg border-2 border-accent shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="text-accent mt-1" size={24} />
              <div>
                <h4 className="font-bold text-lg text-accent">Guia Rápido de Referência</h4>
                <p className="text-sm text-muted-foreground">Resumo executivo</p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-4">
              Versão resumida com os conceitos-chave, comandos essenciais e checklist de preparação para a entrevista.
            </p>

            <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
              <span>📄 ~20 páginas</span>
              <span>•</span>
              <span>⚡ Rápido de consultar</span>
            </div>

            <a href="/guia_rapido_referencias.pdf" download>
              <Button className="w-full bg-accent hover:bg-green-700 text-white gap-2">
                <Download size={18} />
                Baixar Guia Rápido (PDF)
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>💡 Dica:</strong> Baixe o mini curso e estude com atenção. Pratique os comandos Linux em uma máquina virtual. Isso vai preparar você muito bem para a vaga!
          </p>
        </div>
      </div>
    </section>
  );
}
