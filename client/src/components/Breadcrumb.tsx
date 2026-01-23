import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3">
      <div className="container">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
              {index === items.length - 1 ? (
                <span className="text-foreground font-semibold">{item.label}</span>
              ) : (
                <Link href={item.href}>
                  <a className="text-primary hover:underline transition-colors">
                    {item.label}
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
