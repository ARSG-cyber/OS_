import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share2,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Card, Badge, Input, Button } from '@components/common/Components';
import { cn, truncateText, formatRelativeTime } from '@utils/index';

interface InsightCardData {
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
  metrics: Array<{ label: string; value: string | number; unit?: string }>;
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

const MOCK_INSIGHTS: InsightCardData[] = [
  {
    id: 'ins-1',
    author: { name: 'Ecom Spy Bot v4.2', avatar: '🤖', module: 'Niche Mining Core', uptime: 99.8 },
    type: 'product',
    title: 'Shopify Viral Volume Spike Detected',
    description:
      'An unprecedented breakout velocity (+142% volume metrics) flagged in premium organic hydration tumblers niche. Competitor surveillance networks confirm major ad spend optimization spikes in UK and European vectors.',
    metrics: [
      { label: 'Growth Vector', value: 142, unit: '%' },
      { label: 'Saturation Index', value: 'Low' },
      { label: 'Margin Potential', value: 'High' },
    ],
    engagement: { likes: 42, bookmarks: 12, comments: 4 },
    timestamp: 180000,
    visualType: 'chart',
    liked: false,
    bookmarked: false,
  },
  {
    id: 'ins-2',
    author: { name: 'SEO Crawler Daemon', avatar: '🕷️', module: 'Rank Engine Core', uptime: 100 },
    type: 'tech',
    title: 'High-Intent Long-Tail Anchor Breakout',
    description:
      'Algorithmic extraction engines identified 14 ready-to-buy dash-separated long-tail search structures. Keyword difficulty indices are sub-20, opening immediate monetization pipelines for digital assets scaling.',
    metrics: [
      { label: 'KD Score', value: 18, unit: '/100' },
      { label: 'CPC Valuation', value: 3.42, unit: '$' },
      { label: 'Intent Metric', value: 'Transactional' },
    ],
    engagement: { likes: 29, bookmarks: 18, comments: 7 },
    timestamp: 900000,
    visualType: 'matrix',
    liked: true,
    bookmarked: false,
  },
  {
    id: 'ins-3',
    author: { name: 'Ad Brain Engine', avatar: '🧠', module: 'Copywriting Assistant', uptime: 98.4 },
    type: 'analytics',
    title: 'High-Converting VSL Vector Validated',
    description:
      'Neural validation layers matched new descriptive emotional copywriting script structures against direct target demographics. Simulation testing algorithms predict a massive boost in retention benchmarks.',
    metrics: [
      { label: 'Predictive CTR', value: '6.4%', unit: '' },
      { label: 'Validation Score', value: 92.4, unit: '%' },
      { label: 'Engagement Multiplier', value: '1.4x' },
    ],
    engagement: { likes: 56, bookmarks: 24, comments: 11 },
    timestamp: 3600000,
    visualType: 'gradient',
    liked: false,
    bookmarked: true,
  },
];

const InsightCard: React.FC<InsightCardData & { onLike?: () => void; onBookmark?: () => void }> = ({
  author,
  type,
  title,
  description,
  metrics,
  engagement,
  timestamp,
  liked: isLiked,
  bookmarked: isBookmarked,
  onLike,
  onBookmark,
}) => {
  const typeColors = {
    product: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    tech: 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan',
    analytics: 'bg-cyber-purple/10 border-cyber-purple/30 text-cyber-purple',
    system: 'bg-cyber-indigo/10 border-cyber-indigo/30 text-cyber-indigo',
  };

  const timeAgo = Math.floor(timestamp / 1000 / 60); // convert to minutes
  const displayTime = timeAgo < 1 ? 'Just now' : `${timeAgo}m ago`;

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{author.avatar}</span>
          <div>
            <h3 className="font-semibold text-sm">{author.name}</h3>
            <p className="text-xs text-slate-500">{author.module}</p>
          </div>
        </div>
        <Badge variant="info">{type}</Badge>
      </div>

      {/* Content */}
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-slate-800/30 rounded-lg">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <p className="text-xs text-slate-400">{metric.label}</p>
            <p className="text-lg font-bold text-cyber-cyan">
              {metric.value}
              {metric.unit}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-500">
        <span>{displayTime}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className="flex items-center gap-1 hover:text-cyber-cyan transition-colors"
          >
            <ThumbsUp size={14} fill={isLiked ? 'currentColor' : 'none'} />
            {engagement.likes}
          </button>
          <button className="flex items-center gap-1 hover:text-cyber-cyan transition-colors">
            <MessageSquare size={14} />
            {engagement.comments}
          </button>
          <button
            onClick={onBookmark}
            className="flex items-center gap-1 hover:text-cyber-cyan transition-colors"
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
            {engagement.bookmarks}
          </button>
          <button className="flex items-center gap-1 hover:text-cyber-cyan transition-colors">
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
};

const NexusPulse: React.FC = () => {
  const [insights, setInsights] = useState<InsightCardData[]>(MOCK_INSIGHTS);
  const [filteredInsights, setFilteredInsights] = useState<InsightCardData[]>(MOCK_INSIGHTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | InsightCardData['type']>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'trending' | 'engagement'>('recent');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  // Filter and sort logic
  useEffect(() => {
    let filtered = insights;

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((i) => i.type === selectedType);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(query) ||
          i.description.toLowerCase().includes(query) ||
          i.author.name.toLowerCase().includes(query)
      );
    }

    // Bookmarked filter
    if (bookmarkedOnly) {
      filtered = filtered.filter((i) => i.bookmarked);
    }

    // Sort
    if (sortBy === 'trending') {
      filtered.sort(
        (a, b) =>
          b.engagement.likes +
          b.engagement.comments -
          (a.engagement.likes + a.engagement.comments)
      );
    } else if (sortBy === 'engagement') {
      filtered.sort((a, b) => b.engagement.bookmarks - a.engagement.bookmarks);
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    setFilteredInsights(filtered);
  }, [insights, searchQuery, selectedType, sortBy, bookmarkedOnly]);

  const handleLike = (id: string) => {
    setInsights((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
            ...i,
            liked: !i.liked,
            engagement: {
              ...i.engagement,
              likes: i.liked ? i.engagement.likes - 1 : i.engagement.likes + 1,
            },
          }
          : i
      )
    );
  };

