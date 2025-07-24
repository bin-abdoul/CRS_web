import React from "react";
import {
  X,
  MapPin,
  Clock,
  Phone,
  Globe,
  MessageSquare,
  AlertTriangle,
  Hash,
  Send,
  User,
  CalendarDays,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const GroupedReports = ({ report, isOpen, onClose, messages }) => {
  if (!report) return null;

  // Filter messages related to this specific report
  const relatedMessages =
    messages?.filter((message) => {
      const locationMatch =
        message.location?.toLowerCase().trim() ===
        report.location?.toLowerCase().trim();
      const issueMatch =
        message.issueType?.toLowerCase() === report.issueType?.toLowerCase();
      return locationMatch && issueMatch;
    }) || [];

  const getIssueTypeVariant = (type) => {
    const variants = {
      earthquake: "destructive",
      flood: "default",
      drought: "secondary",
      fire: "destructive",
      storm: "destructive",
      "heat wave": "destructive",
      landslide: "destructive",
    };
    return variants[type?.toLowerCase()] || "outline";
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Grouped Report Details - {report.location}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Header Info */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Badge
                variant={getIssueTypeVariant(report.issueType)}
                className="capitalize text-xs px-2 py-1 rounded-full font-medium"
              >
                <AlertTriangle className="size-4 mr-1" />
                {report.issueType}
              </Badge>
              <Badge
                variant="outline"
                className="font-mono text-xs px-2 py-1 rounded-full font-medium text-gray-600"
              >
                <Hash className="w-3 h-3 mr-1" />
                {report.count} Reports
              </Badge>
            </div>
          </div>

          {/* Main Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Location Card */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                  <MapPin className="size-4 text-red-500" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm">
                <p className="font-medium text-gray-900">
                  {report.location || "Not specified"}
                </p>
              </CardContent>
            </Card>

            {/* Report Count Card */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                  Total Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm">
                <p className="font-medium text-gray-900 text-2xl text-primary">
                  {report.count}
                </p>
                <p className="text-xs text-gray-500">reports this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Related Messages Section */}
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                Related Messages ({relatedMessages.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {relatedMessages.length > 0 ? (
                  relatedMessages.map((message, index) => (
                    <div
                      key={message.id || index}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              Reporter #{index + 1}
                            </p>
                            <p className="text-xs text-gray-500 font-mono">
                              {message.from || "Unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <CalendarDays className="h-3 w-3" />
                            {formatDate(message.date)}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {/* Original Message */}
                        {message.text && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 block mb-1">
                              Original Message:
                            </label>
                            <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                              <p className="italic text-gray-700 text-sm">
                                "{message.text}"
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Translation */}
                        {message.translatedText && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 block mb-1">
                              Translated Message:
                            </label>
                            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                              <p className="text-blue-800 font-medium text-sm">
                                "{message.translatedText}"
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Additional Details */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {message.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{message.location}</span>
                            </div>
                          )}
                          {message.language && (
                            <div className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              <span>{message.language}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No related messages found for this report.</p>
                    <p className="text-sm">
                      This might be a summary of multiple unreported incidents.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupedReports;
