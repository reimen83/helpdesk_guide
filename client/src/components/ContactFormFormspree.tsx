import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, User, MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Formulário de contato integrado com Formspree
 * Usa formulário HTML tradicional para compatibilidade total com CORS
 */

const FORMSPREE_ID = '2917895017215295327'; // ID do Formspree para reimen83@hotmail.com

export default function ContactFormFormspree() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Deixar o Formspree processar naturalmente
    // O formulário será enviado para Formspree automaticamente
    setSubmitted(true);
    toast.success('Mensagem enviada com sucesso!');

    // Resetar após 3 segundos
    setTimeout(() => {
      setSubmitted(false);
      e.currentTarget.reset();
    }, 3000);
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
    <form 
      action={`https://formspree.io/f/${FORMSPREE_ID}`}
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
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
          placeholder="Seu nome"
          required
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
          placeholder="seu.email@example.com"
          required
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
          placeholder="Sua mensagem aqui..."
          rows={5}
          required
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
        />
      </div>

      {/* Botão Enviar */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-blue-800 text-white font-semibold py-2"
      >
        Enviar Mensagem
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        ✓ Respeitamos sua privacidade • ✓ Nunca compartilharemos seus dados
      </p>
    </form>
  );
}
