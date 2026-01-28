import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const loginUrl = getLoginUrl();

  useEffect(() => {
    // Se já estiver autenticado, redireciona para home
    const userInfo = localStorage.getItem("manus-runtime-user-info");
    if (userInfo && userInfo !== "null") {
      setLocation("/");
    }
  }, [setLocation]);

  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Bem-vindo ao Help Desk Guide</CardTitle>
          <CardDescription>
            Faça login para acessar seu perfil e conteúdo personalizado
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Login com Manus OAuth */}
          <Button
            onClick={handleLogin}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Mail className="mr-2 h-5 w-5" />
            Continuar com Email
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-950 text-gray-500">
                ou
              </span>
            </div>
          </div>

          {/* Info sobre OAuth */}
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Nota:</strong> Atualmente, o login é feito através de email. 
              Integração com Google, GitHub e LinkedIn em breve!
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 dark:text-green-300 text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium">Acesso ao conteúdo completo</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Cursos, artigos e recursos exclusivos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 dark:text-green-300 text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium">Perfil personalizado</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Acompanhe seu progresso nos cursos
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 dark:text-green-300 text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium">Comunidade ativa</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Conecte-se com outros profissionais
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
