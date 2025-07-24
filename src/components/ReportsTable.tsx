import React, { useState } from "react";
import {
  useGetMessagesQuery,
  useGetGroupedReportsQuery,
} from "@/api/requests/services.request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Phone,
  Radio,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import GroupedReports from "./GroupedReportModal";

export function ReportsTable() {
  const { data, isLoading, error } = useGetMessagesQuery("");
  const {
    data: groupedData,
    isLoading: loadingGrouped,
    error: groupedError,
  } = useGetGroupedReportsQuery();
  console.log({ groupedData });
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const severity = (num: any) => {
    if (num >= 1 && num <= 3) {
      return { text: "Low", style: "bg-success text-success-foreground" };
    } else if (num > 3 && num <= 7) {
      return { text: "Medium", style: "bg-warning text-warning-foreground" };
    } else if (num > 7 && num <= 15) {
      return {
        text: "High",
        style: "bg-destructive text-destructive-foreground",
      };
    } else {
      return { text: "...", style: "bg-muted text-muted-foreground" };
    }
  };

  const severityFilters = ["All", "High", "Medium", "Low"];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredReports = data?.filter((report) => {
    const matchesSearch =
      report.translatedText?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All";
    const matchesSeverity =
      severityFilter === "All" ||
      report.alertLevel === severityFilter.toLowerCase();
    const matchesChannel = channelFilter === "All";
    // || report.channel === channelFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesSeverity && matchesChannel;
  });

  const totalPages = Math.ceil(filteredReports?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports?.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold dashboard-gradient-text">
            Climate Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive view of all climate incident reports
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <div className="max-w-4xl">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports, locations, or IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredReports?.length}
                {/* ${md} */}
              </div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                
                {filteredReports?.length - 11}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">
                {filteredReports?.filter((r) => r.alertLevel === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Severity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                
              {filteredReports?.length - 5}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Reports Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupedData?.map((report, index) => {
              return (
                <div
                  key={`${report.location}-${report.issueType}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.location}</h3>
                      <p className="text-sm text-muted-foreground">
                        {report.count} reports this month
                      </p>
                    </div>
                  </div>
                  <button className="bg-gray-100 px-4 py-1 rounded-lg">
                    {report.issueType}
                  </button>
                  <button className={`${severity(report.count).style} px-4 py-1 rounded-lg`}>
                    {severity(report.count).text}
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-lg">{report.count}</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(report)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredReports?.length)} of{" "}
              {filteredReports?.length} reports
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-10"
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <GroupedReports
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport}
        messages={data}
      />
    </div>
  );
}
