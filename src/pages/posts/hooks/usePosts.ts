import { useQuery } from '@apollo/client';
import { useState, useCallback, useEffect } from 'react';
import { GET_POSTS, POSTS_SUBSCRIPTION } from '@/entities/posts/api/queries';
import { SortDirection } from '@/entities/posts/types';
import { GetPostsQuery, GetPostsQueryVariables, OnNewPostSubscription } from '@/gql/graphql';

export const usePosts = () => {
    const [endCursorPostId, setEndCursorPostId] = useState<number | null>(0);
    const [pageSize, setPageSize] = useState<number>(18);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc);
    const [posts, setPosts] = useState<GetPostsQuery['getPosts']['items']>([]);

    const { loading, error, data, fetchMore, subscribeToMore } =
        useQuery<GetPostsQuery, GetPostsQueryVariables>(GET_POSTS, {
            variables: {
                endCursorPostId,
                pageSize,
                searchTerm,
                sortBy,
                sortDirection,
            },
            fetchPolicy: 'cache-and-network',
            onError: (error) => {
                console.error('Error fetching posts:', error);
            }
        });

    // приходят новые данные, просто сохраняем их в state
    useEffect(() => {
        if (data?.getPosts?.items) {
            setPosts(data.getPosts.items);
        }
    }, [data]);

    // подписка на новые посты в реальном времени
    useEffect(() => {
        let unsubscribe = () => {};
        
        try {
            unsubscribe = subscribeToMore<OnNewPostSubscription>({
                document: POSTS_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!prev.getPosts) return prev;
                    const newPost = subscriptionData?.data?.postAdded;
                    if (!newPost) return prev;
                    if (prev.getPosts.items.some(p => p.id === newPost.id)) return prev;

                    const items =
                        sortBy === 'createdAt' && sortDirection === SortDirection.Asc
                            ? [...prev.getPosts.items, newPost]
                            : [newPost, ...prev.getPosts.items];

                    return {
                        getPosts: {
                            ...prev.getPosts,
                            items,
                        },
                    };
                },
                onError: (error) => {
                    console.error('Subscription error:', error);
                }
            });
        } catch (error) {
            console.error('Failed to subscribe to posts:', error);
        }
        
        return () => unsubscribe();
    }, [subscribeToMore, sortBy, sortDirection]);

    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size);
        setEndCursorPostId(0);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value || '');
        setEndCursorPostId(0);
    }, []);

    const handleSortChange = useCallback(
        (field: string) => {
            if (sortBy === field) {
                setSortDirection(dir => (dir === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc));
            } else {
                setSortBy(field);
                setSortDirection(SortDirection.Desc);
            }
            setEndCursorPostId(0);
        },
        [sortBy]
    );

    const handleLoadMore = useCallback(() => {
        if (!posts.length) return;
        
        try {
            const lastId = posts[posts.length - 1].id;
            fetchMore({
                variables: { endCursorPostId: lastId },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult || !fetchMoreResult.getPosts || !prev.getPosts) return prev;
                    
                    return {
                        getPosts: {
                            ...fetchMoreResult.getPosts,
                            items: [...prev.getPosts.items, ...fetchMoreResult.getPosts.items],
                        },
                    };
                },
            }).catch(error => {
                console.error('Error loading more posts:', error);
            });
        } catch (error) {
            console.error('Failed to load more posts:', error);
        }
    }, [posts, fetchMore]);

    return {
        loading,
        error,
        posts: posts || [],
        pageSize,
        searchTerm,
        sortBy,
        sortDirection,
        endCursorPostId,
        handlePageSizeChange,
        handleSearchChange,
        handleSortChange,
        handleLoadMore,
        retry: () => {
            try {
                return fetchMore({ variables: { endCursorPostId: 0 } });
            } catch (error) {
                console.error('Error retrying fetch:', error);
                return Promise.reject(error);
            }
        },
    };
};
