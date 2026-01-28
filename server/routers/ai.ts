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
      const systemPrompt = `Você é um assistente especializado em Help Desk e Suporte Técnico. 
Você tem conhecimento profundo sobre:
- Atendimento ao cliente
- Gestão de SLA (Service Level Agreement)
- Troubleshooting de hardware e software
- Boas práticas de Help Desk
- Ferramentas de ticketing
- Comunicação profissional

Responda de forma clara, concisa e profissional. Sempre cite exemplos práticos quando possível.
Se a pergunta não for relacionada a Help Desk, redirecione gentilmente para o tópico.`;

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
