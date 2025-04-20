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
