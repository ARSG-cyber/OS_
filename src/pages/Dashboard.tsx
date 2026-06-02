import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Activity,
  Zap,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, Badge, Button } from '@components/common/Components';
import { cn, formatNumber, formatCurrency } from '@utils/index';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  change,
  trend,
  icon,
}) => {
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-cyber-cyan';
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <div className="p-2 bg-cyber-cyan/10 rounded-lg text-cyber-cyan">{icon}</div>
      </div>
      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold">{value}</div>
        {unit && <span className="text-slate-400 mb-1">{unit}</span>}
      </div>
      <div className={cn('flex items-center gap-1 text-sm font-medium', trendColor)}>
        <TrendIcon size={16} />
        <span>{Math.abs(change)}%</span>
      </div>
    </Card>
  );
};

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'system' | 'user' | 'ai' | 'alert';
  icon: React.ReactNode;
}

const ActivityTimeline: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  const typeColors = {
    system: 'bg-cyber-indigo/10 border-cyber-indigo/30 text-cyber-indigo',
    user: 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan',
    ai: 'bg-cyber-purple/10 border-cyber-purple/30 text-cyber-purple',
    alert: 'bg-red-500/10 border-red-500/30 text-red-500',
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-6">Activity Timeline</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-800 last:border-0">
            <div className={cn('p-2 rounded-lg border h-fit', typeColors[item.type])}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{item.description}</p>
              <time className="text-xs text-slate-500 mt-2 block">
                {item.timestamp.toLocaleTimeString()}
              </time>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const AIRecommendationsPanel: React.FC = () => {
  const recommendations = [
    {
      id: '1',
      title: 'Optimize Database Queries',
      description: 'AI detected 3 slow queries in production',
      severity: 'warning',
      action: 'Review',
    },
    {
      id: '2',
      title: 'Scale API Instances',
      description: 'Traffic forecast suggests scaling needed',
      severity: 'info',
      action: 'Scale',
    },
    {
      id: '3',
      title: 'Security Patch Available',
      description: 'Critical update for Express.js framework',
      severity: 'alert',
      action: 'Update',
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-6">AI Recommendations</h2>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="flex items-start justify-between gap-4 p-3 bg-slate-800/30 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-sm">{rec.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{rec.description}</p>
            </div>
            <Button variant="ghost" size="sm">
              {rec.action}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

const SystemHealthMonitor: React.FC = () => {
  const metrics = [
    { label: 'CPU Usage', value: 34, unit: '%', status: 'healthy' },
    { label: 'Memory', value: 62, unit: '%', status: 'healthy' },
    { label: 'Storage', value: 78, unit: '%', status: 'warning' },
    { label: 'Network', value: 12, unit: 'Gbps', status: 'healthy' },
  ];

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-6">System Health</h2>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{metric.label}</span>
              <span className="text-sm text-slate-400">
                {metric.value}
                {metric.unit}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={cn('h-full transition-all duration-300', getHealthColor(metric.status))}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: '1',
      title: 'System Initialized',
      description: 'Khan OS Dashboard started successfully',
      timestamp: new Date(Date.now() - 5 * 60000),
      type: 'system',
      icon: <CheckCircle size={16} />,
    },
    {
      id: '2',
      title: 'AI Agent Training Completed',
      description: 'Agent Analyzer v2.1 completed training cycle',
      timestamp: new Date(Date.now() - 15 * 60000),
      type: 'ai',
      icon: <Zap size={16} />,
    },
    {
      id: '3',
      title: 'High Traffic Alert',
      description: 'Spike detected in API endpoint traffic',
      timestamp: new Date(Date.now() - 30 * 60000),
      type: 'alert',
      icon: <AlertCircle size={16} />,
    },
    {
      id: '4',
      title: 'User Action',
      description: 'Project Evolution snapshot created',
      timestamp: new Date(Date.now() - 60 * 60000),
      type: 'user',
      icon: <Activity size={16} />,
    },
  ]);

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Executive Dashboard</span>
        </h1>
        <p className="text-slate-400">Real-time metrics and system insights</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value="$124.8"
          unit="K"
          change={12.5}
          trend="up"
          icon={<TrendingUp size={20} />}
        />
        <KPICard
          title="Active Users"
          value="2,847"
          change={8.3}
          trend="up"
          icon={<Users size={20} />}
        />
        <KPICard
          title="System Uptime"
          value="99.98"
          unit="%"
          change={0.02}
          trend="stable"
          icon={<Activity size={20} />}
        />
        <KPICard
          title="AI Operations"
          value="847"
          change={24.1}
          trend="up"
          icon={<Zap size={20} />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ActivityTimeline items={timelineItems} />
          <AIRecommendationsPanel />
        </div>
        <div>
          <SystemHealthMonitor />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
