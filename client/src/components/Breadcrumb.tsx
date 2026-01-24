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
    <nav className="sticky top-0 z-30 bg-background/80 dark:bg-background/80 backdrop-blur-sm border-b border-border/50 py-2.5 transition-all duration-200">
      <div className="container">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={14} className="text-border opacity-60" />}
              {index === items.length - 1 ? (
                <span className="text-foreground font-medium truncate">{item.label}</span>
              ) : (
                <Link href={item.href}>
                  <a className="text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors truncate hover:underline">
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
