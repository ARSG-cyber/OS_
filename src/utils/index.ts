import clsx from 'clsx';

export const cn = (...classes: (string | undefined | null | false)[]) => {
  return clsx(classes);
};

export const formatNumber = (num: number, decimals = 2): string => {
  return num.toFixed(decimals);
};

export const formatCurrency = (num: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(d);
};

export const truncateText = (text: string, length = 100): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const generateId = (prefix = ''): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const calculatePercentage = (value: number, total: number): number => {
  return total === 0 ? 0 : Math.round((value / total) * 100);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getColorByTrend = (trend: 'up' | 'down' | 'stable'): string => {
  switch (trend) {
    case 'up':
      return 'text-emerald-400';
    case 'down':
      return 'text-red-400';
    case 'stable':
      return 'text-cyber-cyan';
    default:
      return 'text-slate-400';
  }
};

export const getBackgroundByStatus = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/10 border-emerald-500/30';
    case 'idle':
      return 'bg-slate-500/10 border-slate-500/30';
    case 'error':
      return 'bg-red-500/10 border-red-500/30';
    case 'training':
      return 'bg-cyber-cyan/10 border-cyber-cyan/30';
    default:
      return 'bg-slate-500/10 border-slate-500/30';
  }
};

export const rgbaToString = (r: number, g: number, b: number, a = 1): string => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
