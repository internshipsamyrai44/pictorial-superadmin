import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: String!
    $sortDirection: SortDirection!
    $searchTerm: String
    $statusFilter: UserBlockStatus
  ) {
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
      statusFilter: $statusFilter
    ) {
      users {
        id
        userName
        email
        createdAt
        profile {
          firstName
          lastName
        }
        userBan {
          reason
        }
      }
      pagination {
        pagesCount
        page
        pageSize
        totalCount
      }
    }
  }
`;

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

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: Int!, $endCursorId: Int) {
    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
      items {
        id
        url
      }
      totalCount
      pageSize
      pagesCount
    }
  }
`;
