export type FollowerType = {
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
};

export type FollowersResponse = {
  getFollowers: {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: FollowerType[];
  };
};
