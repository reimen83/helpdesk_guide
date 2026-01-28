import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, Mail, User } from "lucide-react";
import { useLocation } from "wouter";

export default function Profile() {
  const { user, loading, logout, isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true,
    redirectPath: "/login",
  });
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setLocation("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie suas informações e preferências
          </p>
        </div>

        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Seus dados de perfil no Help Desk Guide
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nome
                </label>
                <p className="mt-1 text-base text-gray-900 dark:text-gray-100">
                  {user.name || "Não informado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <p className="mt-1 text-base text-gray-900 dark:text-gray-100">
                  {user.email || "Não informado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Método de Login
                </label>
                <p className="mt-1 text-base text-gray-900 dark:text-gray-100 capitalize">
                  {user.loginMethod || "Não informado"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Membro desde
                </label>
                <p className="mt-1 text-base text-gray-900 dark:text-gray-100">
                  {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <Card>
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
            <CardDescription>
              Acompanhe seu desempenho nos cursos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cursos Iniciados</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">0</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Concluídos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Certificados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferências */}
        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>
              Customize sua experiência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receba atualizações sobre novos cursos
                </p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Newsletter</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Inscreva-se em nossa newsletter
                </p>
              </div>
              <input type="checkbox" defaultChecked className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <div className="flex gap-3">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
            size="lg"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
