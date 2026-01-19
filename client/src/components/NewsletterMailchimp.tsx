import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Newsletter integrada com Mailchimp
 * 
 * Para usar:
 * 1. Acesse https://mailchimp.com
 * 2. Crie uma conta gratuita
 * 3. Crie uma lista de contatos
 * 4. Vá para Settings > API keys e copie sua API key
 * 5. Vá para Audience > All contacts e copie o Audience ID
 * 6. Substitua MAILCHIMP_API_KEY e MAILCHIMP_AUDIENCE_ID abaixo
 * 
 * Nota: Para produção, use um backend para proteger a API key
 */

const MAILCHIMP_API_KEY = 'SEU_API_KEY_AQUI';
const MAILCHIMP_AUDIENCE_ID = 'SEU_AUDIENCE_ID_AQUI';
const MAILCHIMP_SERVER = 'us1'; // Substitua pelo seu server (us1, us2, etc)

export default function NewsletterMailchimp() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Por favor, preencha um email válido');
      return;
    }

    setIsLoading(true);

    try {
      // Chamar Mailchimp API
      const response = await fetch(
        `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            tags: ['helpdesk-guide'],
          }),
        }
      );

      if (response.ok || response.status === 400) {
        // 400 pode significar que o email já está inscrito
        setIsLoading(false);
        setSubscribed(true);
        toast.success('Você foi inscrito na newsletter!');
        setEmail('');

        // Resetar após 5 segundos
        setTimeout(() => {
          setSubscribed(false);
        }, 5000);
      } else {
        throw new Error('Erro ao inscrever');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Erro ao inscrever. Tente novamente.');
      console.error('Erro:', error);
    }
  };

  if (subscribed) {
    return (
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-12 px-4 rounded-lg border-2 border-green-300 my-8">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
          <h3 className="text-2xl font-bold text-green-700 mb-2">Inscrição Confirmada!</h3>
          <p className="text-green-600">
            Obrigado por se inscrever! Você receberá atualizações sobre Help Desk, dicas de carreira e novos conteúdos em seu email.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-primary to-blue-700 py-12 px-4 rounded-lg my-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="text-white" size={32} />
          <h3 className="text-3xl font-bold text-white">Fique Atualizado</h3>
        </div>

        <p className="text-center text-blue-100 mb-6 text-lg">
          Receba dicas exclusivas, atualizações de conteúdo e oportunidades de carreira em Help Desk
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email..."
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-white text-foreground placeholder-gray-400"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:bg-gray-100 text-primary font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            {isLoading ? 'Inscrevendo...' : 'Inscrever'}
          </Button>
        </form>

        <p className="text-xs text-blue-100 text-center mt-4">
          ✓ Sem spam • ✓ Desinscreva-se a qualquer momento • ✓ Privacidade garantida
        </p>
      </div>
    </section>
  );
}
