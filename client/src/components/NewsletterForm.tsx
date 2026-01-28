import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const NEWSLETTER_RATE_LIMIT_KEY = "lastNewsletterSubmit";
const RATE_LIMIT_MINUTES = 1;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const checkRateLimit = (): boolean => {
    const lastSubmit = localStorage.getItem(NEWSLETTER_RATE_LIMIT_KEY);
    if (!lastSubmit) return true;

    const lastSubmitTime = parseInt(lastSubmit);
    const now = Date.now();
    const timeDiffMinutes = (now - lastSubmitTime) / (1000 * 60);

    if (timeDiffMinutes < RATE_LIMIT_MINUTES) {
      const remainingSeconds = Math.ceil(
        RATE_LIMIT_MINUTES * 60 - timeDiffMinutes * 60
      );
      toast.error(
        `Por favor, aguarde ${remainingSeconds}s antes de se inscrever novamente`
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!email.trim()) {
      toast.error("Por favor, digite seu email");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor, digite um email válido (ex: nome@dominio.com)");
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
      localStorage.setItem(NEWSLETTER_RATE_LIMIT_KEY, Date.now().toString());

      // Limpar formulário
      setEmail("");

      toast.success("Inscrição realizada com sucesso! Verifique seu email.");
    } catch (error) {
      toast.error("Erro ao se inscrever. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <Input
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Inscrever"
        )}
      </Button>
    </form>
  );
}
