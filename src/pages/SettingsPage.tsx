import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Smartphone,
  Mail,
  Key,
  Download,
  Upload,
  Save,
  RefreshCw,
  Monitor,
  Moon,
  Sun,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    systemUpdates: true
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('Africa/Lagos');

  const systemStats = [
    { label: 'System Uptime', value: '99.9%', status: 'success' },
    { label: 'Database Health', value: 'Optimal', status: 'success' },
    { label: 'API Response Time', value: '120ms', status: 'success' },
    { label: 'Storage Used', value: '34%', status: 'warning' }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold dashboard-gradient-text">
              System Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure system preferences and administrative settings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>
            <Button variant="gradient" size="sm">
              <Save className="h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              System Health Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {systemStats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {getStatusIcon(stat.status)}
                    <h4 className="font-medium">{stat.label}</h4>
                  </div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Preferences */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-secondary" />
                User Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Settings */}
              <div>
                <label className="text-sm font-medium mb-3 block">Profile Information</label>
                <div className="space-y-3">
                  <Input placeholder="Full Name" value="Dr. Climate Administrator" />
                  <Input placeholder="Email Address" value="admin@climate.gov.ng" />
                  <Input placeholder="Department" value="Climate Monitoring Division" />
                </div>
              </div>

              {/* Theme Settings */}
              <div>
                <label className="text-sm font-medium mb-3 block">Appearance</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Theme</span>
                    <div className="flex gap-2">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('light')}
                      >
                        <Sun className="h-4 w-4" />
                        Light
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTheme('dark')}
                      >
                        <Moon className="h-4 w-4" />
                        Dark
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="p-2 border rounded-lg bg-background"
                    >
                      <option value="English">English</option>
                      <option value="Hausa">Hausa</option>
                      <option value="Yoruba">Yoruba</option>
                      <option value="Igbo">Igbo</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Zone</span>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="p-2 border rounded-lg bg-background"
                    >
                      <option value="Africa/Lagos">West Africa Time (WAT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={() => handleNotificationChange('emailAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Emergency notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={() => handleNotificationChange('smsAlerts')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={() => handleNotificationChange('pushNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Automated weekly summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={() => handleNotificationChange('weeklyReports')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-muted-foreground">Maintenance and update notifications</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={() => handleNotificationChange('systemUpdates')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-destructive" />
                Security & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Password Settings</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Smartphone className="h-4 w-4" />
                      Setup Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Session Management</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Active Sessions</p>
                        <p className="text-xs text-muted-foreground">3 active sessions</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">API Access</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4" />
                      Generate API Key
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4" />
                      Configure Webhooks
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                System Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Data Management</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4" />
                      Export System Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4" />
                      Import Configuration
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">System Maintenance</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4" />
                      Optimize Database
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Integration Settings</label>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="h-4 w-4" />
                      Weather API Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4" />
                      SMS Gateway Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Settings */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Advanced Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg hover:bg-muted/50 transition-all">
                <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Regional Settings</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure state-specific settings and regional preferences
                </p>
                <Button variant="outline" size="sm">Configure</Button>
              </div>

              <div className="text-center p-6 border rounded-lg hover:bg-muted/50 transition-all">
                <Palette className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Custom Branding</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Customize dashboard appearance and branding elements
                </p>
                <Button variant="outline" size="sm">Customize</Button>
              </div>

              <div className="text-center p-6 border rounded-lg hover:bg-muted/50 transition-all">
                <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Performance</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor and optimize system performance settings
                </p>
                <Button variant="outline" size="sm">Optimize</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;