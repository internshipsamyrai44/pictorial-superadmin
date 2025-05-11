import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query GetPosts(
        $endCursorPostId: Int = 0
        $searchTerm: String = ""
        $pageSize: Int = 10
        $sortBy: String = "createdAt"
        $sortDirection: SortDirection = desc
    ) {
        getPosts(
            endCursorPostId: $endCursorPostId
            searchTerm: $searchTerm
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            pageSize
            items {
                id
                description
                ownerId
                createdAt
                updatedAt
                images {
                    id
                    url
                    width
                    height
                    fileSize
                    createdAt
                }
                postOwner {
                    id
                    userName
                    firstName
                    lastName
                    avatars {
                        url
                        width
                        height
                        fileSize
                    }
                }
                userBan {
                    reason
                    createdAt
                }
            }
        }
    }
`;

export const POSTS_SUBSCRIPTION = gql`
    subscription OnNewPost {
        postAdded {
            id
            description
            ownerId
            createdAt
            updatedAt
            images {
                id
                url
                width
                height
                fileSize
                createdAt
            }
            postOwner {
                id
                userName
                firstName
                lastName
                avatars {
                    url
                    width
                    height
                    fileSize
                }
            }
            userBan {
                reason
                createdAt
            }
        }
    }
`;
