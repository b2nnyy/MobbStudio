import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  external?: boolean;
  className?: string;
  'aria-label'?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  external = false,
  className = '',
  'aria-label': ariaLabel,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary-accent';
  
  const variants = {
    primary:
      'bg-primary-accent text-white hover:bg-primary-accent/90 focus:ring-primary-accent',
    secondary:
      'bg-background-secondary text-primary border border-primary/20 hover:border-primary/40 focus:ring-primary',
    outline:
      'border-2 border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white focus:ring-primary-accent',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

