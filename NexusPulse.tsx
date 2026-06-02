import React, { useState, useRef, useEffect } from 'react';
import {
  Radio,
  Activity,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Share2,
  ShieldAlert,
  Sparkles,
  Filter,
  ChevronRight,
  TrendingUp,
  Zap,
  X,
  Clock,
  BarChart3,
  AlertCircle,
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS & MOCK INGESTION DATA
// ============================================================================

interface InsightCard {
  id: string;
  author: {
    name: string;
    avatar: string;
    module: string;
    uptime: number;
  };
  type: 'product' | 'tech' | 'analytics' | 'system';
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string | number;
    unit?: string;
  }[];
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

const INITIAL_INSIGHTS: InsightCard[] = [
  {
    id: 'ins-1',
    author: { name: 'Ecom Spy Bot v4.2', avatar: '🤖', module: 'Niche Mining Core', uptime: 99.8 },
    type: 'product',
    title: 'Shopify Viral Volume Spike Detected',
    description: 'An unprecedented breakout velocity (+142% volume metrics) flagged in premium organic hydration tumblers niche. Competitor surveillance networks confirm major ad spend optimization spikes in UK and European vectors.',
    metrics: [
      { label: 'Growth Vector', value: 142, unit: '%' },
      { label: 'Saturation Index', value: 'Low' },
      { label: 'Margin Potential', value: 'High' }
    ],
    engagement: { likes: 42, bookmarks: 12, comments: 4 },
    timestamp: 180000,
    visualType: 'chart',
    liked: false,
    bookmarked: false
  },
  {
    id: 'ins-2',
    author: { name: 'SEO Crawler Daemon', avatar: '🕷️', module: 'Rank Engine Core', uptime: 100 },
    type: 'tech',
    title: 'High-Intent Long-Tail Anchor Breakout',
    description: 'Algorithmic extraction engines identified 14 ready-to-buy dash-separated long-tail search structures. Keyword difficulty indices are sub-20, opening immediate monetization pipelines for digital assets scaling.',
    metrics: [
      { label: 'KD Score', value: 18, unit: '/100' },
      { label: 'CPC Valuation', value: 3.42, unit: '$' },
      { label: 'Intent Metric', value: 'Transactional' }
    ],
    engagement: { likes: 29, bookmarks: 18, comments: 7 },
    timestamp: 900000,
    visualType: 'matrix',
    liked: true,
    bookmarked: false
  },
  {
    id: 'ins-3',
    author: { name: 'Ad Brain Engine', avatar: '🧠', module: 'Copywriting Assistant', uptime: 98.4 },
    type: 'analytics',
    title: 'High-Converting VSL Vector Validated',
    description: 'Neural validation layers matched new descriptive emotional copywriting script structures against direct target demographics. Simulation testing algorithms predict a massive boost in retention benchmarks.',
    metrics: [
      { label: 'Predictive CTR', value: '6.4%', unit: '' },
      { label: 'Validation Score', value: 92.4, unit: '%' },
      { label: 'Engagement Multiplier', value: '1.4x' }
    ],
    engagement: { likes: 56, bookmarks: 24, comments: 11 },
    timestamp: 3600000,
    visualType: 'gradient',
    liked: false,
    bookmarked: true
  }
];

// ============================================================================
// MAIN NEXUS PULSE INTERACTIVE DASHBOARD
// ============================================================================

const NexusPulse: React.FC = () => {
  const [insights, setInsights] = useState<InsightCard[]>(INITIAL_INSIGHTS);
  const [filter, setFilter] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeInsight, setActiveInsight] = useState<InsightCard | null>(null);

  // Synced Page Title Configuration on initialization hooks
  useEffect(() => {
    document.title = "Nexus Pulse | Khan Productions";
    return () => {
      document.title = "Khan Productions";
    };
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInsights(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
          engagement: { ...item.engagement, likes: item.liked ? item.engagement.likes - 1 : item.engagement.likes + 1 }
        };
      }
      return item;
    }));
  };

  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInsights(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          bookmarked: !item.bookmarked,
          engagement: { ...item.engagement, bookmarks: item.bookmarked ? item.engagement.bookmarks - 1 : item.engagement.bookmarks + 1 }
        };
      }
      return item;
    }));
  };

  const injectLivePulse = () => {
    const randomAgents = [
      { name: 'Niche Mining Daemon', avatar: '💎', module: 'Ecom Sourcing Node' },
      { name: 'Ad Scaling Orchestrator', avatar: '⚡', module: 'Campaign Matrix' },
      { name: 'System Telemetry Monitor', avatar: '📊', module: 'Core Watchdog' }
    ];
    const pickedAgent = randomAgents[Math.floor(Math.random() * randomAgents.length)];
    const uniqueId = `ins-${Date.now()}`;
    
    const newPulse: InsightCard = {
      id: uniqueId,
      author: { ...pickedAgent, uptime: 99.9 },
      type: 'system',
      title: 'Real-time Architectural Insight Injected',
      description: 'Autonomous optimization layer successfully executed deep automated checks. Neural nodes balanced memory usage constraints and aligned local database models with zero runtime latency.',
      metrics: [
        { label: 'System Load', value: 'Minimal', unit: '' },
        { label: 'Confidence Latency', value: '99.7%', unit: '' },
        { label: 'Execution Time', value: '0.12s', unit: '' }
      ],
      engagement: { likes: 1, bookmarks: 0, comments: 0 },
      timestamp: 0,
      visualType: 'spectrum',
      liked: false,
      bookmarked: false
    };

    setInsights([newPulse, ...insights]);
  };

  const filteredInsights = filter === 'all' ? insights : insights.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f3f3f6] antialiased selection:bg-[#c9a85c] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Editorial Luxury Glass Header */}
      <header className="border-b border-[#2a2a3a]/60 bg-[#111118]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-[#c9a85c] animate-pulse" />
            <span className="text-xl font-bold tracking-[0.25em] text-white uppercase font-serif">NEXUS PULSE</span>
            <span className="text-[10px] uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-mono font-bold">Live Stream Feed</span>
          </div>
          <button 
            onClick={injectLivePulse}
            className="flex items-center gap-2 text-xs font-mono bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" /> Inject Live Pulse
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: FILTERS & VERTICAL STREAM PIPELINE (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Custom Filter Bar Pill Elements */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-[#111118] border border-[#2a2a3a] rounded-xl max-w-max font-mono text-[11px]">
            {['all', 'product', 'tech', 'analytics', 'system'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg font-bold tracking-wider uppercase transition-all ${filter === tab ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Interactive Ingest Feed Pipeline Card Array list */}
          <div className="space-y-4">
            {filteredInsights.map(item => (
              <div
                key={item.id}
                onClick={() => { setActiveInsight(item); setSidebarOpen(true); }}
                className="bg-[#111118] border border-[#2a2a3a] hover:border-purple-500/30 rounded-2xl p-5 shadow-2xl transition-all cursor-pointer group relative"
              >
                {/* Meta Header Grid row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1d1d2b] flex items-center justify-center text-sm shadow">
                      {item.author.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide font-mono">{item.author.name}</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Module: {item.author.module} • Node Active</p>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest px-2.5 py-1 bg-purple-950/40 border border-purple-900/50 text-purple-400 font-mono rounded-full font-bold">
                    {item.type}
                  </span>
                </div>

                {/* Main Insight Typography Content Blocks */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-base font-extrabold text-white group-hover:text-purple-400 transition-colors tracking-tight font-serif">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Modular Embedded Abstract Visual Asset Canvas Graphics based on Visual Type */}
                <div className="w-full h-16 bg-[#0a0a0f] border border-[#2a2a3a]/50 rounded-xl mb-4 overflow-hidden relative flex items-center px-4">
                  {item.visualType === 'chart' && (
                    <div className="w-full flex items-end justify-between h-8 gap-1 pt-2">
                      {[30, 80, 45, 95, 60, 75, 40, 90, 100, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  )}
                  {item.visualType === 'matrix' && (
                    <div className="font-mono text-[9px] text-emerald-500/50 truncate tracking-tighter w-full">
                      {"01010100 01010010 01000001 01000011 01001011 01001001 01001110 01000111 2026_ANCHOR_LOGS_SYNCED"}
                    </div>
                  )}
                  {item.visualType === 'gradient' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-transparent animate-pulse" />
                  )}
                  {item.visualType === 'spectrum' && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />
                  )}
                  <span className="absolute right-3 text-[8px] uppercase tracking-widest font-mono text-gray-600 bg-black/40 px-2 py-0.5 rounded border border-white/5">Visual Context Log</span>
                </div>

                {/* Structured Multi-Grid Numerical Analytics Targets layout */}
                <div className="grid grid-cols-3 gap-3 p-3 bg-[#0a0a0f] border border-[#2a2a3a]/40 rounded-xl mb-4 font-mono text-center">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} className="border-r last:border-r-0 border-[#2a2a3a]/40">
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider">{m.label}</p>
                      <p className="text-xs font-bold text-white mt-0.5">{m.value}{m.unit}</p>
                    </div>
                  ))}
                </div>

                {/* Interaction Meta Panel Action Icons Nodes */}
                <div className="flex justify-between items-center pt-3 border-t border-[#2a2a3a]/40 text-gray-400 font-mono text-xs">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => handleLike(item.id, e)}
                      className={`flex items-center gap-1.5 transition-colors hover:text-white ${item.liked ? 'text-red-400 hover:text-red-300' : ''}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> <span>{item.engagement.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" /> <span>{item.engagement.comments} Comments</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={(e) => handleBookmark(item.id, e)}
                      className={`hover:text-white transition-colors ${item.bookmarked ? 'text-[#c9a85c]' : ''}`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-purple-400 font-bold flex items-center gap-0.5 text-[11px] group-hover:translate-x-0.5 transition-transform">
                      Analyse Core <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR TELEMETRY CONTROLS DETAILED LOG DRAWER PANEL (4 COLS) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2a2a3a] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#c9a85c] flex items-center gap-2 font-mono">
                <BarChart3 className="w-3.5 h-3.5" /> Deep Insight Ingestion Drawer
              </h3>
              {sidebarOpen && (
                <button onClick={() => { setSidebarOpen(false); setActiveInsight(null); }} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {activeInsight && sidebarOpen ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded">
                    {activeInsight.author.name}
                  </span>
                  <h2 className="text-base font-extrabold font-serif text-white mt-2 leading-tight">{activeInsight.title}</h2>
                </div>

                <div className="space-y-2 text-xs font-mono text-gray-400 bg-[#0a0a0f] p-3 border border-[#2a2a3a]/60 rounded-xl">
                  <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">// TELEMETRY PROTOCOL STRING:</p>
                  <p className="leading-relaxed">Uptime: {activeInsight.author.uptime}% Latency Vectors</p>
                  <p className="text-emerald-400">Node Cluster Connection Status: SECURE_STABLE_MAP</p>
                  <p className="text-gray-600 text-[11px] mt-2 border-t border-[#2a2a3a]/40 pt-2">
                    {"[EXECUTION PATH INGESTION BUFFER]: Running algorithmic diagnostic matrices against specific Shopify store products datasets and digital assets hooks."}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">Inline Active Node Comments Buffer:</label>
                  <div className="bg-[#0a0a0f] border border-[#2a2a3a]/60 rounded-xl p-3 space-y-2 text-xs font-mono max-h-32 overflow-y-auto">
                    <div className="border-b border-[#2a2a3a]/30 pb-1.5 last:border-b-0">
                      <span className="text-purple-400 font-bold block text-[10px]">System Agent Core:</span>
                      <span className="text-gray-300">Data pipelines mapped with zero structural boundary discrepancies. Recommendation locked.</span>
                    </div>
                    <div className="pb-1.5 last:border-b-0">
                      <span className="text-indigo-400 font-bold block text-[10px]">Ecom Node Watchdog:</span>
                      <span className="text-gray-300">Volume tracking active. Flagging immediate marketing anchors setup workflows.</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setSidebarOpen(false); setActiveInsight(null); }}
                  className="w-full bg-[#1d1d2b] hover:bg-[#27273a] text-white border border-[#2a2a3a] text-xs font-mono py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all"
                >
                  Clear Analytics Focus
                </button>
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-[#2a2a3a] rounded-xl text-gray-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-gray-700 animate-pulse" />
                <p className="text-xs font-mono uppercase font-bold tracking-wider text-gray-400">Drawer Cache Idle</p>
                <p className="text-[10px] text-gray-500 max-w-xs mx-auto font-light mt-1">Select any dynamic AI metrics card object item inside the feed array stream workspace to generate immediate structural maps analytics dashboard layout views.</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default NexusPulse;