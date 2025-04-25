import { gql } from '@apollo/client';

export const GET_PAYMENTS = gql`
  query getPayments(
    $pageSize: Int = 6
    $pageNumber: Int = 1
    # Сan sort by the following fields: createdAt, paymentMethod, amount, userName. Default: createdAt
    $sortBy: String = "createdAt"
    # Sorting management. Accepts only 'asc' or 'desc' values. Default: 'desc'..
    $sortDirection: SortDirection = desc
    $searchTerm: String
  ) {
    getPayments(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagesCount
      page
      pageSize
      totalCount
      items {
        id
        userId
        paymentMethod
        amount
        currency
        createdAt
        endDate
        type
        userName
        avatars {
          url
          width
          height
          fileSize
        }
      }
    }
  }
`;
