import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`;

export const BAN_USER = gql`
  mutation BlockUser($userId: Int!, $banReason: String!) {
    banUser(userId: $userId, banReason: $banReason)
  }
`;

export const UNBAN_USER = gql`
  mutation unbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`;
