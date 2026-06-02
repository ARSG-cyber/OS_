import React, { useState } from 'react';
import {
  Bell,
  Moon,
  Zap,
  Lock,
  User,
  Database,
  Key,
  LogOut,
  Save,
} from 'lucide-react';
import { Card, Button, Input, Badge, Divider } from '@components/common/Components';
import { useTheme } from '@context/hooks';
import { cn } from '@utils/index';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    weeklyReports: false,
    twoFactor: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const sections: SettingSection[] = [
    {
      id: 'general',
      title: 'General',
      icon: <Zap size={20} />,
      description: 'General application settings',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} />,
      description: 'Manage notification preferences',
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Lock size={20} />,
      description: 'Account security and privacy',
    },
    {
      id: 'account',
      title: 'Account',
      icon: <User size={20} />,
      description: 'Profile and account settings',
    },
    {
      id: 'data',
      title: 'Data & Storage',
      icon: <Database size={20} />,
      description: 'Data management options',
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const SettingToggle: React.FC<{
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
  }> = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={cn(
          'relative w-12 h-6 rounded-full transition-colors',
          checked ? 'bg-cyber-cyan' : 'bg-slate-700'
        )}
      >
        <div
          className={cn(
            'absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform',
            checked && 'translate-x-6'
          )}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-900 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="text-slate-400">Manage your preferences and account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                  activeSection === section.id
                    ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === 'general' && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">General Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Display Theme</label>
                  <div className="flex gap-4">
                    <button
                      onClick={toggleTheme}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                        theme === 'dark'
                          ? 'border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan'
                          : 'border-slate-700 text-slate-400 hover:text-slate-200'
                      )}
                    >
                      <Moon size={16} /> Dark Mode
                    </button>
                    <button
                      onClick={toggleTheme}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                        theme === 'light'
                          ? 'border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan'
                          : 'border-slate-700 text-slate-400 hover:text-slate-200'
                      )}
                    >
                      ☀️ Light Mode
                    </button>
                  </div>
                </div>

                <Divider />

                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:border-cyber-cyan focus:outline-none">
                    <option>English</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                  </select>
                </div>

                <Divider />

                <div>
                  <label className="block text-sm font-medium mb-2">Time Zone</label>
                  <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:border-cyber-cyan focus:outline-none">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-6 (Central Time)</option>
                    <option>UTC-7 (Mountain Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                  </select>
                </div>

                <Divider />

                <div className="flex justify-end">
                  <Button onClick={handleSave} isLoading={isSaving}>
                    <Save size={18} /> Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                <SettingToggle
                  label="Push Notifications"
                  description="Receive push notifications on your devices"
                  checked={settings.notifications}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))
                  }
                />

                <SettingToggle
                  label="Email Alerts"
                  description="Receive important alerts via email"
                  checked={settings.emailAlerts}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, emailAlerts: !prev.emailAlerts }))
                  }
                />

                <SettingToggle
                  label="Weekly Reports"
                  description="Get a summary of your activities each week"
                  checked={settings.weeklyReports}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, weeklyReports: !prev.weeklyReports }))
                  }
                />
              </div>

              <Divider className="my-6" />

              <div className="flex justify-end">
                <Button onClick={handleSave} isLoading={isSaving}>
                  <Save size={18} /> Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>

                <Divider />

                <SettingToggle
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  checked={settings.twoFactor}
                  onChange={() =>
                    setSettings((prev) => ({ ...prev, twoFactor: !prev.twoFactor }))
                  }
                />

                <Divider />

                <div className="flex justify-end gap-4">
                  <Button variant="secondary">Cancel</Button>
                  <Button onClick={handleSave} isLoading={isSaving}>
                    <Save size={18} /> Update Security
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'account' && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Account Information</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input value="Usman" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input value="Khan" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" value="admin@khanproductions.com" />
                </div>

                <Divider />

                <div>
                  <label className="block text-sm font-medium mb-4">Active Sessions</label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div>
                        <p className="font-medium">Current Device</p>
                        <p className="text-sm text-slate-400">Chrome on Windows</p>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>
                </div>

                <Divider />

                <div className="flex justify-end gap-4">
                  <Button variant="danger">
                    <LogOut size={18} /> Logout All Sessions
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'data' && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Data & Storage</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4">Storage Usage</label>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Used</span>
                    <span className="font-medium">24.5 GB of 100 GB</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-to-r from-cyber-cyan to-cyber-indigo" />
                  </div>
                </div>

                <Divider />

                <div>
                  <h3 className="font-medium mb-4">Data Management</h3>
                  <div className="space-y-2">
                    <Button variant="secondary" className="w-full justify-start">
                      <Database size={16} className="mr-2" /> Export All Data
                    </Button>
                    <Button variant="secondary" className="w-full justify-start">
                      <Database size={16} className="mr-2" /> Clear Cache
                    </Button>
                  </div>
                </div>

                <Divider />

                <div>
                  <p className="text-sm text-slate-400 mb-4">
                    Delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="danger" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
