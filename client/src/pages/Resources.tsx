import { ExternalLink, Download, Globe, BookOpen, Award, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface Resource {
  title: string;
  description: string;
  url: string;
  category: 'ferramentas' | 'certificacoes' | 'aprendizado' | 'simuladores';
  icon: React.ReactNode;
}

const resources: Resource[] = [
  // Ferramentas
  {
    title: 'VirtualBox',
    description: 'Máquina virtual gratuita para praticar instalação de sistemas operacionais',
    url: 'https://www.virtualbox.org',
    category: 'ferramentas',
    icon: <Globe size={24} />,
  },
  {
    title: 'Cisco Packet Tracer',
    description: 'Simulador de redes para praticar configuração de switches e roteadores',
    url: 'https://www.netacad.com/pt/courses/packet-tracer',
    category: 'ferramentas',
    icon: <Zap size={24} />,
  },
  {
    title: 'GNS3',
    description: 'Emulador de rede profissional para simulação de infraestrutura',
    url: 'https://www.gns3.com',
    category: 'ferramentas',
    icon: <Globe size={24} />,
  },
  {
    title: 'PuTTY',
    description: 'Cliente SSH gratuito para conexão remota em servidores Linux',
    url: 'https://www.putty.org',
    category: 'ferramentas',
    icon: <Download size={24} />,
  },

  // Certificações
  {
    title: 'CompTIA A+',
    description: 'Certificação fundamental para Help Desk - cobre hardware, SO e redes',
    url: 'https://www.comptia.org/certifications/a',
    category: 'certificacoes',
    icon: <Award size={24} />,
  },
  {
    title: 'ITIL Foundation',
    description: 'Certificação em gerenciamento de serviços de TI e melhores práticas',
    url: 'https://www.axelos.com/certifications/itil-foundation',
    category: 'certificacoes',
    icon: <Award size={24} />,
  },
  {
    title: 'Microsoft Certified: Azure Fundamentals',
    description: 'Certificação em cloud computing com foco em infraestrutura',
    url: 'https://learn.microsoft.com/en-us/certifications/azure-fundamentals/',
    category: 'certificacoes',
    icon: <Award size={24} />,
  },
  {
    title: 'Linux Essentials',
    description: 'Certificação LPI para conhecimentos básicos de Linux',
    url: 'https://www.lpi.org/our-certifications/le-overview',
    category: 'certificacoes',
    icon: <Award size={24} />,
  },

  // Plataformas de Aprendizado
  {
    title: 'Udemy',
    description: 'Cursos online com preços acessíveis sobre Help Desk, redes e sistemas',
    url: 'https://www.udemy.com',
    category: 'aprendizado',
    icon: <BookOpen size={24} />,
  },
  {
    title: 'Coursera',
    description: 'Cursos de universidades e empresas sobre TI e certificações',
    url: 'https://www.coursera.org',
    category: 'aprendizado',
    icon: <BookOpen size={24} />,
  },
  {
    title: 'LinkedIn Learning',
    description: 'Plataforma com cursos profissionais sobre Help Desk e suporte técnico',
    url: 'https://www.linkedin.com/learning',
    category: 'aprendizado',
    icon: <BookOpen size={24} />,
  },
  {
    title: 'YouTube - Professor Ramos TI',
    description: 'Canal com conteúdo gratuito sobre Help Desk e administração de sistemas',
    url: 'https://www.youtube.com/@ProfessorRamosTI',
    category: 'aprendizado',
    icon: <BookOpen size={24} />,
  },

  // Simuladores
  {
    title: 'CompTIA A+ Practice Exams',
    description: 'Simulados oficiais para preparação da certificação CompTIA A+',
    url: 'https://www.comptia.org/training/by-vendor/comptia-authorized-quality-curriculum',
    category: 'simuladores',
    icon: <Zap size={24} />,
  },
  {
    title: 'ITIL Foundation Exam Simulator',
    description: 'Simulador de provas para certificação ITIL Foundation',
    url: 'https://www.axelos.com/certifications/itil-foundation',
    category: 'simuladores',
    icon: <Zap size={24} />,
  },
  {
    title: 'Hack The Box',
    description: 'Plataforma com desafios práticos de segurança e administração de sistemas',
    url: 'https://www.hackthebox.com',
    category: 'simuladores',
    icon: <Zap size={24} />,
  },
  {
    title: 'TryHackMe',
    description: 'Plataforma interativa para aprender segurança e administração de sistemas',
    url: 'https://tryhackme.com',
    category: 'simuladores',
    icon: <Zap size={24} />,
  },
];

const categories = [
  { id: 'ferramentas', label: '🛠️ Ferramentas', color: 'bg-blue-50 border-blue-200' },
  { id: 'certificacoes', label: '🏆 Certificações', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'aprendizado', label: '📚 Aprendizado', color: 'bg-green-50 border-green-200' },
  { id: 'simuladores', label: '⚡ Simuladores', color: 'bg-purple-50 border-purple-200' },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      {/* Botão de Retorno */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4">
        <div className="container">
          <Link href="/">
            <Button className="bg-blue-500 hover:bg-blue-400 text-white gap-2 flex items-center">
              <ArrowLeft size={20} />
              Voltar para Página Inicial
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Recursos Gratuitos</h1>
          <p className="text-lg text-blue-100">
            Ferramentas, certificações, plataformas e simuladores para sua preparação em Help Desk
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container py-12">
        {/* Introdução */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Comece sua Jornada Gratuitamente</h2>
          <p className="text-blue-800 mb-4">
            Reunimos os melhores recursos gratuitos disponíveis na internet para ajudar você a se preparar para uma carreira em Help Desk. 
            Desde ferramentas práticas até certificações reconhecidas no mercado, tudo está aqui.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-3xl mb-2">🛠️</div>
              <p className="font-semibold text-sm">14+ Ferramentas</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-semibold text-sm">4 Certificações</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-3xl mb-2">📚</div>
              <p className="font-semibold text-sm">4 Plataformas</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-semibold text-sm">4 Simuladores</p>
            </div>
          </div>
        </div>

        {/* Recursos por Categoria */}
        {categories.map(category => {
          const categoryResources = resources.filter(r => r.category === category.id);
          return (
            <div key={category.id} className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">{category.label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryResources.map((resource, idx) => (
                  <div
                    key={idx}
                    className={`border-2 rounded-lg p-6 hover:shadow-lg transition-shadow ${category.color}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-blue-600">{resource.icon}</div>
                      <ExternalLink size={20} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-primary hover:bg-blue-800 text-white">
                        Acessar Recurso
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Dica Final */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 mt-12">
          <h3 className="text-2xl font-bold text-green-900 mb-4">💡 Dica de Ouro</h3>
          <p className="text-green-800 mb-4">
            Comece com <strong>VirtualBox</strong> para praticar instalação de sistemas operacionais, 
            combine com <strong>Cisco Packet Tracer</strong> para redes, e estude <strong>ITIL Foundation</strong> 
            para entender processos. Depois, faça a certificação <strong>CompTIA A+</strong> para validar seus conhecimentos.
          </p>
          <p className="text-green-700 text-sm">
            ✓ Todos esses recursos têm versões gratuitas ou períodos de teste • 
            ✓ Comece hoje mesmo • 
            ✓ Seu sucesso depende da dedicação!
          </p>
        </div>
      </div>
    </div>
  );
}
