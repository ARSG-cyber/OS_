import React, { useState } from 'react';
import {
  BarChart3,
  LineChart,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  Calendar,
} from 'lucide-react';
import { LineChart as RechartLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, Badge, Button } from '@components/common/Components';
import { cn } from '@utils/index';

interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  timestamp?: string;
}

const CHART_DATA = [
  { name: 'Jan', value: 4000, value2: 2400, revenue: 2400 },
  { name: 'Feb', value: 3000, value2: 1398, revenue: 2210 },
  { name: 'Mar', value: 2000, value2: 9800, revenue: 2290 },
  { name: 'Apr', value: 2780, value2: 3908, revenue: 2000 },
  { name: 'May', value: 1890, value2: 4800, revenue: 2181 },
  { name: 'Jun', value: 2390, value2: 3800, revenue: 2500 },
  { name: 'Jul', value: 3490, value2: 4300, revenue: 2100 },
];

const CONVERSION_DATA = [
  { name: 'Direct', value: 35 },
  { name: 'Organic', value: 45 },
  { name: 'Social', value: 20 },
];

const COLORS = ['#06b6d4', '#6366f1', '#a855f7'];

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const metrics = [
    { label: 'Total Revenue', value: '$487.2K', change: '+12.5%', positive: true },
    { label: 'Conversion Rate', value: '3.24%', change: '+0.42%', positive: true },
    { label: 'Avg. Order Value', value: '$324', change: '-2.1%', positive: false },
    { label: 'Customer LTV', value: '$2,847', change: '+18.3%', positive: true },
  ];

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Analytics Center</span>
        </h1>
        <p className="text-slate-400">Comprehensive insights and business metrics</p>
      </div>

      {/* Period Selector */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {['7d', '30d', '90d', '1y'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
          >
            <Calendar size={14} />
            {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : period === '90d' ? '90 Days' : '1 Year'}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-6">
            <p className="text-sm text-slate-400 mb-2">{metric.label}</p>
            <p className="text-3xl font-bold mb-2">{metric.value}</p>
            <p className={cn('text-sm font-medium', metric.positive ? 'text-emerald-400' : 'text-red-400')}>
              {metric.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Revenue Trend</h2>
            <BarChart3 size={20} className="text-cyber-cyan" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartLine data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#cbd5e1" />
              <YAxis stroke="#cbd5e1" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111724',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
              />
            </RechartLine>
          </ResponsiveContainer>
        </Card>

        {/* Conversion Sources */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Conversion Sources</h2>
            <PieChartIcon size={20} className="text-cyber-purple" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={CONVERSION_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {CONVERSION_DATA.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111724',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Forecast */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Growth Forecast</h3>
          <div className="space-y-4">
            {[
              { label: 'Next Quarter', value: '+24.3%', icon: '📈' },
              { label: 'Next Month', value: '+8.7%', icon: '📊' },
              { label: 'Next Week', value: '+2.1%', icon: '📉' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 ml-3">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="font-semibold text-cyber-cyan">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Performers */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Product A', sales: 2847, change: '+15.2%' },
              { name: 'Product B', sales: 2156, change: '+8.4%' },
              { name: 'Product C', sales: 1847, change: '+3.1%' },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-slate-400">{product.sales} sales</p>
                </div>
                <Badge variant="success" className="text-xs">
                  {product.change}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Export Report</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start">
              <Download size={16} className="mr-2" />
              PDF Report
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Download size={16} className="mr-2" />
              CSV Data
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <Download size={16} className="mr-2" />
              JSON Export
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
