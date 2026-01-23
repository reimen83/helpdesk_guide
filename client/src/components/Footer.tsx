import { Link } from 'wouter';
import { Mail, Github, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Help Desk Guide</h3>
            <p className="text-sm text-gray-400 mb-4">
              Guia completo de preparação profissional para Help Desk e Suporte Técnico.
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} Help Desk Guide. Todos os direitos reservados.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Página Inicial
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/quiz">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Quiz
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/recursos">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Recursos
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contato">
                  <a className="text-gray-400 hover:text-white transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/reimen83/helpdesk-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:reimen83@hotmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a
                  href="mailto:reimen83@hotmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  reimen83@hotmail.com
                </a>
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href="https://github.com/reimen83"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p className="flex items-center gap-2 mb-4 md:mb-0">
              Desenvolvido com <Heart size={16} className="text-red-500" /> para profissionais de TI
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
