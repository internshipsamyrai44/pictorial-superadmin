import { gql } from '@apollo/client';

export const DELETE_USER = gql`
  mutation DeleteUser($userId: Int!) {
    deleteUser(userId: $userId) {
      success
      message
    }
  }
`;

export const BLOCK_USER = gql`
  mutation BlockUser($userId: Int!, $blocked: Boolean!) {
    blockUser(userId: $userId, blocked: $blocked) {
      success
      message
      user {
        id
        blocked
      }
    }
  }
`;
