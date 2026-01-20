import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const searchData: SearchResult[] = [
  // Seções principais
  { id: '1', title: 'Introdução', description: 'Visão geral sobre Help Desk', url: '#intro', category: 'Seção' },
  { id: '2', title: 'Gestão de Atendimento', description: 'ITIL 4 e SLA', url: '#atendimento', category: 'Seção' },
  { id: '3', title: 'Hardware e Periféricos', description: 'Manutenção de computadores', url: '#hardware', category: 'Seção' },
  { id: '4', title: 'Servidores e Redes', description: 'Windows, Linux e TCP/IP', url: '#servidores', category: 'Seção' },
  { id: '5', title: 'Sistemas Senior', description: 'Sapiens, Vetorh, HCM', url: '#sistemas-senior', category: 'Seção' },
  { id: '6', title: 'Backup e Projetos', description: 'Estratégias de backup', url: '#backup', category: 'Seção' },
  { id: '7', title: 'Conclusão', description: 'Próximos passos', url: '#conclusao', category: 'Seção' },

  // Páginas
  { id: '8', title: 'Recursos Gratuitos', description: 'Ferramentas e certificações', url: '/recursos', category: 'Página' },
  { id: '9', title: 'Blog', description: 'Artigos sobre Help Desk', url: '/blog', category: 'Página' },
  { id: '10', title: 'Quiz', description: 'Teste seus conhecimentos', url: '/quiz', category: 'Página' },
  { id: '11', title: 'Contato', description: 'Entre em contato conosco', url: '/contato', category: 'Página' },

  // Conceitos
  { id: '12', title: 'ITIL 4', description: 'Information Technology Infrastructure Library', url: '#atendimento', category: 'Conceito' },
  { id: '13', title: 'SLA', description: 'Service Level Agreement', url: '#atendimento', category: 'Conceito' },
  { id: '14', title: 'Active Directory', description: 'Serviço de diretório Windows', url: '#servidores', category: 'Conceito' },
  { id: '15', title: 'TCP/IP', description: 'Protocolo de comunicação', url: '#servidores', category: 'Conceito' },
  { id: '16', title: 'Backup 3-2-1', description: 'Estratégia de backup', url: '#backup', category: 'Conceito' },
  { id: '17', title: 'ERP', description: 'Enterprise Resource Planning', url: '#sistemas-senior', category: 'Conceito' },
];

export default function SearchCommand() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Abrir com Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
        setSearch('');
        setSelectedIndex(0);
      }

      // Fechar com Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }

      // Navegação com setas
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter' && results.length > 0) {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, search, results, selectedIndex]);

  // Buscar resultados
  useEffect(() => {
    if (!search.trim()) {
      setResults(searchData);
      setSelectedIndex(0);
      return;
    }

    const query = search.toLowerCase();
    const filtered = searchData.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [search]);

  const handleSelect = (result: SearchResult) => {
    setIsOpen(false);
    setSearch('');

    if (result.url.startsWith('#')) {
      const element = document.getElementById(result.url.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = result.url;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm text-gray-600 dark:text-gray-400"
        title="Pressione Ctrl+K para buscar"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Buscar...</span>
        <span className="hidden sm:inline text-xs text-gray-400">Ctrl+K</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Search Box */}
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Search size={20} className="text-gray-400" />
          <input
            autoFocus
            type="text"
            placeholder="Buscar seções, páginas, conceitos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder-gray-400"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              Nenhum resultado encontrado para "{search}"
            </div>
          ) : (
            <ul>
              {results.map((result, index) => (
                <li key={result.id}>
                  <button
                    onClick={() => handleSelect(result)}
                    className={`w-full px-4 py-3 text-left border-b border-gray-100 dark:border-gray-800 transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{result.title}</div>
                        <div className="text-sm text-muted-foreground">{result.description}</div>
                      </div>
                      <span className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded">
                        {result.category}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex justify-between">
          <span>↑↓ Navegar • ↵ Selecionar • ESC Fechar</span>
        </div>
      </div>
    </div>
  );
}
