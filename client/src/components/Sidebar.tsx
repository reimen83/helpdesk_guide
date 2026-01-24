import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface SidebarProps {
  sections: Array<{
    id: string;
    title: string;
    subsections?: Array<{
      id: string;
      title: string;
    }>;
  }>;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export default function Sidebar({ sections, activeSection, onSectionClick }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Modern Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3 left-4 z-50 md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Menu"
      >
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <Menu size={24} className="text-foreground" />
        )}
      </button>

      {/* Overlay - Elegant Fade */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer - Modern Slide */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-background border-r border-border shadow-lg overflow-y-auto transition-transform duration-300 ease-out z-40 md:relative md:translate-x-0 md:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 md:pt-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground">Índice</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mt-2" />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {/* Quick Links */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navegação</p>
              <div className="space-y-1">
                <a
                  href="/contato"
                  className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  📧 Contato & FAQ
                </a>
                <a
                  href="/recursos"
                  className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  🎯 Recursos
                </a>
                <a
                  href="/quiz"
                  className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  ✅ Quiz
                </a>
                <a
                  href="/blog"
                  className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  📚 Blog
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border my-4" />

            {/* Sections */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Conteúdo</p>
            <div className="space-y-1">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary border-l-2 border-primary pl-2.5'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {section.title}
                  </button>

                  {/* Subsections */}
                  {section.subsections && activeSection === section.id && (
                    <div className="ml-2 mt-1 space-y-0.5 border-l border-border/50 pl-3">
                      {section.subsections.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSectionClick(sub.id)}
                          className="w-full text-left text-xs px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted/50"
                        >
                          {sub.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
