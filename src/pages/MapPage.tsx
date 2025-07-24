import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MapView } from '@/components/MapView';

const MapPage = () => {
  return (
    <DashboardLayout>
      <MapView />
    </DashboardLayout>
  );
};

export default MapPage;