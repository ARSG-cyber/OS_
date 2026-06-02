import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Settings as SettingsIcon,
  Play,
  Pause,
  Trash2,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Badge, Button, Input } from '@components/common/Components';
import { cn, generateId, formatRelativeTime } from '@utils/index';

interface AIAgent {
  id: string;
  name: string;
  type: 'analyst' | 'monitor' | 'predictor' | 'optimizer';
  status: 'active' | 'idle' | 'error' | 'training';
  performanceScore: number;
  tasksCompleted: number;
  lastRun: Date;
  version: string;
}

const TYPE_ICONS = {
  analyst: '📊',
  monitor: '👁️',
  predictor: '🔮',
  optimizer: '⚙️',
};

const TYPE_NAMES = {
  analyst: 'Data Analyst',
  monitor: 'System Monitor',
  predictor: 'Trend Predictor',
  optimizer: 'Performance Optimizer',
};

const STATUS_COLORS = {
  active: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  idle: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
  error: 'bg-red-500/10 border-red-500/30 text-red-400',
  training: 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan',
};

const AgentCard: React.FC<{ agent: AIAgent; onAction?: (action: string) => void }> = ({
  agent,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{TYPE_ICONS[agent.type]}</span>
            <div>
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <p className="text-sm text-slate-400">{TYPE_NAMES[agent.type]}</p>
            </div>
          </div>
          <Badge
            variant={
              agent.status === 'active'
                ? 'success'
                : agent.status === 'error'
                  ? 'error'
                  : agent.status === 'training'
                    ? 'info'
                    : 'default'
            }
            className="capitalize"
          >
            {agent.status}
          </Badge>
        </div>

        <div className="space-y-4 mb-6">
          {/* Performance Score */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Performance</span>
              <span className="font-semibold text-cyber-cyan">{agent.performanceScore}%</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-indigo"
                style={{ width: `${agent.performanceScore}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
            <div>
              <p className="text-xs text-slate-500">Tasks</p>
              <p className="font-bold text-lg">{agent.tasksCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Version</p>
              <p className="font-bold">{agent.version}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Last Run</p>
              <p className="text-xs font-mono">{formatRelativeTime(agent.lastRun)}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant={agent.status === 'active' ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => onAction?.(agent.status === 'active' ? 'pause' : 'play')}
            className="flex-1"
          >
            {agent.status === 'active' ? (
              <>
                <Pause size={14} /> Stop
              </>
            ) : (
              <>
                <Play size={14} /> Start
              </>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <SettingsIcon size={14} /> Config
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

const AIControlCenter: React.FC = () => {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: generateId('agent'),
      name: 'Market Analyzer',
      type: 'analyst',
      status: 'active',
      performanceScore: 94,
      tasksCompleted: 1247,
      lastRun: new Date(Date.now() - 5 * 60000),
      version: 'v2.1.0',
    },
    {
      id: generateId('agent'),
      name: 'System Monitor',
      type: 'monitor',
      status: 'active',
      performanceScore: 98,
      tasksCompleted: 5847,
      lastRun: new Date(Date.now() - 1 * 60000),
      version: 'v3.0.1',
    },
    {
      id: generateId('agent'),
      name: 'Trend Predictor',
      type: 'predictor',
      status: 'training',
      performanceScore: 87,
      tasksCompleted: 342,
      lastRun: new Date(Date.now() - 30 * 60000),
      version: 'v1.5.0',
    },
    {
      id: generateId('agent'),
      name: 'Performance Tuner',
      type: 'optimizer',
      status: 'idle',
      performanceScore: 91,
      tasksCompleted: 623,
      lastRun: new Date(Date.now() - 2 * 60000),
      version: 'v2.0.0',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'agents' | 'logs' | 'workflows'>('agents');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const activeAgentsCount = agents.filter((a) => a.status === 'active').length;
  const totalPerformance = Math.round(
    agents.reduce((acc, agent) => acc + agent.performanceScore, 0) / agents.length
  );

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">AI Control Center</span>
        </h1>
        <p className="text-slate-400">Manage and monitor your AI agents</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-sm text-slate-400 mb-2">Active Agents</p>
          <p className="text-3xl font-bold">{activeAgentsCount}</p>
          <p className="text-xs text-slate-500 mt-2">of {agents.length} total</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-400 mb-2">Avg Performance</p>
          <p className="text-3xl font-bold text-cyber-cyan">{totalPerformance}%</p>
          <p className="text-xs text-slate-500 mt-2">System average</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-400 mb-2">Total Tasks</p>
          <p className="text-3xl font-bold">
            {agents.reduce((acc, a) => acc + a.tasksCompleted, 0).toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-2">All time</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-slate-400 mb-2">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <p className="font-bold">Healthy</p>
          </div>
          <p className="text-xs text-slate-500 mt-2">All systems operational</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-slate-800">
        {['agents', 'logs', 'workflows'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={cn(
              'px-4 py-2 border-b-2 transition-all',
              activeTab === tab
                ? 'border-cyber-cyan text-cyber-cyan'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'agents' && (
        <div>
          <div className="mb-6 flex justify-end">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="flex gap-2"
            >
              <Plus size={18} /> New Agent
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onAction={(action) => {
                  console.log(`Agent ${agent.name}: ${action}`);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Activity Logs</h2>
          <div className="space-y-4">
            {[
              {
                time: '2 minutes ago',
                agent: 'Market Analyzer',
                event: 'Completed trend analysis',
                type: 'success',
              },
              {
                time: '5 minutes ago',
                agent: 'System Monitor',
                event: 'Memory usage spike detected',
                type: 'warning',
              },
              {
                time: '15 minutes ago',
                agent: 'Trend Predictor',
                event: 'Training iteration 1247 completed',
                type: 'info',
              },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-0">
                <div className={cn(
                  'p-2 rounded-lg mt-1',
                  log.type === 'success' && 'bg-emerald-500/10 text-emerald-400',
                  log.type === 'warning' && 'bg-yellow-500/10 text-yellow-400',
                  log.type === 'info' && 'bg-cyber-cyan/10 text-cyber-cyan'
                )}>
                  {log.type === 'success' && <CheckCircle size={16} />}
                  {log.type === 'warning' && <AlertCircle size={16} />}
                  {log.type === 'info' && <Clock size={16} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{log.agent}</p>
                  <p className="text-sm text-slate-400">{log.event}</p>
                  <p className="text-xs text-slate-500 mt-1">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'workflows' && (
        <Card className="p-12 text-center">
          <Cpu className="w-12 h-12 mx-auto mb-4 text-slate-500 opacity-50" />
          <p className="text-slate-400">Workflow builder coming soon</p>
          <p className="text-sm text-slate-500 mt-2">Design automated AI workflows with our visual builder</p>
        </Card>
      )}
    </div>
  );
};

export default AIControlCenter;
