import { useCallback, useMemo, useState } from 'react';
import { Tabs, TabsContent, TabType } from '@internshipsamyrai44-ui-kit/components-lib';

import { Followers } from '@/pages/user/ui/tabs/folowers/Followers';
import { Payments } from '@/pages/user/ui/tabs/payments/Payments';
import { UploadedFiles } from '@/pages/user/ui/tabs/uploaded-files/UploadedFiles';
import { Following } from '@/pages/user/ui/tabs/following/Following';

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
        return <Followers />;
      case 'following':
        return <Following />;
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
