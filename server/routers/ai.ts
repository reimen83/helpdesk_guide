import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

export const aiRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "Mensagem não pode estar vazia"),
        context: z.string().optional().default("general"),
      })
    )
    .mutation(async ({ input }) => {
      const systemPrompt = `Você é um assistente IA inteligente e versátil. Você pode ajudar com qualquer assunto, responder perguntas, fornecer informações, dar conselhos, resolver problemas e muito mais.

Você é:
- Conhecedor em múltiplos domínios (tecnologia, negócios, educação, saúde, criatividade, etc.)
- Sempre útil, honesto e respeitoso
- Capaz de adaptar seu tom e estilo de comunicação conforme necessário
- Pronto para ajudar com qualquer pergunta ou tarefa

Responda de forma clara, concisa e útil. Sempre que possível, forneça exemplos práticos e informações relevantes.`;

      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: input.message,
            },
          ],
        });

        const messageContent = response.choices[0]?.message?.content;

        if (!messageContent) {
          throw new Error("Nenhuma resposta recebida da IA");
        }

        return {
          message: typeof messageContent === "string" ? messageContent : String(messageContent),
        };
      } catch (error) {
        console.error("Erro ao chamar LLM:", error);
        throw new Error("Erro ao processar sua mensagem. Tente novamente.");
      }
    }),
});
