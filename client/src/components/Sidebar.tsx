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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto transition-transform duration-300 z-40 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 md:pt-6">
          <h2 className="text-2xl font-bold text-primary mb-8">Índice</h2>

          <nav className="space-y-2">
            {sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => {
                    onSectionClick(section.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                      : 'text-sidebar-foreground hover:bg-muted'
                  }`}
                >
                  {section.title}
                </button>

                {section.subsections && activeSection === section.id && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary pl-4">
                    {section.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onSectionClick(sub.id);
                          setIsOpen(false);
                        }}
                        className="w-full text-left text-sm px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
