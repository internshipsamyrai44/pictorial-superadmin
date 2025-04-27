import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SubscribersResponse } from '@/features/user-info/subscriptions/types';
import { GET_USER_FOLLOWERS, GET_USER_FOLLOWING } from '@/features/user-info/subscriptions/api';
import { SortBy } from '@/pages/user-info/hooks/usePayments';
import { SortDirection } from '@/entities/user/types';
import { SubscriberPropsType } from '@/pages/user-info/ui/tabs/subscribers/Subscribers';

type Props = {
  userId: string;
  subscriberType: SubscriberPropsType;
};

export const useSubscribers = ({ userId, subscriberType }: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const subscriberQueryMap = {
    followers: GET_USER_FOLLOWERS,
    following: GET_USER_FOLLOWING
  };

  const { data, loading } = useQuery<SubscribersResponse>(subscriberQueryMap[subscriberType], {
    variables: {
      userId: Number(userId),
      page: currentPage,
      pageSize: pageSize,
      pageNumber: currentPage,
      sortBy: SortBy.createdAt,
      sortDirection: SortDirection.DESC
    },
    fetchPolicy: 'cache-first'
  });

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setCurrentPage(1);
  };

  const response = subscriberType === 'followers' ? data?.getFollowers : data?.getFollowing;

  return {
    subscribers: response?.items || [],
    totalCount: response?.totalCount || 0,
    loading,
    currentPage,
    pageSize,
    setCurrentPage,
    handlePageSizeChange
  };
};
