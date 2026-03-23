import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  className,
  variant = 'secondary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-border',
    outline: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground border-border',
    ghost: 'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground border-transparent',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg border font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}