import React from 'react';
import { Menu, X, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '@context/hooks';
import { cn } from '@utils/index';

interface HeaderProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, onSidebarToggle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={cn(
      'fixed top-0 right-0 left-0 z-40 bg-dark-900/80 backdrop-blur-xl border-b border-slate-800',
      'md:left-64 transition-all duration-300'
    )}>
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <button
          onClick={onSidebarToggle}
          className="md:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-cyan rounded-full" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple" />
            <span className="text-sm font-medium hidden sm:inline">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

interface SidebarProps {
  isOpen: boolean;
  items: Array<{
    label: string;
    icon: React.ReactNode;
    href: string;
    badge?: number;
    active?: boolean;
  }>;
  onNavigate?: (href: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, items, onNavigate }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => onNavigate?.('')}
        />
      )}

      <aside className={cn(
        'fixed left-0 top-0 bottom-0 w-64 bg-dark-900/95 backdrop-blur-xl border-r border-slate-800',
        'z-40 transition-transform duration-300 pt-16 overflow-y-auto',
        !isOpen && '-translate-x-full md:translate-x-0'
      )}>
        <div className="p-6 flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-indigo flex items-center justify-center">
              <span className="text-white font-bold text-sm">OS</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
              Khan OS
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate?.(item.href)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group',
                  item.active
                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 text-xs bg-cyber-cyan/20 text-cyber-cyan rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn(
      'bg-dark-900/50 border-t border-slate-800 py-6 px-4 text-center text-sm text-slate-400',
      className
    )}>
      <p>© 2026 Khan Productions OS. All rights reserved.</p>
      <p className="text-xs mt-2">Enterprise-Grade AI Operating System • v1.0.0</p>
    </footer>
  );
};

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin">
      <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-cyber-cyan" />
    </div>
  </div>
);

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-12 bg-slate-800/50 rounded-lg animate-pulse"
      />
    ))}
  </div>
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-96 gap-4">
            <div className="text-red-400 text-2xl font-bold">⚠️ Error</div>
            <p className="text-slate-400 text-center max-w-md">
              Something went wrong. Please refresh the page or contact support.
            </p>
            {this.state.error && (
              <p className="text-xs text-slate-500">{this.state.error.message}</p>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}
