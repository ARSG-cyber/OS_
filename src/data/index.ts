// Mock data for development and testing

export const MOCK_PROJECTS = [
  {
    id: 'proj-001',
    name: 'AI Synapse Node',
    phase: 'Beta Optimization',
    version: 4,
    nodes: 8,
    progress: 74,
    stability: 98.4,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'proj-002',
    name: 'DeFi Core Engine',
    phase: 'Alpha Proto-net',
    version: 2,
    nodes: 6,
    progress: 42,
    stability: 89.2,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'proj-003',
    name: 'Web3 Asset Vault',
    phase: 'Global Scaling',
    version: 3,
    nodes: 12,
    progress: 91,
    stability: 99.8,
    createdAt: new Date('2024-03-10'),
  },
];

export const MOCK_AI_AGENTS = [
  {
    id: 'agent-001',
    name: 'Market Analyzer',
    type: 'analyst',
    status: 'active',
    performanceScore: 94,
    tasksCompleted: 1247,
    version: 'v2.1.0',
  },
  {
    id: 'agent-002',
    name: 'System Monitor',
    type: 'monitor',
    status: 'active',
    performanceScore: 98,
    tasksCompleted: 5847,
    version: 'v3.0.1',
  },
  {
    id: 'agent-003',
    name: 'Trend Predictor',
    type: 'predictor',
    status: 'training',
    performanceScore: 87,
    tasksCompleted: 342,
    version: 'v1.5.0',
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: 'notif-001',
    type: 'success',
    title: 'System Online',
    message: 'All systems operational and ready',
    timestamp: new Date(Date.now() - 5 * 60000),
    read: false,
  },
  {
    id: 'notif-002',
    type: 'warning',
    title: 'High Memory Usage',
    message: 'Memory usage is at 78% capacity',
    timestamp: new Date(Date.now() - 15 * 60000),
    read: true,
  },
  {
    id: 'notif-003',
    type: 'info',
    title: 'New Update Available',
    message: 'Version 2.0 is now available',
    timestamp: new Date(Date.now() - 60 * 60000),
    read: false,
  },
];

export const MOCK_TIMELINE = [
  {
    id: 'evt-001',
    title: 'System Initialized',
    description: 'Khan OS Dashboard started successfully',
    timestamp: new Date(Date.now() - 5 * 60000),
    type: 'system',
  },
  {
    id: 'evt-002',
    title: 'AI Agent Training',
    description: 'Agent Analyzer v2.1 completed training cycle',
    timestamp: new Date(Date.now() - 15 * 60000),
    type: 'ai',
  },
  {
    id: 'evt-003',
    title: 'High Traffic Detected',
    description: 'Spike detected in API endpoint traffic',
    timestamp: new Date(Date.now() - 30 * 60000),
    type: 'alert',
  },
];

export const CHART_DATA = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
} as const;

export const API_ENDPOINTS = {
  DASHBOARD: '/api/dashboard',
  AGENTS: '/api/agents',
  ANALYTICS: '/api/analytics',
  PROJECTS: '/api/projects',
  USERS: '/api/users',
} as const;
