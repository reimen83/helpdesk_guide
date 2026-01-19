import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
}

interface CommentsSectionProps {
  sectionId: string;
  sectionTitle: string;
}

export default function CommentsSection({ sectionId, sectionTitle }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'João Silva',
      email: 'joao@example.com',
      content: 'Excelente conteúdo! Muito útil para minha preparação para a vaga de Help Desk.',
      date: '18 de Janeiro de 2024',
      approved: true,
    },
    {
      id: '2',
      author: 'Maria Santos',
      email: 'maria@example.com',
      content: 'Gostaria de saber mais sobre certificações. Qual vocês recomendam para começar?',
      date: '17 de Janeiro de 2024',
      approved: true,
    },
  ]);

  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.author.trim()) {
      toast.error('Por favor, preencha seu nome');
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Por favor, preencha um email válido');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Por favor, escreva um comentário');
      return;
    }

    setIsLoading(true);

    // Simular envio (em produção, seria uma chamada API)
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: formData.author,
        email: formData.email,
        content: formData.content,
        date: new Date().toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        approved: false, // Aguardando moderação
      };

      setComments(prev => [newComment, ...prev]);
      setFormData({ author: '', email: '', content: '' });
      setIsLoading(false);
      toast.success('Comentário enviado! Aguardando moderação.');
    }, 1000);
  };

  const approvedComments = comments.filter(c => c.approved);
  const pendingComments = comments.filter(c => !c.approved);

  return (
    <section className="bg-card border border-border rounded-lg p-8 my-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="text-primary" size={28} />
        <h3 className="text-2xl font-bold text-primary">Comentários</h3>
      </div>

      {/* Formulário de Comentário */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-border">
        <h4 className="font-semibold text-foreground mb-4">Deixe seu comentário</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Seu nome"
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Seu email (não será publicado)"
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
        </div>

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Seu comentário aqui..."
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none mb-4"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-blue-800 text-white font-semibold"
        >
          {isLoading ? 'Enviando...' : 'Publicar Comentário'}
        </Button>

        <p className="text-xs text-muted-foreground mt-2">
          ✓ Comentários são moderados antes de serem publicados
        </p>
      </form>

      {/* Comentários Pendentes */}
      {pendingComments.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>{pendingComments.length}</strong> comentário(s) aguardando moderação
          </p>
        </div>
      )}

      {/* Lista de Comentários Aprovados */}
      <div className="space-y-4">
        {approvedComments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        ) : (
          approvedComments.map(comment => (
            <div key={comment.id} className="border border-border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-semibold text-foreground flex items-center gap-2">
                    <User size={16} />
                    {comment.author}
                  </h5>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar size={12} />
                    {comment.date}
                  </p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Dica:</strong> Compartilhe suas dúvidas, experiências e sugestões! A comunidade de Help Desk agradece.
        </p>
      </div>
    </section>
  );
}
