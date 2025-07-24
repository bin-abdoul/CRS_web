import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Dr. Amina Hassan',
    email: 'a.hassan@climate.gov.ng',
    phone: '+234-801-234-5678',
    role: 'Administrator',
    department: 'Climate Monitoring',
    state: 'Federal Capital Territory',
    status: 'active',
    lastLogin: '2024-01-15 14:30:00',
    joinDate: '2023-06-15',
    permissions: ['all_access', 'user_management', 'system_config']
  },
  {
    id: 2,
    name: 'Eng. Chidi Okonkwo',
    email: 'c.okonkwo@climate.gov.ng',
    phone: '+234-802-345-6789',
    role: 'State Coordinator',
    department: 'Emergency Response',
    state: 'Lagos State',
    status: 'active',
    lastLogin: '2024-01-15 12:15:00',
    joinDate: '2023-08-20',
    permissions: ['reports_view', 'alerts_send', 'data_export']
  },
  {
    id: 3,
    name: 'Mrs. Fatima Abdullahi',
    email: 'f.abdullahi@climate.gov.ng',
    phone: '+234-803-456-7890',
    role: 'Data Analyst',
    department: 'Research & Analytics',
    state: 'Kano State',
    status: 'active',
    lastLogin: '2024-01-15 09:45:00',
    joinDate: '2023-04-10',
    permissions: ['analytics_access', 'reports_view', 'data_export']
  },
  {
    id: 4,
    name: 'Mr. Emeka Nwosu',
    email: 'e.nwosu@climate.gov.ng',
    phone: '+234-804-567-8901',
    role: 'Field Coordinator',
    department: 'Field Operations',
    state: 'Rivers State',
    status: 'inactive',
    lastLogin: '2024-01-10 16:20:00',
    joinDate: '2023-09-05',
    permissions: ['reports_create', 'field_data_entry']
  },
  {
    id: 5,
    name: 'Dr. Aisha Bello',
    email: 'a.bello@climate.gov.ng',
    phone: '+234-805-678-9012',
    role: 'Researcher',
    department: 'Climate Science',
    state: 'Kaduna State',
    status: 'active',
    lastLogin: '2024-01-15 11:30:00',
    joinDate: '2023-07-12',
    permissions: ['analytics_access', 'research_tools', 'data_export']
  }
];

const roles = [
  { name: 'Administrator', count: 2, color: 'bg-red-500' },
  { name: 'State Coordinator', count: 12, color: 'bg-blue-500' },
  { name: 'Data Analyst', count: 8, color: 'bg-green-500' },
  { name: 'Field Coordinator', count: 24, color: 'bg-purple-500' },
  { name: 'Researcher', count: 6, color: 'bg-orange-500' }
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'State Coordinator': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Data Analyst': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Field Coordinator': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Researcher': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold dashboard-gradient-text">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Bulk Actions
            </Button>
            <Button variant="gradient" size="sm">
              <UserPlus className="h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">52</p>
                  <p className="text-sm text-success">+5 this month</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-success">48</p>
                  <p className="text-sm text-muted-foreground">92% active rate</p>
                </div>
                <div className="p-3 rounded-lg bg-success/10">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">States Covered</p>
                  <p className="text-3xl font-bold text-secondary">36</p>
                  <p className="text-sm text-success">100% coverage</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Admin Users</p>
                  <p className="text-3xl font-bold text-warning">5</p>
                  <p className="text-sm text-muted-foreground">10% of users</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10">
                  <Shield className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="p-2 border rounded-lg bg-background"
              >
                <option value="All">All Roles</option>
                {roles.map(role => (
                  <option key={role.name} value={role.name}>{role.name}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded-lg bg-background"
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {roles.map((role, index) => (
                <div key={index} className="text-center p-4 rounded-lg border hover:bg-muted/50 transition-all">
                  <div className={`w-12 h-12 ${role.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm">{role.name}</h4>
                  <p className="text-2xl font-bold text-primary">{role.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user, index) => (
                <div 
                  key={user.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-all hover:scale-[1.01]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    {/* User Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Role & Department */}
                    <div>
                      <Badge className={`mb-1 ${getRoleColor(user.role)}`}>
                        {user.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>

                    {/* Location & Contact */}
                    <div>
                      <p className="font-medium text-sm">{user.state}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>

                    {/* Status & Last Login */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(user.status)}
                        <span className="text-sm capitalize">{user.status}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.lastLogin).toLocaleString()}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="dashboard-icon-bounce">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="dashboard-icon-bounce">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Permissions:</span>
                      <div className="flex gap-1 flex-wrap">
                        {user.permissions.map((permission, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;