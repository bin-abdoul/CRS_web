import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Bell,
  Cloud,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  Settings,
  Users,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  User
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const navItems = [
  { title: 'Dashboard', href: '/', icon: Home },
  { title: 'Live Map', href: '/map', icon: MapPin },
  { title: 'Reports', href: '/reports', icon: FileText },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  // { title: 'Message Center', href: '/messages', icon: MessageSquare },
  { title: 'Weather Alerts', href: '/weather', icon: Cloud },
  { title: 'User Management', href: '/users', icon: Users },
  { title: 'Settings', href: '/settings', icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen w-full ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } border-r bg-card shadow-[var(--shadow-medium)]`}
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-sky-400">
              <img src="/favicon.ico" alt="" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold dashboard-gradient-text">
                  ClimateGuardian
                </span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-muted hover:scale-105 ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground"
                }`}
              >
                <Icon
                  className={`h-5 w-5 dashboard-icon-bounce ${
                    isActive ? "text-primary" : ""
                  }`}
                />
                {sidebarOpen && (
                  <span className={isActive ? "font-semibold" : ""}>
                    {item.title}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">
                  Government Official
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="dashboard-icon-bounce"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports, locations, or users..."
                className="pl-10 focus:ring-primary"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-dashboard-bg p-6">{children}</main>
      </div>
    </div>
  );
}