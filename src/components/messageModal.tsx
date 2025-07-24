import React from 'react';
import { X, MapPin, Clock, Phone, Globe, MessageSquare, AlertTriangle, Hash, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ReportDetailsModal = ({ report, isOpen, onClose }) => {
  if (!report) return null;

  const getIssueTypeVariant = (type) => {
    const variants = {
      earthquake: 'destructive',
      flood: 'default',
      drought: 'secondary',
      fire: 'destructive'
    };
    return variants[type?.toLowerCase()] || 'outline';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg">
        <DialogHeader className="pb-4"> 
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Report Details
          </DialogTitle>
          
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Header Info */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2"> 
              {report.issueType && (
                <Badge variant={getIssueTypeVariant(report.issueType)} className="capitalize text-xs px-2 py-1 rounded-full font-medium">
                  <AlertTriangle className="size-4 mr-1" />
                  {report.issueType}
                </Badge>
              )}
              {report.id && (
                <Badge variant="outline" className="font-mono text-xs px-2 py-1 rounded-full font-medium text-gray-600">
                  <Hash className="w-3 h-3 mr-1" />
                  {report.id.slice(0, 8)}...
                </Badge>
              )}
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
                <p className="font-medium text-gray-900">{report.location || 'Not specified'}</p>
                {(report.lat && report.lng) && (
                  <p className="text-xs text-gray-500 mt-0.5 font-mono">
                    {report.lat.toFixed(5)}, {report.lng.toFixed(5)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Date & Time Card */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm">
                <p className="font-medium text-gray-900">{formatDate(report.date)}</p>
              </CardContent>
            </Card>

            {/* Reporter Card */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                  <Phone className="w-3.5 h-3.5 text-green-500" />
                  Reporter
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm">
                <p className="font-medium text-gray-900 font-mono">{report.from || 'Not provided'}</p>
              </CardContent>
            </Card>

            {/* Language Card */}
            <Card className="rounded-lg shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                  <Globe className="w-3.5 h-3.5 text-purple-500" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 text-sm">
                <p className="font-medium text-gray-900">{report.language || 'Not specified'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Message Cards */}
          <div className="space-y-3">
            {/* Original Message */}
            {report.text && (
              <Card className="rounded-lg shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                    <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
                    Original Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                    <p className="italic text-gray-700 text-sm">"{report.text}"</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Translation */}
            {report.translatedText && (
              <Card className="rounded-lg shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-1.5 text-gray-700">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    Translation
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <p className="text-blue-800 font-medium text-sm">"{report.translatedText}"</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Additional Details */}
          {(report.linkId || report.to) && (
            <>
              <Separator className="my-4" />
              <Card className="rounded-lg shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-700">Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {report.linkId && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1">Link ID</label>
                        <div className="bg-gray-50 p-2 rounded border border-gray-100 font-mono text-xs break-all">
                          {report.linkId}
                        </div>
                      </div>
                    )}
                    {report.to && (
                      <div>
                        <label className="text-xs font-medium text-gray-500 block mb-1">Destination</label> 
                        <div className="bg-gray-50 p-2 rounded border border-gray-100 font-mono font-medium text-xs"> 
                          <Send className="w-3.5 h-3.5 inline mr-1.5 text-gray-500" /> 
                          {report.to}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose} className="px-4 py-2 text-sm rounded-md">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailsModal;
