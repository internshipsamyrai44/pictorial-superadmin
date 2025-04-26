import Table from '@/components/table/Table';
import { useParams } from 'next/navigation';
import { ParamsType } from '@/pages/user-info/ui/header-user-info/HeaderUserInfo';

import { PaginationPanel } from '@/shared/components/pagination-panel';
import { useSubscribers } from '@/pages/user-info/hooks/useSubscribers';
import { SubscriberRow } from '@/pages/user-info/ui/tabs/subscribers/subscriber-row/SubscriberRow';
import TableRowSkeleton from '@/pages/user-info/ui/skeletons/table-row-skeleton/TableRowSkeleton';

export type SubscriberType = 'followers' | 'following';
type Props = {
  subscriberType: SubscriberType;
};

export const Subscribers = ({ subscriberType }: Props) => {
  const { userId } = useParams() as ParamsType;
  const { subscribers, loading, totalCount, currentPage, pageSize, setCurrentPage, handlePageSizeChange } =
    useSubscribers({
      userId,
      subscriberType
    });

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell>User ID</Table.Cell>
            <Table.Cell>Username</Table.Cell>
            <Table.Cell>Profile link</Table.Cell>
            <Table.Cell>Subscription date</Table.Cell>
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
