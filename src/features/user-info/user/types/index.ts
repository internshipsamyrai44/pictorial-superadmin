export type ProfileType = {
  firstName: string;
  lastName: string;
  avatars: {
    url: string;
  }[];
};

export type UserBanType = {
  reason: string;
  createdAt: string;
};

export type UserResponse = {
  getUser: {
    id: number;
    userName: string;
    createdAt: string;
    profile: ProfileType;
    userBan?: UserBanType;
  };
};
