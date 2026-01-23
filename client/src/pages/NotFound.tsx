import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Link } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/">
              <a className="text-primary hover:underline transition-colors">Home</a>
            </Link>
            <span>›</span>
            <span className="text-foreground font-semibold">Página não encontrada</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* 404 Animation */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="text-9xl font-bold text-primary opacity-20 mb-2">404</div>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto rounded-full" />
            </div>

            <h1 className="text-5xl font-bold text-foreground mb-4">
              Página não encontrada
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              Desculpe, a página que você está procurando não existe ou foi movida. 
              Mas não se preocupe, você pode voltar ao guia de estudos!
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Search size={20} className="text-primary" />
              Sugestões de navegação:
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/">
                  <a className="text-primary hover:underline">← Voltar para Página Inicial</a>
                </Link>
              </li>
              <li>
                <Link href="/quiz">
                  <a className="text-primary hover:underline">→ Ir para Quiz</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-primary hover:underline">→ Ir para Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/recursos">
                  <a className="text-primary hover:underline">→ Ir para Recursos</a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-primary hover:underline">→ Ir para Contato</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Página Inicial
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Voltar
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-12 text-sm text-muted-foreground">
            <p>Ainda precisa de ajuda? <Link href="/contato"><a className="text-primary hover:underline">Entre em contato</a></Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
