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

export type DeleteUserResponse = {
  deleteUser: {
    success: boolean;
    message: string;
  };
};

export type DeleteUserVariables = {
  userId: number;
};

export type BlockUserResponse = {
  blockUser: {
    success: boolean;
    message: string;
    user: {
      id: number;
      blocked: boolean;
    };
  };
};

export type BlockUserVariables = {
  userId: number;
  blocked: boolean;
};
