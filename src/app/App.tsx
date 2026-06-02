import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Radio,
  GitNetwork,
  Cpu,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

import { ThemeProvider, NotificationProvider } from '@context/providers';
import { Header, Sidebar, Footer, ErrorBoundary } from '@components/common/Layout';

// Pages
import DashboardPage from '@pages/Dashboard';
import NexusPulsePage from '@pages/NexusPulse';
import ProjectEvolutionPage from '@pages/ProjectEvolution';
import AIControlCenterPage from '@pages/AIControlCenter';
import AnalyticsCenterPage from '@pages/AnalyticsCenter';
import SettingsPage from '@pages/Settings';

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: '📊', href: '/', active: location.pathname === '/' },
    { label: 'Nexus Pulse', icon: '📡', href: '/nexus', active: location.pathname === '/nexus' },
    { label: 'Project Evolution', icon: '🔬', href: '/evolution', active: location.pathname === '/evolution' },
    { label: 'AI Control', icon: '🤖', href: '/ai', active: location.pathname === '/ai' },
    { label: 'Analytics', icon: '📈', href: '/analytics', active: location.pathname === '/analytics' },
    { label: 'Settings', icon: '⚙️', href: '/settings', active: location.pathname === '/settings' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        code, pre {
          font-family: 'Fira Code', monospace;
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }

        body {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.02), rgba(99, 102, 241, 0.02));
        }
      `}</style>

      <Header sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar
        isOpen={sidebarOpen}
        items={navItems}
        onNavigate={(href) => {
          navigate(href);
          setSidebarOpen(false);
        }}
      />

      <main className="flex-1 overflow-auto pt-16 md:ml-64 pb-20">
        <Routes>
          <Route path="/" element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
          <Route path="/nexus" element={<ErrorBoundary><NexusPulsePage /></ErrorBoundary>} />
          <Route path="/evolution" element={<ErrorBoundary><ProjectEvolutionPage /></ErrorBoundary>} />
          <Route path="/ai" element={<ErrorBoundary><AIControlCenterPage /></ErrorBoundary>} />
          <Route path="/analytics" element={<ErrorBoundary><AnalyticsCenterPage /></ErrorBoundary>} />
          <Route path="/settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
        </Routes>
      </main>

      <Footer className="md:ml-64" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
