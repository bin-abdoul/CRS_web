import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { MessageCenter } from '@/components/MessageCenter';

const MessagePage = () => {
  return (
    <DashboardLayout>
      <MessageCenter />
    </DashboardLayout>
  );
};

export default MessagePage;