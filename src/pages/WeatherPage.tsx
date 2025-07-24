import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle
} from 'lucide-react';

const WeatherPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold dashboard-gradient-text">
              Weather Alerts
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time weather monitoring and early warning system
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardContent className="p-6 text-center">
              <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold">Heat Wave</h3>
              <p className="text-2xl font-bold text-yellow-500">42°C</p>
              <p className="text-sm text-muted-foreground">Sokoto State</p>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardContent className="p-6 text-center">
              <CloudRain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold">Heavy Rain</h3>
              <p className="text-2xl font-bold text-blue-500">85mm</p>
              <p className="text-sm text-muted-foreground">Lagos State</p>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardContent className="p-6 text-center">
              <Wind className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold">Strong Winds</h3>
              <p className="text-2xl font-bold text-purple-500">65km/h</p>
              <p className="text-sm text-muted-foreground">Rivers State</p>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-semibold">Drought</h3>
              <p className="text-2xl font-bold text-orange-500">45 days</p>
              <p className="text-sm text-muted-foreground">Kano State</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Active Weather Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Cloud className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Weather System Integration
              </h3>
              <p className="text-muted-foreground mb-4">
                Connect with meteorological services for real-time weather data
              </p>
              <Button variant="gradient">
                Configure Weather API
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WeatherPage;