import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      createdAt
      profile {
        firstName
        lastName
        avatars {
          url
        }
      }
    }
  }
`;