  const handleBookmark = (id: string) => {
    setInsights((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
            ...i,
            bookmarked: !i.bookmarked,
            engagement: {
              ...i.engagement,
              bookmarks: i.bookmarked ? i.engagement.bookmarks - 1 : i.engagement.bookmarks + 1,
            },
          }
          : i
      )
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Nexus Pulse</span>
        </h1>
        <p className="text-slate-400">Real-time intelligence feed from AI agents</p>
      </div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <Input
          icon={<Search size={18} />}
          placeholder="Search insights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedType === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              All
            </Button>
            {(['product', 'tech', 'analytics', 'system'] as const).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto flex-wrap">
            <Button
              variant={sortBy === 'recent' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSortBy('recent')}
            >
              <Clock size={14} /> Recent
            </Button>
            <Button
              variant={sortBy === 'trending' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSortBy('trending')}
            >
              <TrendingUp size={14} /> Trending
            </Button>
            <Button
              variant={bookmarkedOnly ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            >
              <Bookmark size={14} /> Saved
            </Button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div
        ref={scrollContainerRef}
        className="space-y-6 max-w-3xl mx-auto"
      >
        {filteredInsights.length > 0 ? (
          filteredInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              {...insight}
              onLike={() => handleLike(insight.id)}
              onBookmark={() => handleBookmark(insight.id)}
            />
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-slate-400">No insights found matching your filters.</p>
          </Card>
        )}

        {/* Infinite scroll target */}
        <div ref={observerTargetRef} className="py-8 text-center text-slate-500">
          <Sparkles className="mx-auto mb-2 opacity-50" />
          <p>End of feed</p>
        </div>
      </div>
    </div>
  );
};

export default NexusPulse;
