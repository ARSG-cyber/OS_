import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Sliders,
  Cpu,
  Layers,
  Activity,
  FileDown,
  Info,
  Maximize2,
  RefreshCw,
  Workflow,
  Globe,
  Gauge,
  Flame,
  Check,
  Plus,
  Play
} from 'lucide-react';

// Predefined Project Presets
const PROJECT_PRESETS = [
  {
    name: "AI Synapse Node",
    phase: "Beta Optimization",
    nodes: 8,
    progress: 74,
    stability: 98.4,
    mesh: "14.2 Gb/s"
  },
  {
    name: "DeFi Core Engine",
    phase: "Alpha Proto-net",
    nodes: 6,
    progress: 42,
    stability: 89.2,
    mesh: "8.6 Gb/s"
  },
  {
    name: "Web3 Asset Vault",
    phase: "Global Scaling",
    nodes: 12,
    progress: 91,
    stability: 99.8,
    mesh: "24.8 Gb/s"
  }
];

type BranchKey = 'core' | 'automation' | 'assets' | 'frontend';

interface BranchDetails {
  title: string;
  desc: string;
  color: string;
  metric: string;
}

const BRANCHES: Record<BranchKey, BranchDetails> = {
  core: {
    title: "Core Logic Node",
    desc: "Virtual VM compiling structures and safety boundaries",
    color: "#6366f1", // Indigo
    metric: "Health: 99.2%"
  },
  automation: {
    title: "Automation Engine",
    desc: "Background pipeline triggers and async workflows",
    color: "#06b6d4", // Cyan
    metric: "Latency: 8ms"
  },
  assets: {
    title: "Brand Asset Vault",
    desc: "Holographic vector arrays and design token pools",
    color: "#a855f7", // Purple
    metric: "Capacity: 14TB"
  },
  frontend: {
    title: "Frontend Architecture",
    desc: "Luxury CSS grids and high-framerate dynamic DOM grids",
    color: "#10b981", // Emerald
    metric: "Framerate: 120fps"
  }
};

