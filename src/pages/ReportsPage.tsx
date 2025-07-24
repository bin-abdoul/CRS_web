import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ReportsTable } from '@/components/ReportsTable';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      <ReportsTable />
    </DashboardLayout>
  );
};

export default ReportsPage;