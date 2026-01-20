import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Formulário de contato integrado com Formspree
 * 
 * Para usar:
 * 1. Acesse https://formspree.io
 * 2. Crie uma conta gratuita
 * 3. Crie um novo formulário
 * 4. Copie o ID do formulário (exemplo: f/abc123xyz)
 * 5. Substitua FORMSPREE_ID abaixo pelo seu ID
 */

const FORMSPREE_ID = 'f/2917895017215295327'; // ID do Formspree para reimen83@hotmail.com

export default function ContactFormFormspree() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.name.trim()) {
      toast.error('Por favor, preencha seu nome');
      return;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Por favor, preencha um email válido');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Por favor, preencha a mensagem');
      return;
    }

    setIsLoading(true);

    try {
      // Enviar para Formspree
      const response = await fetch('https://formspree.io/' + FORMSPREE_ID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsLoading(false);
        setSubmitted(true);
        toast.success('Mensagem enviada com sucesso!');

        // Resetar formulário após 3 segundos
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error('Erro:', error);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
        <h3 className="text-2xl font-bold text-green-700 mb-2">Obrigado!</h3>
        <p className="text-green-600">
          Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
          <User className="inline mr-2" size={16} />
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
          <Mail className="inline mr-2" size={16} />
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu.email@example.com"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
          <MessageSquare className="inline mr-2" size={16} />
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Sua mensagem aqui..."
          rows={5}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
        />
      </div>

      {/* Botão Enviar */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-2"
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        ✓ Respeitamos sua privacidade • ✓ Nunca compartilharemos seus dados
      </p>
    </form>
  );
}
