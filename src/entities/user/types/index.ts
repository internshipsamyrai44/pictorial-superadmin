export type User = {
  id: number;
  userName: string;
  email: string;
  createdAt: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  userBan?: {
    reason: string;
  };
};

export type PaginationInfo = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum UserBlockStatus {
  BLOCKED = 'BLOCKED',
  UNBLOCKED = 'UNBLOCKED',
  ALL = 'ALL'
}

export type GetUsersVariables = {
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortDirection: SortDirection;
  searchTerm?: string;
  statusFilter?: UserBlockStatus;
};

export type UsersResponse = {
  getUsers: {
    users: User[];
    pagination?: {
      pageSize: number;
      currentPage: number;
      totalPages: number;
      totalCount: number;
    };
  };
};

export type DeleteUserVariables = {
  userId: number;
};

export type BanUserVariables = {
  userId: number;
  banReason: string;
};

export type BanUserResponse = {
  banUser: boolean;
};

export type UnbanUserVariables = {
  userId: number;
};

export type UnbanUserResponse = {
  unbanUser: boolean;
};

type ImagePost = {
  id: number;
  url: string;
  createdAt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
};

export type PostsByUseResponse = {
  getPostsByUser: {
    pagesCount: number;
    pageSize: number;
    totalCount: number;
    items: ImagePost[];
  };
};
