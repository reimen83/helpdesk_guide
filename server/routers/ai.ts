import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { saveChatMessage, getChatHistory, getDb } from "../db";
import { nanoid } from "nanoid";
import { chatHistory } from "../../drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const aiRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "Mensagem não pode estar vazia"),
        conversationId: z.string().optional(),
        context: z.string().optional().default("general"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const conversationId = input.conversationId || nanoid();
      const userId = ctx.user?.id || 0;

      const systemPrompt = `Você é um assistente IA inteligente, generativo e versátil. Você pode ajudar com qualquer assunto, responder perguntas, fornecer informações, dar conselhos, resolver problemas e muito mais.

Você é:
- Conhecedor em múltiplos domínios (tecnologia, negócios, educação, saúde, criatividade, etc.)
- Sempre útil, honesto e respeitoso
- Capaz de adaptar seu tom e estilo de comunicação conforme necessário
- Pronto para ajudar com qualquer pergunta ou tarefa
- Generativo: você não apenas responde, mas também oferece insights, recomendações, sugestões de tópicos relacionados e novas perspectivas

Quando responder:
1. Forneça uma resposta completa e informativa
2. Ofereça insights adicionais ou perspectivas que o usuário pode não ter considerado
3. Sugira tópicos relacionados que poderiam ser interessantes explorar
4. Recomende recursos, ferramentas ou próximos passos práticos
5. Se apropriado, faça perguntas de acompanhamento para aprofundar o entendimento

Responda de forma clara, concisa e útil. Sempre que possível, forneça exemplos práticos e informações relevantes.`;

      try {
        // Recuperar histórico de chat se o usuário estiver autenticado
        let chatMessages: any[] = [];
        if (userId > 0) {
          chatMessages = await getChatHistory(userId, conversationId);
        }

        // Construir array de mensagens com histórico
        const messages: any[] = [
          {
            role: "system",
            content: systemPrompt,
          },
        ];

        // Adicionar histórico de chat (últimas 5 mensagens)
        if (chatMessages.length > 0) {
          const recentMessages = chatMessages.slice(-10);
          recentMessages.forEach((msg) => {
            messages.push({
              role: msg.role,
              content: msg.content,
            });
          });
        }

        // Adicionar mensagem atual
        messages.push({
          role: "user",
          content: input.message,
        });

        const response = await invokeLLM({
          messages,
        });

        const messageContent = response.choices[0]?.message?.content;

        if (!messageContent) {
          throw new Error("Nenhuma resposta recebida da IA");
        }

        const responseText =
          typeof messageContent === "string" ? messageContent : String(messageContent);

        // Salvar mensagens no histórico se o usuário estiver autenticado
        if (userId > 0) {
          try {
            // Extrair tópico da mensagem (primeiras palavras)
            const topic = input.message.substring(0, 100);

            // Salvar mensagem do usuário
            await saveChatMessage({
              userId,
              conversationId,
              role: "user",
              content: input.message,
              topic,
            });

            // Salvar resposta da IA
            await saveChatMessage({
              userId,
              conversationId,
              role: "assistant",
              content: responseText,
              topic,
            });
          } catch (dbError) {
            console.error("Erro ao salvar histórico de chat:", dbError);
            // Não falhar a resposta se o histórico não for salvo
          }
        }

        return {
          message: responseText,
          conversationId,
        };
      } catch (error) {
        console.error("Erro ao chamar LLM:", error);
        throw new Error("Erro ao processar sua mensagem. Tente novamente.");
      }
    }),

  // Endpoint para recuperar histórico de chat
  getHistory: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const messages = await getChatHistory(ctx.user.id, input.conversationId);
        return messages;
      } catch (error) {
        console.error("Erro ao recuperar histórico:", error);
        return [];
      }
    }),

  // Endpoint para listar todas as conversas do usuário
  listConversations: protectedProcedure.query(async ({ ctx }) => {
    try {
      const db = await getDb();
      if (!db) throw new Error("Banco de dados não disponível");

      // Buscar conversas únicas do usuário, ordenadas pela última mensagem
      const conversations = await db
        .selectDistinct({
          conversationId: chatHistory.conversationId,
          topic: chatHistory.topic,
          createdAt: chatHistory.createdAt,
        })
        .from(chatHistory)
        .where(eq(chatHistory.userId, ctx.user.id))
        .orderBy(desc(chatHistory.createdAt))
        .limit(50);

      return conversations;
    } catch (error) {
      console.error("Erro ao listar conversas:", error);
      return [];
    }
  }),

  // Endpoint para gerar imagens
  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
        conversationId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { generateImage } = await import("../_core/imageGeneration");

        // Gerar imagem usando o helper
        const result = await generateImage({
          prompt: input.prompt,
        });

        // Salvar referência da imagem no histórico de chat se conversationId fornecido
        if (input.conversationId && ctx.user?.id) {
          try {
            const topic = input.prompt.substring(0, 100);
            await saveChatMessage({
              userId: ctx.user.id,
              conversationId: input.conversationId,
              role: "assistant",
              content: `[Imagem gerada: ${input.prompt}]\n\n${result.url}`,
              topic,
            });
          } catch (dbError) {
            console.error("Erro ao salvar imagem no histórico:", dbError);
          }
        }

        return {
          url: result.url,
          prompt: input.prompt,
        };
      } catch (error) {
        console.error("Erro ao gerar imagem:", error);
        throw new Error("Erro ao gerar imagem. Tente novamente com uma descrição diferente.");
      }
    }),
});
