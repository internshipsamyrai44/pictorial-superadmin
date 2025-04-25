import { gql } from '@apollo/client';

export const GET_USER_FOLLOWERS = gql`
  query getFollowers($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
    getFollowers(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`;

export const GET_USER_FOLLOWING = gql`
  query getFollowing($userId: Int!, $pageSize: Int, $pageNumber: Int, $sortBy: String, $sortDirection: SortDirection) {
    getFollowing(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`;
