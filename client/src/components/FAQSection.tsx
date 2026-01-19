import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Qual é o pré-requisito para trabalhar em Help Desk?',
    answer: 'Não há pré-requisitos formais, mas é recomendado ter conhecimentos básicos de informática, Windows e redes. Este guia cobre tudo que você precisa saber para começar. Certificações como CompTIA A+ são um diferencial.'
  },
  {
    id: 'faq-2',
    question: 'Quanto tempo leva para aprender Help Desk?',
    answer: 'Com dedicação, você pode aprender o básico em 2-4 semanas estudando este guia. Porém, a experiência prática é fundamental. Recomendamos 3-6 meses de prática em ambiente real para se tornar proficiente.'
  },
  {
    id: 'faq-3',
    question: 'Qual é o salário médio de um técnico de Help Desk?',
    answer: 'No Brasil, o salário inicial varia de R$ 1.500 a R$ 2.500 dependendo da região e experiência. Com experiência (2+ anos), pode chegar a R$ 3.500+. Profissionais com certificações ganham mais.'
  },
  {
    id: 'faq-4',
    question: 'Preciso saber programar para trabalhar em Help Desk?',
    answer: 'Não é obrigatório, mas conhecimentos básicos de PowerShell (Windows) ou Bash (Linux) são muito úteis. Este guia cobre os comandos essenciais que você precisará.'
  },
  {
    id: 'faq-5',
    question: 'Qual é a diferença entre Help Desk e Service Desk?',
    answer: 'Help Desk é o primeiro nível de suporte (N1), focado em resolver problemas simples. Service Desk é um conceito mais amplo que inclui gestão de incidentes, requisições e problemas. Service Desk é mais estratégico.'
  },
  {
    id: 'faq-6',
    question: 'Como faço para melhorar meu atendimento ao cliente?',
    answer: 'Pratique escuta ativa, seja empático, explique em linguagem simples (sem jargão técnico), documente tudo e sempre confirme se o problema foi resolvido. Este guia tem uma seção sobre soft skills.'
  },
  {
    id: 'faq-7',
    question: 'Quais certificações são importantes para Help Desk?',
    answer: 'As principais são: CompTIA A+ (hardware/software), CompTIA Security+ (segurança), ITIL Foundation (gestão de serviços) e Microsoft Certified (Windows). Comece com A+ ou ITIL Foundation.'
  },
  {
    id: 'faq-8',
    question: 'Como posso usar este guia para estudar?',
    answer: 'Leia cada módulo com atenção, pratique os comandos Linux em uma máquina virtual, baixe o mini curso em PDF para estudar offline, e responda as perguntas do FAQ para testar seu conhecimento.'
  },
  {
    id: 'faq-9',
    question: 'Posso trabalhar em Help Desk remotamente?',
    answer: 'Sim! Muitas empresas oferecem suporte remoto. Você precisará de um computador com boa conexão à internet, software de acesso remoto e comunicação clara. O trabalho remoto é cada vez mais comum.'
  },
  {
    id: 'faq-10',
    question: 'Qual é o próximo passo após Help Desk?',
    answer: 'Você pode evoluir para: Técnico de Suporte Especializado (N2/N3), Administrador de Sistemas, Analista de Infraestrutura, ou Gerente de TI. Cada caminho requer especialização e certificações adicionais.'
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-green-50 py-12 px-4 rounded-lg border border-blue-200 my-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <HelpCircle className="text-primary" size={32} />
          <h3 className="text-3xl font-bold text-primary">Perguntas Frequentes</h3>
        </div>

        <p className="text-center text-foreground mb-8 text-lg">
          Dúvidas comuns sobre Help Desk, certificações e carreira
        </p>

        <div className="space-y-3">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform ${
                    openId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === item.id && (
                <div className="px-6 py-4 border-t border-border bg-gray-50">
                  <p className="text-foreground leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>💡 Não encontrou sua resposta?</strong> Use o formulário de contato abaixo para enviar sua pergunta!
          </p>
        </div>
      </div>
    </section>
  );
}
