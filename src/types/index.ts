// Global Application Types

export type UserRole = 'admin' | 'user' | 'analyst' | 'viewer';
export type Theme = 'dark' | 'light';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  lastActive: Date;
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface MetricValue {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface KPICard {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon?: string;
}

export interface Timeline {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  category: 'system' | 'user' | 'ai' | 'alert';
  icon?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'training';
  type: 'analyst' | 'monitor' | 'predictor' | 'optimizer';
  performanceScore: number;
  lastRun: Date;
  tasksCompleted: number;
}

export interface InsightCard {
  id: string;
  author: {
    name: string;
    avatar?: string;
    module: string;
    uptime: number;
  };
  type: 'product' | 'tech' | 'analytics' | 'system';
  title: string;
  description: string;
  metrics: MetricValue[];
  engagement: {
    likes: number;
    bookmarks: number;
    comments: number;
  };
  timestamp: number;
  visualType: 'gradient' | 'chart' | 'matrix' | 'spectrum';
  liked: boolean;
  bookmarked: boolean;
}

export interface ProjectNode {
  id: string;
  name: string;
  type: 'core' | 'module' | 'service' | 'interface';
  phase: string;
  progress: number;
  stability: number;
  connections: string[];
  metadata?: Record<string, unknown>;
}

export interface AnalyticsData {
  timestamp: Date;
  value: number;
  category?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  uptime: number;
  statusColor: string;
}

export interface FeatureConfig {
  enabled: boolean;
  settings?: Record<string, unknown>;
}

export interface AppState {
  theme: Theme;
  user: User | null;
  authenticated: boolean;
  sidebarOpen: boolean;
  notifications: Notification[];
}