const ProjectEvolution: React.FC = () => {
  // Active Project State
  const [projectName, setProjectName] = useState<string>("AI Synapse Node");
  const [projectPhase, setProjectPhase] = useState<string>("Beta Optimization");
  const [activeNodesCount, setActiveNodesCount] = useState<number>(8);
  const [progressPercent, setProgressPercent] = useState<number>(74);

  
  useEffect(() => {
  document.title = "Project Evolution Space | Khan Productions";
  return () => { document.title = "Khan Productions"; };
}, []);
  const [selectedBranch, setSelectedBranch] = useState<BranchKey>('core');
  
  // Interactive HUD States
  const [isEvolving, setIsEvolving] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportComplete, setExportComplete] = useState<boolean>(false);
  
  // Live Telemetry logs
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "[SYSTEM] Initialize ProjectEvolution Engine v4.2.1...",
    "[SYSTEM] Calibrating 3D Orbital particle nodes...",
    "[SYSTEM] Ready. Select branch or trigger evolution."
  ]);

  const telemetryEndRef = useRef<HTMLDivElement>(null);

  // Presets selector
  const handleLoadPreset = (index: number) => {
    const preset = PROJECT_PRESETS[index];
    setProjectName(preset.name);
    setProjectPhase(preset.phase);
    setActiveNodesCount(preset.nodes);
    setProgressPercent(preset.progress);

    addLog(`[PRESET] Loaded preset template: '${preset.name}'`);
    addLog(`[SYSTEM] Nodes count adjusted to ${preset.nodes}. Progress aligned to ${preset.progress}%.`);
  };

  // Log injector
  const addLog = (message: string) => {
    const timestamp = new Date().toTimeString().split(' ')[0];
    setTelemetryLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // Autoscroll logs
  useEffect(() => {
    if (telemetryEndRef.current) {
      telemetryEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [telemetryLogs]);

  // Evolve Architecture Button
  const handleEvolve = () => {
    if (isEvolving) return;
    setIsEvolving(true);
    addLog(`[EVOLUTION] Initializing DNA reconfiguration sequence for '${projectName}'...`);
    addLog(`[COMPILER] Recalculating orbital vectors for ${activeNodesCount} active nodes...`);
    
    // Simulate evolution phases
    setTimeout(() => {
      addLog(`[EVOLUTION] Restructuring concentric layers...`);
    }, 400);

    setTimeout(() => {
      addLog(`[EVOLUTION] Mounting active interfaces at Phase: [${projectPhase}]`);
    }, 800);

    setTimeout(() => {
      setIsEvolving(false);
      addLog(`[SUCCESS] Evolution pipeline finalized. Stability: ${(94 + Math.random() * 5).toFixed(1)}%.`);
    }, 1200);
  };

  // Export JSON Map Blueprint
  const handleExportBlueprint = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportComplete(false);
    addLog(`[EXPORTER] Preparing vector roadmap roadmap JSON buffer...`);

    setTimeout(() => {
      // Create JSON data
      const data = {
        platform: "Khan Productions Ecosystem",
        projectName,
        projectPhase,
        activeNodes: activeNodesCount,
        progress: progressPercent,
        currentBranch: selectedBranch,
        branchState: BRANCHES[selectedBranch],
        telemetryLogsHistory: telemetryLogs,
        generatedTimestamp: new Date().toISOString()
      };

      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      element.href = URL.createObjectURL(file);
      element.download = `${projectName.toLowerCase().replace(/\s+/g, '_')}_blueprint.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setIsExporting(false);
      setExportComplete(true);
      addLog(`[EXPORTER] Saved blueprint: '${projectName}_blueprint.json'`);
      setTimeout(() => setExportComplete(false), 2000);
    }, 1500);
  };

  // Form Submission
  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`[SYSTEM] Registered custom parameter updates. Structural maps evolved.`);
  };

  return (
    <div className="khan-evolution-container min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col items-center justify-start p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      
      {/* Absolute Dynamic CSS Animations Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .khan-evolution-container {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 10% 90%, rgba(6, 182, 212, 0.03) 0%, transparent 40%),
            linear-gradient(rgba(255, 255, 255, 0.002) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.002) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 32px 32px, 32px 32px;
        }

        .cyber-card {
          background: rgba(17, 17, 24, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid #2a2a3a;
          box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.5);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .cyber-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 10px 40px 0 rgba(99, 102, 241, 0.04);
        }

        .glow-cyan-btn {
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glow-cyan-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 25px rgba(6, 182, 212, 0.5);
        }

        /* 3D Orb Spins */
        @keyframes spinOuter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-outer {
          animation: spinOuter 20s linear infinite;
        }

        @keyframes spinMiddle {
          0% { transform: rotate(360deg) rotateX(45deg); }
          100% { transform: rotate(0deg) rotateX(45deg); }
        }
        .animate-spin-middle {
          animation: spinMiddle 14s linear infinite;
        }

        @keyframes spinInner {
          0% { transform: rotate(0deg) rotateY(60deg); }
          100% { transform: rotate(360deg) rotateY(60deg); }
        }
        .animate-spin-inner {
          animation: spinInner 8s linear infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 4s infinite ease-in-out;
        }

        /* Float elements */
        @keyframes floatNode1 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-4px, -8px); }
        }
        @keyframes floatNode2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(6px, -4px); }
        }
        @keyframes floatNode3 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-6px, 6px); }
        }
        @keyframes floatNode4 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(4px, 8px); }
        }

        .float-n-1 { animation: floatNode1 5s infinite ease-in-out; }
        .float-n-2 { animation: floatNode2 6s infinite ease-in-out; }
        .float-n-3 { animation: floatNode3 5.5s infinite ease-in-out; }
        .float-n-4 { animation: floatNode4 6.5s infinite ease-in-out; }

        /* Beam line animation */
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .beam-line {
          stroke-dasharray: 8 4;
          animation: dash 2s linear infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #09090d;
        }
        ::-webkit-scrollbar-thumb {
          background: #232332;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
      `}} />

      {/* Main Grid HUD container */}
      <div className="w-full max-w-7xl flex flex-col gap-6">
        
        {/* Editorial Top HUD Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2a2a3a]/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-indigo-500/20 rounded-xl relative group">
              <Workflow className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-400">Architect Engine</span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Khan Productions <span className="text-slate-400 font-normal">Project Evolution</span>
              </h1>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center gap-4 bg-[#111118]/80 p-2 px-4 border border-[#2a2a3a] rounded-lg text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-500">Stability:</span>
              <span className="text-slate-200">{(96.2).toFixed(1)}%</span>
            </div>
            <div className="h-3.5 w-px bg-[#2a2a3a]" />
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-500">Sync:</span>
              <span className="text-slate-200">240 Hz</span>
            </div>
          </div>
        </header>

        {/* Project Presets Sub-bar */}
        <section className="cyber-card p-3.5 rounded-xl bg-[#111118]/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Presets:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PROJECT_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadPreset(idx)}
                className={`px-4.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  projectName === preset.name
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                    : 'bg-[#0d0d12] border-[#2a2a3a] text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </section>

        {/* THREE-COLUMN DASHBOARD SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT COLUMN: INTERACTIVE DATA INJECTOR */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="cyber-card rounded-xl overflow-hidden flex flex-col bg-[#111118]/60 border border-[#2a2a3a] flex-1">
              
              {/* Box title */}
              <div className="flex items-center gap-2 border-b border-[#2a2a3a] px-5 py-4 bg-[#0d0d12]/90">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h2 className="text-xs uppercase font-bold tracking-wider text-slate-300">Control Injector</h2>
              </div>

              {/* Data Form */}
              <form onSubmit={handleCreateCustom} className="p-5 flex flex-col gap-5 flex-1 justify-between">
                <div className="flex flex-col gap-4">
                  
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">Project Name</label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g. Neuronal Mesh API"
                      className="bg-[#0c0c12] hover:bg-[#0f0f18] focus:bg-[#0a0a0f] text-slate-200 border border-[#2a2a3a] focus:border-cyan-500/40 px-3.5 py-2.5 rounded-lg text-xs focus:outline-none transition-all placeholder-slate-600 font-medium"
                    />
                  </div>

                  {/* Phase Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">Current Phase</label>
                    <select
                      value={projectPhase}
                      onChange={(e) => setProjectPhase(e.target.value)}
                      className="bg-[#0c0c12] hover:bg-[#0f0f18] text-slate-200 border border-[#2a2a3a] focus:border-cyan-500/40 px-3.5 py-2.5 rounded-lg text-xs focus:outline-none transition-all font-medium cursor-pointer"
                    >
                      <option value="Concept Stage">Concept Stage</option>
                      <option value="Alpha Proto-net">Alpha Proto-net</option>
                      <option value="Beta Optimization">Beta Optimization</option>
                      <option value="Global Scaling">Global Scaling</option>
                      <option value="Legacy Maintenance">Legacy Maintenance</option>
                    </select>
                  </div>

                  {/* Active Nodes Count slider */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider font-mono">
                      <span className="text-slate-500">Active Nodes</span>
                      <span className="text-cyan-400">{activeNodesCount} Units</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="16"
                      value={activeNodesCount}
                      onChange={(e) => setActiveNodesCount(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-[#0c0c12] rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-[#2a2a3a]"
                    />
                  </div>

                  {/* Progress Range slider */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-[11px] font-semibold uppercase tracking-wider font-mono">
                      <span className="text-slate-500">Evolution Progress</span>
                      <span className="text-cyan-400">{progressPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progressPercent}
                      onChange={(e) => setProgressPercent(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-[#0c0c12] rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-[#2a2a3a]"
                    />
                  </div>

                </div>

                {/* Submits and updates */}
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-start gap-2 bg-[#09090d] border border-[#2a2a3a] p-3 rounded-lg text-[10.5px] text-slate-500 font-mono">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Modifying controls will dynamically realign orbiting vectors on the centerpiece stage in real time.</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleEvolve}
                    disabled={isEvolving}
                    className={`glow-cyan-btn w-full py-3 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 text-white transition-all select-none ${
                      isEvolving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isEvolving ? 'animate-spin' : ''}`} />
                    <span>{isEvolving ? 'Evolving Node Matrix...' : 'Evolve Architecture'}</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

          {/* CENTER STAGE: THE CORE 3D EVOLUTION ENGINE */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="cyber-card rounded-xl overflow-hidden bg-[#07070b]/90 border border-[#2a2a3a] flex-1 flex flex-col items-center justify-between p-5 relative min-h-[480px]">
              
              {/* stage overlay grid line labels */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none select-none z-10">
                System Grid Stage
              </div>
              <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none select-none z-10 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>3D Active</span>
              </div>

              {/* 3D Orb Simulator Box */}
              <div className="flex-1 flex items-center justify-center relative w-full h-full max-h-[340px] mt-4">
                
                {/* SVG Pseudo-3D Node Canvas */}
                <svg className="w-full h-full min-h-[300px] absolute z-10 overflow-visible pointer-events-none" viewBox="0 0 320 320">
                  
                  {/* Glowing core gradients */}
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={isEvolving ? '#10b981' : '#6366f1'} stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="linkCore" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="linkAutomation" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="linkAssets" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="linkFrontend" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Backdrop Core Shadow */}
                  <circle cx="160" cy="160" r="80" fill="url(#coreGlow)" className="animate-pulse-glow" />

                  {/* Connecting lines - Core Logic */}
                  <line 
                    x1="160" y1="160" x2="60" y2="70" 
                    stroke={selectedBranch === 'core' ? '#6366f1' : '#2a2a3a'} 
                    strokeWidth={selectedBranch === 'core' ? '2' : '1'} 
                    strokeOpacity={selectedBranch === 'core' ? '1' : '0.4'}
                    className={selectedBranch === 'core' ? 'beam-line' : ''}
                    strokeDasharray={selectedBranch === 'core' ? '6 3' : '0'}
                  />
                  
                  {/* Connecting lines - Automation */}
                  <line 
                    x1="160" y1="160" x2="260" y2="70" 
                    stroke={selectedBranch === 'automation' ? '#06b6d4' : '#2a2a3a'} 
                    strokeWidth={selectedBranch === 'automation' ? '2' : '1'} 
                    strokeOpacity={selectedBranch === 'automation' ? '1' : '0.4'}
                    className={selectedBranch === 'automation' ? 'beam-line' : ''}
                    strokeDasharray={selectedBranch === 'automation' ? '6 3' : '0'}
                  />

                  {/* Connecting lines - Assets */}
                  <line 
                    x1="160" y1="160" x2="60" y2="250" 
                    stroke={selectedBranch === 'assets' ? '#a855f7' : '#2a2a3a'} 
                    strokeWidth={selectedBranch === 'assets' ? '2' : '1'} 
                    strokeOpacity={selectedBranch === 'assets' ? '1' : '0.4'}
                    className={selectedBranch === 'assets' ? 'beam-line' : ''}
                    strokeDasharray={selectedBranch === 'assets' ? '6 3' : '0'}
                  />

                  {/* Connecting lines - Frontend */}
                  <line 
                    x1="160" y1="160" x2="260" y2="250" 
                    stroke={selectedBranch === 'frontend' ? '#10b981' : '#2a2a3a'} 
                    strokeWidth={selectedBranch === 'frontend' ? '2' : '1'} 
                    strokeOpacity={selectedBranch === 'frontend' ? '1' : '0.4'}
                    className={selectedBranch === 'frontend' ? 'beam-line' : ''}
                    strokeDasharray={selectedBranch === 'frontend' ? '6 3' : '0'}
                  />

                </svg>

                {/* CENTRAL FLOATING SPHERE structure (rotating SVGs) */}
                <div className="absolute w-[180px] h-[180px] flex items-center justify-center pointer-events-none">
                  
                  {/* concentric ring 1 */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/40 animate-spin-outer" />
                  
                  {/* concentric ring 2 */}
                  <div 
                    className={`absolute inset-4 rounded-full border border-cyan-400/50 animate-spin-middle transition-colors duration-500 ${
                      isEvolving ? 'border-emerald-400' : ''
                    }`} 
                    style={{ transform: 'rotateX(45deg)' }} 
                  />

                  {/* concentric ring 3 */}
                  <div 
                    className="absolute inset-8 rounded-full border border-purple-500/30 animate-spin-inner" 
                    style={{ transform: 'rotateY(60deg)' }} 
                  />
                  
                  {/* Core energy bubble */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr transition-all duration-700 shadow-2xl ${
                    isEvolving 
                      ? 'from-emerald-400 to-cyan-400 scale-125 shadow-emerald-500/40' 
                      : (selectedBranch === 'core' ? 'from-indigo-600 to-purple-500 shadow-indigo-500/40' : 
                         selectedBranch === 'automation' ? 'from-cyan-500 to-indigo-500 shadow-cyan-500/40' :
                         selectedBranch === 'assets' ? 'from-purple-500 to-indigo-500 shadow-purple-500/40' :
                         'from-emerald-500 to-cyan-500 shadow-emerald-500/40')
                  } flex items-center justify-center`} />

                </div>

                {/* INTERACTIVE SATELLITE NODES */}
                {/* Node 1: Core Logic */}
                <button
                  onMouseEnter={() => setSelectedBranch('core')}
                  onClick={() => setSelectedBranch('core')}
                  className="absolute left-[30px] top-[40px] z-20 focus:outline-none flex flex-col items-center group cursor-pointer float-n-1"
                >
                  <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-all bg-[#0a0a0f]/90 ${
                    selectedBranch === 'core' 
                      ? 'border-indigo-500 text-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)] scale-110' 
                      : 'border-[#2a2a3a] text-slate-500 hover:border-slate-600 hover:text-slate-300'
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111118] px-2 py-0.5 border border-[#2a2a3a] rounded">Core Logic</span>
                </button>

                {/* Node 2: Automation */}
                <button
                  onMouseEnter={() => setSelectedBranch('automation')}
                  onClick={() => setSelectedBranch('automation')}
                  className="absolute right-[30px] top-[40px] z-20 focus:outline-none flex flex-col items-center group cursor-pointer float-n-2"
                >
                  <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-all bg-[#0a0a0f]/90 ${
                    selectedBranch === 'automation' 
                      ? 'border-cyan-500 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-110' 
                      : 'border-[#2a2a3a] text-slate-500 hover:border-slate-600 hover:text-slate-300'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111118] px-2 py-0.5 border border-[#2a2a3a] rounded">Automation</span>
                </button>

                {/* Node 3: Brand Assets */}
                <button
                  onMouseEnter={() => setSelectedBranch('assets')}
                  onClick={() => setSelectedBranch('assets')}
                  className="absolute left-[30px] bottom-[40px] z-20 focus:outline-none flex flex-col items-center group cursor-pointer float-n-3"
                >
                  <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-all bg-[#0a0a0f]/90 ${
                    selectedBranch === 'assets' 
                      ? 'border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] scale-110' 
                      : 'border-[#2a2a3a] text-slate-500 hover:border-slate-600 hover:text-slate-300'
                  }`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111118] px-2 py-0.5 border border-[#2a2a3a] rounded">Assets</span>
                </button>

                {/* Node 4: Frontend Architecture */}
                <button
                  onMouseEnter={() => setSelectedBranch('frontend')}
                  onClick={() => setSelectedBranch('frontend')}
                  className="absolute right-[30px] bottom-[40px] z-20 focus:outline-none flex flex-col items-center group cursor-pointer float-n-4"
                >
                  <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center transition-all bg-[#0a0a0f]/90 ${
                    selectedBranch === 'frontend' 
                      ? 'border-emerald-500 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] scale-110' 
                      : 'border-[#2a2a3a] text-slate-500 hover:border-slate-600 hover:text-slate-300'
                  }`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111118] px-2 py-0.5 border border-[#2a2a3a] rounded">Frontend</span>
                </button>

              </div>

              {/* Dynamic Branch description panel */}
              <div className="w-full bg-[#0a0a0f] border border-[#2a2a3a]/80 p-3 rounded-lg relative z-20 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: BRANCHES[selectedBranch].color }} 
                    />
                    {BRANCHES[selectedBranch].title}
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wide bg-[#151522] border border-[#2a2a3a] px-2 py-0.5 rounded">
                    {BRANCHES[selectedBranch].metric}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{BRANCHES[selectedBranch].desc}</p>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: LIVE METRICS & TELEMETRY */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Live Metrics Index Cards */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Card 1: Core Alignment */}
              <div className="cyber-card p-4 rounded-xl bg-[#111118]/60 border border-[#2a2a3a] flex flex-col gap-1">
                <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">Alignment Index</span>
                <span className="text-xl font-bold tracking-tight text-white font-mono">{(progressPercent * 1.1 + 10).toFixed(1)}%</span>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-1.5 border border-[#2a2a3a]">
                  <div className="bg-cyan-500 h-full" style={{ width: `${Math.min(progressPercent + 10, 100)}%` }} />
                </div>
              </div>

              {/* Card 2: Mesh Rate */}
              <div className="cyber-card p-4 rounded-xl bg-[#111118]/60 border border-[#2a2a3a] flex flex-col gap-1">
                <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">Mesh Transfer</span>
                <span className="text-xl font-bold tracking-tight text-white font-mono">{activeNodesCount * 2.1} Gb/s</span>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mt-1.5 border border-[#2a2a3a]">
                  <div className="bg-indigo-500 h-full" style={{ width: `${(activeNodesCount / 16) * 100}%` }} />
                </div>
              </div>

            </div>

            {/* Milestones Panel */}
            <div className="cyber-card rounded-xl overflow-hidden bg-[#111118]/60 border border-[#2a2a3a] p-4 flex flex-col gap-3">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">Timeline Milestones</span>
              
              <div className="flex flex-col gap-3.5">
                
                {/* Milestone 1: Structuring */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold">1</span>
                    <span className="text-slate-300">Architecture Draft</span>
                  </div>
                  <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">Done</span>
                </div>

                {/* Milestone 2: Orbital Mount */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold">2</span>
                    <span className="text-slate-300">Concentric mounting</span>
                  </div>
                  {progressPercent >= 50 ? (
                    <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">Done</span>
                  ) : (
                    <span className="text-indigo-400 text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase">Active</span>
                  )}
                </div>

                {/* Milestone 3: Global Scaling */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-bold">3</span>
                    <span className="text-slate-300">Evolved scaling</span>
                  </div>
                  {progressPercent >= 90 ? (
                    <span className="text-emerald-400 text-[10px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase">Done</span>
                  ) : progressPercent >= 50 ? (
                    <span className="text-indigo-400 text-[10px] bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase">Active</span>
                  ) : (
                    <span className="text-slate-600 text-[10px] bg-slate-800/40 border border-transparent px-2 py-0.5 rounded font-bold uppercase">Pending</span>
                  )}
                </div>

              </div>
            </div>

            {/* Live Telemetry console */}
            <div className="cyber-card rounded-xl overflow-hidden flex flex-col bg-[#07070b] border border-[#2a2a3a] h-[190px]">
              
              <div className="flex items-center justify-between border-b border-[#2a2a3a] px-4 py-2.5 bg-[#0e0e14]">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Telemetry Log Stream</span>
                </div>
                <button 
                  onClick={() => setTelemetryLogs([`[SYSTEM] Clear logs - calibration standard active.`])}
                  className="p-1 bg-[#171724]/60 hover:bg-[#1c1c2b] text-slate-500 hover:text-white rounded border border-[#2a2a3a] transition-all cursor-pointer"
                  title="Wipe output console"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-400 bg-[#060609] flex flex-col justify-start">
                <div className="flex flex-col gap-0.5 w-full">
                  {telemetryLogs.map((log, index) => {
                    let logClass = "text-slate-400";
                    if (log.includes("[SUCCESS]")) logClass = "text-emerald-400 font-medium";
                    else if (log.includes("[EVOLUTION]")) logClass = "text-cyan-400";
                    else if (log.includes("[PRESET]")) logClass = "text-indigo-400";
                    else if (log.includes("[COMPILER]")) logClass = "text-purple-400/80";

                    return (
                      <div key={index} className={`whitespace-pre-wrap ${logClass}`}>
                        {log}
                      </div>
                    );
                  })}
                  <div ref={telemetryEndRef} />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM UTILITY FOOTER */}
        <footer className="cyber-card p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 bg-[#111118]/80 mt-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <Workflow className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">{projectName} Evolution Map</div>
              <div className="text-[10px] text-slate-500 font-mono">Export format: Schema JSON standard 2.4</div>
            </div>
          </div>

          <button
            onClick={handleExportBlueprint}
            disabled={isExporting}
            className={`glow-cyan-btn px-6 py-2.5 rounded-lg text-xs font-semibold text-white flex items-center gap-2 select-none ${
              isExporting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting Vector Roadmap Metadata JSON...</span>
              </>
            ) : exportComplete ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Blueprint Saved!</span>
              </>
            ) : (
              <>
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Project Blueprint Map</span>
              </>
            )}
          </button>
        </footer>

      </div>
    </div>
  );
};

export default ProjectEvolution;
