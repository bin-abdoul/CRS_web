import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Share,
  FileBarChart,
  PieChart,
  Activity,
  MapPin,
  AlertTriangle,
} from "lucide-react";

const chartData = {
  reportsTrend: [
    { month: "Jan", reports: 45 },
    { month: "Feb", reports: 52 },
    { month: "Mar", reports: 78 },
    { month: "Apr", reports: 65 },
    { month: "May", reports: 89 },
    { month: "Jun", reports: 97 },
    { month: "Jul", reports: 45 },
    { month: "Aug", reports: 52 },
    { month: "Sep", reports: 78 },
    { month: "Oct", reports: 65 },
    { month: "Nov", reports: 89 },
    { month: "Dec", reports: 99 },
  ],
  reportTypes: [
    { type: "Floods", count: 45, percentage: 35.4, color: "bg-blue-500" },
    { type: "Droughts", count: 32, percentage: 25.2, color: "bg-orange-500" },
    { type: "Storms", count: 28, percentage: 22.0, color: "bg-purple-500" },
    { type: "Heat Waves", count: 15, percentage: 11.8, color: "bg-red-500" },
    { type: "Others", count: 7, percentage: 5.5, color: "bg-gray-500" },
  ],
  topLocations: [
    { name: "Kawo, Kaduna state", reports: 34, trend: "up" },
    { name: "Bakin ruwa, Kaduna state", reports: 28, trend: "down" },
    { name: "zaria", reports: 23, trend: "up" },
    { name: "Kano", reports: 19, trend: "up" },
    { name: "Malalin gabas, Kaduna state", reports: 16, trend: "down" },
  ],
};

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive data analysis and climate reporting trends
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Reports
                </p>
                <p className="text-3xl font-bold text-primary">1,247</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +23% from last month
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <FileBarChart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Resolution Rate
                </p>
                <p className="text-3xl font-bold text-success">94.2%</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.1% improvement
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/10">
                <Activity className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Response Time
                </p>
                <p className="text-3xl font-bold text-warning">2.3m</p>
                <p className="text-sm text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  15% faster response
                </p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active States
                </p>
                <p className="text-3xl font-bold text-secondary">34</p>
                <p className="text-sm text-muted-foreground">
                  Out of 36 states
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/10">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Trend Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Reports Trend Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between gap-4 p-4">
              {chartData.reportsTrend.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div className="w-full flex flex-col gap-1">
                    <div
                      className="bg-primary rounded-t w-full transition-all duration-500 hover:bg-primary-hover"
                      style={{ height: `${(data.reports / 127) * 200}px` }}
                      title={`${data.reports} reports`}
                    />
                    <div
                      className="bg-success rounded-t w-full transition-all duration-500 hover:bg-success/80"
                      // style={{ height: `${(data.resolved / 127) * 200}px` }}
                      // title={`${data.resolved} resolved`}
                    />
                  </div>
                  <span className="text-sm font-medium">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span className="text-sm">Total Reports</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Types Pie Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-secondary" />
              Report Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.reportTypes.map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${type.color}`}></div>
                      <span className="font-medium">{type.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{type.count}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        ({type.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${type.color} transition-all duration-500`}
                      style={{ width: `${type.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">127</div>
                <div className="text-sm text-muted-foreground">
                  Total Reports This Month
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Affected Areas */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            Top 5 Most Affected Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.topLocations.map((location, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {location.reports} reports this month
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-lg">{location.reports}</div>
                    <div
                      className={`text-sm flex items-center gap-1 ${
                        location.trend === "up"
                          ? "text-destructive"
                          : "text-success"
                      }`}
                    >
                      <TrendingUp
                        className={`h-3 w-3 ${
                          location.trend === "down" ? "rotate-180" : ""
                        }`}
                      />
                      {location.trend === "up" ? "Increasing" : "Decreasing"}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
