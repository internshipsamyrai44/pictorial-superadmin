import Table from '@/components/table/Table';
import { useParams } from 'next/navigation';
import { ParamsType } from '@/pages/user/ui/header-user-info/HeaderUserInfo';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FollowersResponse } from '@/features/subscriptions/types';
import { GET_USER_FOLLOWERS, GET_USER_FOLLOWING } from '@/features/subscriptions/api';
import { SortBy, SortDirection } from '@/pages/user/ui/tabs/payments/Payments';
import { PaginationPanel } from '@/pages/users/ui/pagination-panel';
import { SubscriberRow } from '@/pages/user/ui/tabs/subscriber-row/SubscriberRow';

export const Following = () => {
  const { userId } = useParams() as ParamsType;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const { data } = useQuery<FollowersResponse>(GET_USER_FOLLOWING, {
    variables: {
      userId: Number(userId),
      page: page,
      pageSize: pageSize,
      pageNumber: 1,
      sortBy: SortBy.createdAt,
      sortDirection: SortDirection.DESC
    },
    fetchPolicy: 'network-only'
  });
  const response = data?.getFollowers;
  if (!response) return null;

  const following = response.items;
  const totalCount = response.totalCount;

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
          {following.map((follower) => (
            <SubscriberRow subscriber={follower} key={follower.id} />
          ))}
        </Table.Body>
      </Table>
      {totalCount > pageSize && (
        <PaginationPanel
          pageSize={pageSize.toString() || '10'}
          currentPage={page}
          totalCount={totalCount}
          onChangePage={(e) => setPage(e)}
          onChangePageSize={(value) => setPageSize(Number(value))}
        />
      )}
    </>
  );
};
