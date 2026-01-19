import { Mail, Phone, MapPin } from 'lucide-react';
import ContactFormFormspree from '@/components/ContactFormFormspree';
import FAQSection from '@/components/FAQSection';
import NewsletterSection from '@/components/NewsletterSection';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-muted-foreground">
            Dúvidas? Sugestões? Estamos aqui para ajudar!
          </p>
        </div>

        {/* Newsletter */}
        <NewsletterSection />

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Formulário */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">Envie uma Mensagem</h2>
            <ContactFormFormspree />
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-6">Informações</h2>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">reimen83@hotmail.com</p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex gap-4">
                  <Phone className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-foreground">Telefone</h3>
                    <p className="text-muted-foreground">(11) 3000-0000</p>
                  </div>
                </div>

                {/* Localização */}
                <div className="flex gap-4">
                  <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-foreground">Localização</h3>
                    <p className="text-muted-foreground">São Paulo, Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horário de Atendimento */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-3">Horário de Atendimento</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Segunda a Sexta:</strong> 09:00 - 18:00</p>
                <p><strong>Sábado:</strong> 10:00 - 14:00</p>
                <p><strong>Domingo:</strong> Fechado</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-lg p-8 text-center text-white mt-12">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar sua carreira em Help Desk?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Baixe nosso mini curso completo e comece a se preparar agora mesmo!
          </p>
          <a
            href="/#intro"
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Voltar para o Guia
          </a>
        </div>
      </main>
    </div>
  );
}
