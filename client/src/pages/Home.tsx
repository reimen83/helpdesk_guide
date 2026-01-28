import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, BookOpen, Code, Users } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Guia Completo de Help Desk
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Aprenda tudo sobre atendimento de chamados, gestão de SLA, manutenção de hardware e muito mais.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {isAuthenticated ? (
              <>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setLocation("/courses")}
                >
                  Acessar Cursos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setLocation("/profile")}
                >
                  Meu Perfil
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => (window.location.href = getLoginUrl())}
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setLocation("/blog")}
                >
                  Explorar Blog
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher Help Desk Guide?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Cursos Completos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conteúdo estruturado e atualizado sobre Help Desk, SLA, Hardware e Infraestrutura.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>IA Generativa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Pesquisas rápidas e respostas inteligentes sem sair da plataforma.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Comunidade Ativa</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conecte-se com profissionais de Help Desk e compartilhe experiências.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl font-bold">Pronto para começar sua jornada?</h2>
            <p className="text-lg opacity-90">
              Junte-se a milhares de profissionais que já estão aprendendo com Help Desk Guide.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Criar Conta Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
