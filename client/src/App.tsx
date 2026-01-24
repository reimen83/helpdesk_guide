import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Quiz from "./pages/Quiz";
import DarkModeToggle from "./components/DarkModeToggle";
import SearchCommand from "./components/SearchCommand";
import Footer from "./components/Footer";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/recursos"} component={Resources} />
      <Route path={"/contato"} component={Contact} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/quiz"} component={Quiz} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          
          {/* Modern Navbar */}
          <nav className="sticky top-0 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-200">
            <div className="container flex items-center justify-between h-16 gap-4">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-blue-700 transition-colors flex-shrink-0">
                <span className="text-xl">📚</span>
                <span className="hidden sm:inline">Help Desk</span>
              </a>
              
              {/* Center - Search */}
              <div className="flex-1 max-w-md">
                <SearchCommand />
              </div>
              
              {/* Right - Theme Toggle */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <DarkModeToggle />
              </div>
            </div>
          </nav>
          
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
