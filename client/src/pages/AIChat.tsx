import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou seu assistente de IA. Posso ajudá-lo com qualquer assunto - desde tecnologia, negócios, educação, criatividade, e muito mais. Faça suas perguntas e vou fazer o meu melhor para ajudar. Como posso começar?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const aiChatMutation = trpc.ai.chat.useMutation({
    onSuccess: (response: any) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: response.message,
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao processar sua mensagem");
      setIsLoading(false);
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!isAuthenticated) {
      toast.error("Você precisa fazer login para usar o chat");
      setLocation("/login");
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Send to AI
    aiChatMutation.mutate({
      message: input,
      context: "general",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Assistente de IA</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Seu consultor de IA para qualquer assunto
              </p>
            </div>
          </div>
        </div>

        <Card className="flex flex-col h-[600px]">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat com IA
            </CardTitle>
            <CardDescription>
              {user ? `Conectado como ${user.name}` : "Faça login para usar o chat"}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-blue-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            )}
          </CardContent>

          <div className="border-t p-4">
            {!isAuthenticated ? (
              <Button
                onClick={() => setLocation("/login")}
                className="w-full"
              >
                Faça login para usar o chat
              </Button>
            ) : (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Digite sua pergunta..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            )}
          </div>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exemplos de Perguntas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Como aprender programação?</p>
              <p>• Qual é a melhor estratégia de marketing?</p>
              <p>• Como melhorar minha produtividade?</p>
              <p>• Explique um conceito de física</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recursos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Respostas instantâneas</p>
              <p>• Baseado em IA generativa avançada</p>
              <p>• Suporta qualquer assunto</p>
              <p>• Disponível 24/7</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Seja específico em suas perguntas</p>
              <p>• Use linguagem clara</p>
              <p>• Faça perguntas de acompanhamento</p>
              <p>• Explore diferentes tópicos livremente</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
