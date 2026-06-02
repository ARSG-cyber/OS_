import React from 'react';
import { cn } from '@utils/index';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ className, children, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      'bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-xl',
      'hover:border-cyber-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-cyan/10',
      onClick && 'cursor-pointer',
      className
    )}
  >
    {children}
  </div>
);

interface GlassmorphicCardProps {
  className?: string;
  children: React.ReactNode;
  gradient?: boolean;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  className,
  children,
  gradient = false,
}) => (
  <div
    className={cn(
      'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl',
      gradient && 'bg-gradient-to-br from-white/10 to-white/5',
      className
    )}
  >
    {children}
  </div>
);

interface BadgeProps {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const variantClasses = {
    default: 'bg-slate-500/20 text-slate-100 border border-slate-500/30',
    success: 'bg-emerald-500/20 text-emerald-100 border border-emerald-500/30',
    error: 'bg-red-500/20 text-red-100 border border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-100 border border-yellow-500/30',
    info: 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30',
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-xs font-medium', variantClasses[variant], className)}>
      {children}
    </span>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyber-cyan to-cyber-indigo text-white hover:shadow-lg hover:shadow-cyber-cyan/50',
    secondary: 'bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {isLoading && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ icon, error, className, ...props }) => (
  <div className="flex flex-col gap-2">
    <div className="relative flex items-center">
      {icon && <span className="absolute left-3 text-slate-400">{icon}</span>}
      <input
        {...props}
        className={cn(
          'w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg',
          'text-slate-100 placeholder-slate-500 transition-colors',
          'focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20',
          icon && 'pl-10',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
      />
    </div>
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);

export const Divider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('border-t border-slate-800', className)} />
);

export const Spacer: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeMap = { sm: 'h-4', md: 'h-8', lg: 'h-16' };
  return <div className={sizeMap[size]} />;
};
