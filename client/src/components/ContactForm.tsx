import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CONTACT_RATE_LIMIT_KEY = "lastContactSubmit";
const RATE_LIMIT_MINUTES = 1;

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkRateLimit = (): boolean => {
    const lastSubmit = localStorage.getItem(CONTACT_RATE_LIMIT_KEY);
    if (!lastSubmit) return true;

    const lastSubmitTime = parseInt(lastSubmit);
    const now = Date.now();
    const timeDiffMinutes = (now - lastSubmitTime) / (1000 * 60);

    if (timeDiffMinutes < RATE_LIMIT_MINUTES) {
      const remainingSeconds = Math.ceil(
        RATE_LIMIT_MINUTES * 60 - timeDiffMinutes * 60
      );
      toast.error(
        `Por favor, aguarde ${remainingSeconds}s antes de enviar outro contato`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.name.trim()) {
      toast.error("Por favor, digite seu nome");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Por favor, digite seu email");
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Por favor, digite um email válido (ex: nome@dominio.com)");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Por favor, digite um assunto");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Por favor, digite uma mensagem");
      return;
    }

    // Rate limiting
    if (!checkRateLimit()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular envio (você pode integrar com um backend aqui)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Salvar timestamp do último envio
      localStorage.setItem(CONTACT_RATE_LIMIT_KEY, Date.now().toString());

      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="subject">Assunto</Label>
        <Input
          id="subject"
          type="text"
          placeholder="Assunto da mensagem"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          placeholder="Sua mensagem..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          disabled={isLoading}
          rows={5}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar"
        )}
      </Button>
    </form>
  );
}
