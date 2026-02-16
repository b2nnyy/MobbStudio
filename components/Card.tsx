import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div
      className={`bg-background-secondary border border-primary/10 rounded-lg p-6 md:p-8 hover:border-primary/20 transition-colors duration-200 ${className}`}
    >
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-primary">{title}</h3>
      )}
      {children}
    </div>
  );
}


