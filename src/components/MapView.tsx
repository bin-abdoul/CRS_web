import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Droplets,
  Sun,
  Wind,
  Thermometer,
  Layers,
  Maximize,
  Download,
  Minimize,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MessageMap } from "./messageMap";
import { useGetMessagesQuery } from "@/api/requests/services.request";

const recentPins = [
  {
    id: 1,
    title: "Severe Flooding",
    location: "Barnawa, Kaduna State",
    severity: "high",
    time: "2 mins ago",
    type: "flood",
    coordinates: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 2,
    title: "Drought Conditions",
    location: "Kano, Gwale LGA",
    severity: "medium",
    time: "15 mins ago",
    type: "drought",
    coordinates: { lat: 12.0022, lng: 8.592 },
  },
  {
    id: 3,
    title: "Storm Warning",
    location: "Kaduna, Zaria LGA",
    severity: "high",
    time: "23 mins ago",
    type: "storm",
    coordinates: { lat: 4.8156, lng: 7.0498 },
  },
];

export function MapView() {
  const { data, isLoading, error } = useGetMessagesQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
  });
  const [selectedFilter, setSelectedFilter] = useState("All Reports");
  const [showFullMap, setShowFullMap] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const issueTypeCounts = [];
  const uniqueIssueTypes = [
    ...new Set(data?.map((report) => report.issueType)),
  ];

  uniqueIssueTypes.forEach((issueType) => {
    const count =
      data?.filter((report) => report.issueType === issueType).length || 0;
    if (count > 0) {
      issueTypeCounts.push({ name: issueType, count: count });
    }
  });

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <Droplets className="h-4 w-4 text-blue-500" />;
      case "drought":
        return <Sun className="h-4 w-4 text-orange-500" />;
      case "storm":
        return <Wind className="h-4 w-4 text-purple-500" />;
      case "heatwave":
        return <Thermometer className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const severity = (num: any) => {
    if (num >= 1 && num <= 3) {
      return "bg-success text-success-foreground";
    } else if (num > 3 && num <= 7) {
      return "bg-warning text-warning-foreground";
    } else if (num > 7 && num <= 15) {
      return "bg-destructive text-destructive-foreground";
    } else {
      return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Live Incident Map
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time climate incidents across Nigeria
          </p>
        </div>
      </div>

      {/* Map Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <Button variant="outline" className="w-full justify-start mt-2">
                <Calendar className="h-4 w-4" />
                Last 24 hours
              </Button>
            </div>

            {/* Report Types */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Report Types
              </label>
              <div className="space-y-2">
                {issueTypeCounts.map((issue) => (
                  <Button
                    key={issue.name}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setSelectedFilter(issue.name)}
                  >
                    <div className={`flex items-center gap-2 `}>
                      <div
                        className={`w-3 h-3 rounded-full ${severity(
                          issue.count
                        )}`}
                      />
                      {issue.name}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${severity(issue.count)}`}
                    >
                      {issue.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Incidents */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Recent Incidents
              </label>
              <div className="space-y-3">
                {recentPins.map((incident) => (
                  <div
                    key={incident.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getIncidentIcon(incident.type)}
                        <div>
                          <h4 className="text-sm font-medium">
                            {incident.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {incident.location}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {incident.time}
                          </p>
                        </div>
                      </div>
                      {/* <Badge
                        className={`text-xs ${getSeverityColor(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </Badge> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Map */}
        <Card
          className={
            isFullscreen
              ? "fixed inset-0 z-50 h-screen w-screen overflow-hidden flex flex-col bg-white"
              : "relative lg:col-span-3 dashboard-card"
          }
        >
          <CardHeader className="flex  flex-row items-center overflow-hidden justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Nigeria Climate Incidents Map
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <>
                  <Minimize className="h-4 w-4 mr-1" />
                  Minimize
                </>
              ) : (
                <>
                  <Maximize className="h-4 w-4 mr-1" />
                  Fullscreen
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent className="h-full flex flex-col p-0">
            {showFullMap ? (
              <div className="max-h-[88%] rounded-lg border-2 border-dashed border-muted flex-1 w-full">
                <MessageMap />
              </div>
            ) : (
              <div className="max-h-[88%] flex-1 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-lg border-2 border-dashed border-muted relative overflow-hidden">
                {/* Map Placeholder */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                  {/* Simulated Map Pins */}
                  <div className="absolute top-1/4 left-1/3 animate-pulse">
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute top-4 left-1 animate-ping"></div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 animate-pulse">
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-4 left-1 animate-ping"></div>
                  </div>

                  <div className="absolute bottom-1/3 right-1/3 animate-pulse">
                    <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full absolute top-4 left-1 animate-ping"></div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce" />
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Interactive Climate Map
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Real-time incident tracking across all Nigerian states
                    </p>
                    <Button
                      variant="gradient"
                      size="lg"
                      onClick={() => setShowFullMap(true)}
                    >
                      <MapPin className="h-5 w-5" />
                      Initialize Live Map
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
