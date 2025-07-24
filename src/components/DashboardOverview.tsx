import React from "react";
import { useGetMessagesQuery } from "@/api/requests/services.request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  Zap,
  Phone,
  MessageSquare,
  Radio,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { MessageMap } from "./messageMap";
import ReportDetailsModal from "./messageModal";

export function DashboardOverview() {
  const { data, isLoading, error } = useGetMessagesQuery("");
  const [showFullMap, setShowFullMap] = React.useState(false);
  console.log(data);
  const calculateStats = (messages) => {
    if (!messages)
      return {
        totalReports: 0,
        todayReports: 0,
        highAlerts: 0,
        yesterdayReports: 0,
      };

    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    const todayReports = messages.filter(
      (msg) => new Date(msg.receivedAt).toDateString() === today
    ).length;

    const yesterdayReports = messages.filter(
      (msg) => new Date(msg.receivedAt).toDateString() === yesterday
    ).length;

    return {
      totalReports: messages.length,
      todayReports,
      yesterdayReports,
    };
  };
  const calculateChange = (current, previous) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  };
  const getClimateChangeIndicator = (current, previous) => {
    if (previous === 0) return current > 0 ? "up" : "neutral";
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? "up" : "down";
  };
  const stats = calculateStats(data);
  const todayChange = calculateChange(
    stats.todayReports,
    stats.yesterdayReports
  );
  const todayTrend = getClimateChangeIndicator(
    stats.todayReports,
    stats.yesterdayReports
  );

  const statsCards = [
    {
      title: "Reports Today",
      value: stats.todayReports,
      change: todayChange,
      trend: todayTrend,
      icon: FileText,
      color: "primary",
    },
    {
      title: "Total Reports",
      value: stats.totalReports.toString(),
      change: "+5.2%", // calculate this vs last week/month
      trend: "up",
      icon: Users,
      color: "success",
    },
    {
      title: "Unresolved Reports",
      value: "23",
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "warning",
    },
    {
      title: "Avg Response Time",
      value: "2.3m", // Calculate: (responded / total) * 100
      change: "-15%",
      trend: "down",
      icon: Zap,
      color: "success",
    },
  ];

  const channelStats = [
    {
      name: "SMS Reports",
      count: stats.totalReports,
      percentage: stats.totalReports,
      icon: MessageSquare,
    },
    { name: "Voice Calls", count: 0, percentage: 0, icon: Phone },
    { name: "USSD Reports", count: 0, percentage: 0, icon: Radio },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "escalated":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };
  const [selectedReport, setSelectedReport] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Climate Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay ahead of every storm — Real-time climate monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <Card key={index} className="dashboard-card hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div
                        className={`flex items-center text-xs ${
                          stat.trend === "up"
                            ? "text-destructive"
                            : stat.trend === "down"
                            ? "text-success"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stat.trend !== "stable" && (
                          <TrendIcon className="h-3 w-3" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                    <Icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map */}
        <Card className="lg:col-span-2 dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Incident Map
            </CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-dashed border-muted overflow-hidden">
              <div className="h-full w-full relative">
                {showFullMap ? (
                  <MessageMap />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <MapPin className="h-12 w-12 text-primary mb-2" />
                    <h3 className="text-lg font-semibold text-primary">
                      Interactive Map
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Real-time incident visualization across Nigeria
                    </p>
                    <Button
                      className="mt-2"
                      variant="gradient"
                      onClick={() => setShowFullMap(true)}
                    >
                      View Full Map
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Channel Statistics */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-secondary" />
              Report Channels
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelStats.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        {channel.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{channel.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports Table */}
      <Card className="dashboard-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Latest Reports
          </CardTitle>
          <Button variant="outline" size="sm">
            View All Reports
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.map((report, index) => (
              <div
                key={report?.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {/* {getStatusIcon(report.status)} */}
                    <span className="font-mono text-sm text-muted-foreground">
                      {report?.id.toString().slice(0, 12)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {report?.issueType.charAt(0).toUpperCase() +
                        report?.issueType.slice(1)}
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report?.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border`}
                  >
                    {report?.from}
                  </span>
                  <span className="text-xs px-2 py-1 bg-muted rounded">
                    {/* {report.channel} */}SMS
                  </span>
                  <span className="text-sm text-muted-foreground min-w-20">
                    {report?.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="dashboard-icon-bounce"
                    onClick={() => handleViewDetails(report)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            {selectedReport && (
              <ReportDetailsModal
                report={selectedReport}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
