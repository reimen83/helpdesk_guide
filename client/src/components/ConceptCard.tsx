import { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  children: ReactNode;
  type?: 'concept' | 'tip' | 'warning';
  icon?: ReactNode;
}

export default function ConceptCard({
  title,
  children,
  type = 'concept',
  icon,
}: ConceptCardProps) {
  const baseStyles = 'rounded-lg p-6 border-l-4 transition-all hover:shadow-md';

  const typeStyles = {
    concept: 'bg-blue-50 border-l-primary text-foreground',
    tip: 'bg-green-50 border-l-accent text-foreground',
    warning: 'bg-orange-50 border-l-orange-500 text-foreground',
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <div className="flex items-start gap-3 mb-3">
        {icon && <div className="mt-1">{icon}</div>}
        {type === 'tip' && !icon && <Lightbulb className="text-accent mt-1" size={20} />}
        <h4 className="font-semibold text-lg">{title}</h4>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
