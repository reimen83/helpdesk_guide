import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send, MessageCircle, Sparkles, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface RelatedTopic {
  title: string;
  description: string;
}

export default function AIChat() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [conversationId, setConversationId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou seu assistente de IA. Posso ajudá-lo com qualquer assunto - desde tecnologia, negócios, educação, criatividade, e muito mais. Faça suas perguntas e vou fazer o meu melhor para ajudar com insights e recomendações. Como posso começar?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [relatedTopics, setRelatedTopics] = useState<RelatedTopic[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Gerar conversation ID ao montar
  useEffect(() => {
    const newConversationId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newConversationId);
  }, []);

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const aiChatMutation = trpc.ai.chat.useMutation({
    onSuccess: (response: any) => {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsLoading(false);

      // Extrair tópicos relacionados da resposta
      extractRelatedTopics(response.message);
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao processar sua mensagem");
      setIsLoading(false);
    },
  });

  const extractRelatedTopics = (text: string) => {
    // Simples extração de tópicos relacionados baseada em padrões
    const topics: RelatedTopic[] = [];

    // Padrões comuns de sugestões
    if (text.includes("também")) {
      topics.push({
        title: "Explorar conceitos relacionados",
        description: "Saiba mais sobre tópicos mencionados",
      });
    }
    if (text.includes("próximo passo") || text.includes("recomendo")) {
      topics.push({
        title: "Próximos passos sugeridos",
        description: "Siga as recomendações para aprofundar",
      });
    }
    if (text.includes("exemplo") || text.includes("prático")) {
      topics.push({
        title: "Exemplos práticos",
        description: "Veja aplicações do conceito",
      });
    }

    setRelatedTopics(topics.slice(0, 3));
  };

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
      conversationId,
      context: "general",
    });
  };

  const handleTopicClick = (topic: string) => {
    setInput(topic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Assistente de IA</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Seu consultor generativo para qualquer assunto
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Chat Area */}
          <div className="lg:col-span-2">
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
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                <div ref={messagesEndRef} />
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
          </div>

          {/* Sidebar with Related Topics and Examples */}
          <div className="space-y-4">
            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Tópicos Relacionados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {relatedTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTopicClick(topic.title)}
                      className="w-full text-left p-2 rounded hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <p className="font-medium text-sm">{topic.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {topic.description}
                      </p>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Exemplos de Perguntas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exemplos de Perguntas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <button
                  onClick={() => handleTopicClick("Como aprender programação?")}
                  className="block w-full text-left hover:text-blue-600 dark:hover:text-blue-400"
                >
                  • Como aprender programação?
                </button>
                <button
                  onClick={() => handleTopicClick("Qual é a melhor estratégia de marketing?")}
                  className="block w-full text-left hover:text-blue-600 dark:hover:text-blue-400"
                >
                  • Qual é a melhor estratégia de marketing?
                </button>
                <button
                  onClick={() => handleTopicClick("Como melhorar minha produtividade?")}
                  className="block w-full text-left hover:text-blue-600 dark:hover:text-blue-400"
                >
                  • Como melhorar minha produtividade?
                </button>
                <button
                  onClick={() => handleTopicClick("Explique um conceito de física")}
                  className="block w-full text-left hover:text-blue-600 dark:hover:text-blue-400"
                >
                  • Explique um conceito de física
                </button>
              </CardContent>
            </Card>

            {/* Recursos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recursos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Respostas instantâneas</p>
                <p>• Baseado em IA generativa avançada</p>
                <p>• Suporta qualquer assunto</p>
                <p>• Histórico persistente</p>
                <p>• Insights e recomendações</p>
                <p>• Disponível 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
