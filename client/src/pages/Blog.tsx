import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Tendências em Help Desk para 2026: IA e Automação',
    excerpt: 'Descubra como inteligência artificial e automação estão transformando o suporte técnico...',
    content: `A inteligência artificial está revolucionando a forma como o Help Desk funciona. Chatbots alimentados por IA podem resolver até 70% dos problemas comuns sem intervenção humana.

Tendências principais:
- Chatbots inteligentes para N1
- Automação de tarefas repetitivas
- Análise preditiva de problemas
- Self-service melhorado

Profissionais que se adaptarem a essas tecnologias terão grande vantagem competitiva no mercado.`,
    author: 'Equipe Help Desk Guide',
    date: '19 de Janeiro de 2026',
    category: 'Tendências',
    readTime: 5,
  },
  {
    id: 'blog-2',
    title: 'Como Evoluir de Help Desk para Analista de Sistemas',
    excerpt: 'Guia prático com passos e certificações necessárias para progredir na carreira...',
    content: `Evoluir de Help Desk para Analista de Sistemas é um caminho natural na carreira de TI. Aqui estão os passos essenciais:

1. Consolidar experiência em Help Desk (1-2 anos)
2. Obter certificações: CompTIA A+, Security+, ITIL
3. Especializar-se em uma área (redes, segurança, servidores)
4. Buscar oportunidades de N2/N3
5. Estudar metodologias e frameworks

Tempo médio: 2-3 anos com dedicação.
Salário esperado: R$ 4.000 - R$ 6.000+`,
    author: 'Equipe Help Desk Guide',
    date: '18 de Janeiro de 2026',
    category: 'Carreira',
    readTime: 7,
  },
  {
    id: 'blog-3',
    title: 'Soft Skills Essenciais para Help Desk: Comunicação e Empatia',
    excerpt: 'Por que habilidades interpessoais são tão importantes quanto conhecimento técnico...',
    content: `Muitos técnicos focam apenas em conhecimento técnico, mas as soft skills são igualmente importantes. Um bom profissional de Help Desk precisa de:

Comunicação Clara: Explicar conceitos técnicos em linguagem simples
Empatia: Entender a frustração do usuário
Paciência: Lidar com usuários irritados
Organização: Gerenciar múltiplos chamados
Proatividade: Antecipar problemas

Dica: Pratique essas habilidades diariamente. Elas fazem diferença na sua avaliação de desempenho.`,
    author: 'Equipe Help Desk Guide',
    date: '17 de Janeiro de 2026',
    category: 'Desenvolvimento',
    readTime: 6,
  },
  {
    id: 'blog-4',
    title: 'Linux para Help Desk: Comandos Essenciais que Todo Técnico Deve Saber',
    excerpt: 'Aprenda os comandos Linux mais importantes para suporte técnico profissional...',
    content: `Linux é cada vez mais comum em ambientes corporativos. Aqui estão os comandos essenciais:

Navegação:
- ls: listar arquivos
- cd: mudar diretório
- pwd: mostrar diretório atual

Gerenciamento:
- ps aux: listar processos
- top: monitor de sistema
- df -h: espaço em disco
- du -sh: tamanho de pasta

Logs:
- tail -f /var/log/syslog: ver logs em tempo real
- grep "erro" arquivo.log: buscar erros

Dica: Use uma máquina virtual para praticar sem risco.`,
    author: 'Equipe Help Desk Guide',
    date: '16 de Janeiro de 2026',
    category: 'Técnico',
    readTime: 8,
  },
  {
    id: 'blog-5',
    title: 'Certificações que Valem a Pena em 2026',
    excerpt: 'Análise das certificações mais valorizadas no mercado de Help Desk e TI...',
    content: `Nem todas as certificações têm o mesmo valor. Aqui estão as mais importantes:

CompTIA A+ (⭐⭐⭐⭐⭐)
- Essencial para Help Desk
- Reconhecida globalmente
- Cobre hardware, software e redes

ITIL Foundation (⭐⭐⭐⭐)
- Importante para gestão de serviços
- Diferencial competitivo
- Relativamente fácil de obter

Microsoft Certified (⭐⭐⭐⭐)
- Valorizada em empresas Windows
- Específica por produto
- Excelente para especialização

Investimento: CompTIA A+ é o melhor ponto de partida.`,
    author: 'Equipe Help Desk Guide',
    date: '15 de Janeiro de 2026',
    category: 'Certificações',
    readTime: 6,
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categorySet = new Set(blogPosts.map(p => p.category));
  const categories = ['Todos', ...Array.from(categorySet)];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPosts = selectedCategory === 'Todos'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Botão de Retorno */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-primary hover:text-blue-800 font-semibold flex items-center gap-2"
            >
              ← Voltar para Blog
            </button>
          </div>

          {/* Artigo */}
          <article className="bg-card border border-border rounded-lg p-8 shadow-md">
            <div className="mb-6">
              <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {selectedPost.category}
              </span>
              <h1 className="text-4xl font-bold text-primary mb-4">{selectedPost.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {selectedPost.date}
                </div>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={16} />
                  {selectedPost.readTime} min de leitura
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedPost.content}
            </div>
          </article>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
      ]} />

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Blog Help Desk
          </h1>
          <p className="text-xl text-muted-foreground">
            Artigos sobre tendências, carreira e desenvolvimento profissional em TI
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-card border border-border text-foreground hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Lista de Posts */}
        <div className="grid gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2 hover:text-blue-800">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {post.readTime} min
                    </div>
                  </div>
                </div>
                <ArrowRight className="text-primary flex-shrink-0 mt-2" size={24} />
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-lg p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">Quer contribuir com um artigo?</h2>
          <p className="text-blue-100 mb-6">
            Compartilhe sua experiência e conhecimento com a comunidade de Help Desk
          </p>
          <a
            href="/contato"
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Enviar Sugestão
          </a>
        </div>
      </main>
    </div>
  );
}
