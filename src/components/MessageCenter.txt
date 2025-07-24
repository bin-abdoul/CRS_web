import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Send,
  Phone,
  Radio,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Volume2,
  FileText,
  Filter,
  Search,
  Plus
} from 'lucide-react';

const messageTemplates = [
  {
    id: 1,
    name: 'Flood Warning',
    type: 'Emergency',
    content: 'URGENT: Flood warning issued for your area. Seek higher ground immediately. Stay safe and follow emergency protocols.',
    category: 'Weather Alert',
    usage: 124
  },
  {
    id: 2,
    name: 'Drought Advisory',
    type: 'Advisory',
    content: 'Water conservation advisory in effect. Please conserve water and follow rationing guidelines. Monitor official updates.',
    category: 'Resource Management',
    usage: 89
  },
  {
    id: 3,
    name: 'Storm Alert',
    type: 'Emergency',
    content: 'Severe storm approaching. Secure loose objects, stay indoors, and avoid travel. Emergency services on standby.',
    category: 'Weather Alert',
    usage: 67
  },
  {
    id: 4,
    name: 'Heat Wave Warning',
    type: 'Health',
    content: 'Extreme heat warning. Stay hydrated, avoid outdoor activities during peak hours. Check on elderly neighbors.',
    category: 'Health Advisory',
    usage: 45
  }
];

const recentMessages = [
  {
    id: 'MSG-001',
    template: 'Flood Warning',
    recipients: 1247,
    channels: ['SMS', 'Voice'],
    status: 'delivered',
    timestamp: '2024-01-15 14:30:00',
    deliveryRate: 98.2,
    location: 'Lagos State'
  },
  {
    id: 'MSG-002',
    template: 'Drought Advisory',
    recipients: 856,
    channels: ['SMS', 'USSD'],
    status: 'sending',
    timestamp: '2024-01-15 13:45:00',
    deliveryRate: 76.5,
    location: 'Kano State'
  },
  {
    id: 'MSG-003',
    template: 'Storm Alert',
    recipients: 2103,
    channels: ['Voice', 'SMS'],
    status: 'delivered',
    timestamp: '2024-01-15 12:15:00',
    deliveryRate: 94.7,
    location: 'Rivers State'
  }
];

export function MessageCenter() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedChannels, setSelectedChannels] = useState(['SMS']);
  const [targetLocation, setTargetLocation] = useState('');
  const [recipientCount, setRecipientCount] = useState(0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'sending': return <Clock className="h-4 w-4 text-warning" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Voice': return <Phone className="h-4 w-4" />;
      case 'SMS': return <MessageSquare className="h-4 w-4" />;
      case 'USSD': return <Radio className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Message Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Send alerts and manage communication with communities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4" />
            Message History
          </Button>
          <Button variant="gradient" size="sm">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Composer */}
        <Card className="lg:col-span-2 dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Compose Alert Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quick Templates</label>
              <div className="grid grid-cols-2 gap-3">
                {messageTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setCustomMessage(template.content);
                    }}
                  >
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.type}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Content */}
            <div>
              <label className="text-sm font-medium mb-2 block">Message Content</label>
              <Textarea
                placeholder="Type your emergency alert message here..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {customMessage.length}/160 characters (SMS limit)
              </div>
            </div>

            {/* Channel Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Delivery Channels</label>
              <div className="flex gap-3">
                {['SMS', 'Voice', 'USSD'].map((channel) => (
                  <Button
                    key={channel}
                    variant={selectedChannels.includes(channel) ? "default" : "outline"}
                    onClick={() => toggleChannel(channel)}
                    className="flex items-center gap-2"
                  >
                    {getChannelIcon(channel)}
                    {channel}
                  </Button>
                ))}
              </div>
            </div>

            {/* Target Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Target Location</label>
                <Input
                  placeholder="e.g., Lagos State, All States"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Recipients</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-bold text-lg">{recipientCount || '0'}</span>
                  <span className="text-sm text-muted-foreground">people</span>
                </div>
              </div>
            </div>

            {/* Voice Preview */}
            {selectedChannels.includes('Voice') && (
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">Voice Call Preview</h4>
                      <p className="text-sm text-muted-foreground">
                        Message will be converted to speech and delivered as automated calls
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Volume2 className="h-4 w-4" />
                      Test Audio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Send Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="gradient" size="lg" className="flex-1">
                <Send className="h-5 w-5" />
                Send Alert Now
              </Button>
              <Button variant="outline" size="lg">
                Schedule Send
              </Button>
              <Button variant="outline" size="lg">
                Save as Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Templates & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Delivery Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-success/10">
                  <div className="text-2xl font-bold text-success">98.2%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-primary/10">
                  <div className="text-2xl font-bold text-primary">2.3s</div>
                  <div className="text-xs text-muted-foreground">Avg Delivery</div>
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold">12,547</div>
                <div className="text-xs text-muted-foreground">Messages Sent Today</div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Templates */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Popular Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {messageTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 rounded-lg border hover:bg-muted/50 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setCustomMessage(template.content);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {template.usage} uses
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Messages */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-secondary" />
            Recent Message Campaigns
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search campaigns..." className="pl-10 w-60" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(message.status)}
                      <div>
                        <h4 className="font-semibold">{message.template}</h4>
                        <p className="text-sm text-muted-foreground font-mono">
                          {message.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{message.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <span className="font-medium">{message.recipients.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-1">
                    {message.channels.map((channel, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-success">{message.deliveryRate}%</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}