import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Download,
  RefreshCw,
  Zap,
  Info,
  Maximize2,
  Play,
  FileJson,
  FileText,
  Github,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Button, Badge, Input } from '@components/common/Components';
import { cn, generateId, formatDate } from '@utils/index';

interface NodeData {
  id: string;
  name: string;
  type: 'core' | 'module' | 'service' | 'interface';
  phase: string;
  progress: number;
  stability: number;
  connections: string[];
  x?: number;
  y?: number;
}

interface ProjectState {
  id: string;
  name: string;
  phase: string;
  nodes: NodeData[];
  version: number;
  createdAt: Date;
}

const NODE_COLORS = {
  core: '#6366f1',
  module: '#06b6d4',
  service: '#a855f7',
  interface: '#10b981',
};

const NODE_DESCRIPTIONS = {
  core: 'Core Logic Node',
  module: 'Module Component',
  service: 'Service Handler',
  interface: 'User Interface',
};

const InteractiveNodeGraph: React.FC<{ nodes: NodeData[] }> = ({ nodes }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  // Generate SVG connections
  const renderConnections = () => {
    const lines: React.ReactNode[] = [];

    nodes.forEach((node) => {
      node.connections.forEach((connId) => {
        const target = nodes.find((n) => n.id === connId);
        if (target && node.x && node.y && target.x && target.y) {
          lines.push(
            <line
              key={`${node.id}-${connId}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke={NODE_COLORS[node.type]}
              strokeWidth="2"
              opacity="0.3"
              className="transition-opacity duration-300"
              style={{
                opacity: hoveredNode === node.id || hoveredNode === connId ? 0.8 : 0.3,
              }}
            />
          );
        }
      });
    });

    return lines;
  };

  return (
    <div className="w-full h-96 bg-slate-900/30 rounded-lg border border-slate-800 overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        className="cursor-grab active:cursor-grabbing"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grid)" />

        {/* Connections */}
        {renderConnections()}

        {/* Nodes */}
        {nodes.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            {/* Glow effect */}
            <circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill={NODE_COLORS[node.type]}
              opacity="0.2"
              className="transition-opacity duration-300"
              style={{
                opacity: hoveredNode === node.id ? 0.4 : 0.1,
              }}
            />

            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={NODE_COLORS[node.type]}
              opacity="0.9"
              stroke="white"
              strokeWidth="2"
            />

            {/* Label background */}
            {hoveredNode === node.id && (
              <rect
                x={node.x! - 60}
                y={node.y! + 35}
                width="120"
                height="50"
                fill="#111724"
                stroke={NODE_COLORS[node.type]}
                strokeWidth="1"
                rx="4"
              />
            )}

            {/* Tooltip */}
            {hoveredNode === node.id && (
              <>
                <text
                  x={node.x}
                  y={node.y! + 50}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {node.name}
                </text>
                <text
                  x={node.x}
                  y={node.y! + 65}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize="9"
                >
                  {`${node.progress}% • ${node.stability}%`}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

const ProjectEvolution: React.FC = () => {
  const [projects, setProjects] = useState<ProjectState[]>([
    {
      id: generateId('proj'),
      name: 'AI Synapse Node',
      phase: 'Beta Optimization',
      version: 4,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      nodes: [
        {
          id: 'node-1',
          name: 'Core Engine',
          type: 'core',
          phase: 'Optimization',
          progress: 78,
          stability: 98.4,
          connections: ['node-2', 'node-3'],
          x: 150,
          y: 200,
        },
        {
          id: 'node-2',
          name: 'API Gateway',
          type: 'service',
          phase: 'Integration',
          progress: 92,
          stability: 99.1,
          connections: ['node-4'],
          x: 350,
          y: 150,
        },
        {
          id: 'node-3',
          name: 'Database',
          type: 'service',
          phase: 'Optimization',
          progress: 85,
          stability: 99.8,
          connections: ['node-4'],
          x: 350,
          y: 250,
        },
        {
          id: 'node-4',
          name: 'Frontend UI',
          type: 'interface',
          phase: 'Design',
          progress: 65,
          stability: 98.2,
          connections: [],
          x: 550,
          y: 200,
        },
      ],
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExportJSON = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = {
      project: selectedProject,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedProject.name.replace(/\s+/g, '_')}_blueprint.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setIsExporting(false);
    setExportComplete(true);
    setTimeout(() => setExportComplete(false), 2000);
  };

  const NodeCard: React.FC<NodeData> = (node) => {
    const progressColor = node.progress > 80 ? 'text-emerald-400' : 'text-cyber-cyan';
    const stabilityColor = node.stability > 99 ? 'text-emerald-400' : 'text-yellow-400';

    return (
      <Card className="p-4 cursor-pointer hover:bg-slate-800/50">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-sm">{node.name}</h3>
            <p className="text-xs text-slate-500">{NODE_DESCRIPTIONS[node.type]}</p>
          </div>
          <Badge variant="info">{node.type}</Badge>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Progress</span>
              <span className={progressColor}>{node.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-indigo"
                style={{ width: `${node.progress}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Stability</span>
              <span className={stabilityColor}>{node.stability}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${node.stability}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
          Connections: {node.connections.length}
        </p>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Project Evolution</span>
        </h1>
        <p className="text-slate-400">Interactive architecture visualization and management</p>
      </div>

      {/* Project Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <select
            value={selectedProject.id}
            onChange={(e) => {
              const proj = projects.find((p) => p.id === e.target.value);
              if (proj) setSelectedProject(proj);
            }}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:border-cyber-cyan focus:outline-none"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - v{p.version}
              </option>
            ))}
          </select>

          <div className="flex gap-2 ml-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExportJSON}
              isLoading={isExporting}
            >
              <FileJson size={14} /> JSON
            </Button>
            <Button variant="secondary" size="sm">
              <FileText size={14} /> PDF
            </Button>
            <Button variant="secondary" size="sm">
              <Github size={14} /> Markdown
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Graph Visualization */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Architecture Graph</h2>
          <InteractiveNodeGraph nodes={selectedProject.nodes} />
          <p className="text-xs text-slate-500 mt-4">
            Hover over nodes to see details. Connections show data flow between components.
          </p>
        </Card>

        {/* Node Details Grid */}
        <div>
          <h2 className="text-lg font-bold mb-4">Architecture Nodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProject.nodes.map((node) => (
              <NodeCard key={node.id} {...node} />
            ))}
          </div>
        </div>

        {/* Project Info */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4">Project Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-xs text-slate-400 mb-1">Project Name</p>
              <p className="font-semibold">{selectedProject.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Phase</p>
              <p className="font-semibold">{selectedProject.phase}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Version</p>
              <p className="font-semibold">v{selectedProject.version}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Created</p>
              <p className="font-semibold text-sm">{formatDate(selectedProject.createdAt)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectEvolution;
