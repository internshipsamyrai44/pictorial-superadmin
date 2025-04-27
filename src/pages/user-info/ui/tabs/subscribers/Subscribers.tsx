import Table from '@/components/table/Table';
import { useParams } from 'next/navigation';
import { ParamsType } from '@/pages/user-info/ui/header-user-info/HeaderUserInfo';

import { PaginationPanel } from '@/shared/components/pagination-panel';
import { useSubscribers } from '@/pages/user-info/hooks/useSubscribers';
import { SubscriberRow } from '@/pages/user-info/ui/tabs/subscribers/subscriber-row/SubscriberRow';
import TableRowSkeleton from '@/pages/user-info/ui/skeletons/table-row-skeleton/TableRowSkeleton';

export type SubscriberPropsType = 'followers' | 'following';
type Props = {
  subscriberType: SubscriberPropsType;
};

export const Subscribers = ({ subscriberType }: Props) => {
  const { userId } = useParams() as ParamsType;
  const { subscribers, loading, totalCount, currentPage, pageSize, setCurrentPage, handlePageSizeChange } =
    useSubscribers({
      userId,
      subscriberType
    });

  const subscribersColumns = [
    { key: 'userId', label: 'User ID' },
    { key: 'userName', label: 'Username' },
    { key: 'profileLink', label: 'Profile link' },
    { key: 'createdAt', label: 'Subscription date' }
  ];

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            {subscribersColumns.map((column) => (
              <Table.Cell key={column.key}>{column.label}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {subscribers?.map((subscriber) => <SubscriberRow subscriber={subscriber} key={subscriber.id} />)}
        </Table.Body>
      </Table>
      {loading && <TableRowSkeleton quantity={10} />}
      {totalCount > pageSize && (
        <PaginationPanel
          pageSize={pageSize.toString()}
          currentPage={currentPage}
          totalCount={totalCount}
          onChangePage={setCurrentPage}
          onChangePageSize={handlePageSizeChange}
        />
      )}
    </>
  );
};
