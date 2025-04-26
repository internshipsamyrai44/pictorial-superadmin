export type SubscriberType = {
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
};

export type SubscribersResponse = {
  getFollowers?: {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: SubscriberType[];
  };
  getFollowing?: {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: SubscriberType[];
  };
};
