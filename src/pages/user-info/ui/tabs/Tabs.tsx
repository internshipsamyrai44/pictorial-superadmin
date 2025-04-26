import { useCallback, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabType } from '@internshipsamyrai44-ui-kit/components-lib';

import { Subscribers } from '@/pages/user-info/ui/tabs/subscribers/Subscribers';
import { Payments } from '@/pages/user-info/ui/tabs/payments/Payments';
import { UploadedFiles } from '@/pages/user-info/ui/tabs/uploaded-files/UploadedFiles';

export const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('uploaded-files');

  const tabs = useMemo<TabType[]>(
    () => [
      { title: 'Uploaded files', value: 'uploaded-files' },
      { title: 'Payments', value: 'payments' },
      { title: 'Followers', value: 'followers' },
      { title: 'Following', value: 'following' }
    ],
    []
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'uploaded-files':
        return <UploadedFiles />;
      case 'payments':
        return <Payments />;
      case 'followers':
        return <Subscribers subscriberType={activeTab} />;
      case 'following':
        return <Subscribers subscriberType={activeTab} />;
      default:
        return <UploadedFiles />;
    }
  };

  const handleActiveTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <Tabs fullWidth tabs={tabs} defaultValue={activeTab} onValueChange={handleActiveTabChange}>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {renderActiveTab()}
        </TabsContent>
      ))}
    </Tabs>
  );
};
