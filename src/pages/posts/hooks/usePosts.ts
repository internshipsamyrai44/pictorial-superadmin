import {useQuery, useSubscription} from '@apollo/client';
import {useState, useCallback, useEffect} from 'react';
import {GET_POSTS, POSTS_SUBSCRIPTION} from '@/entities/posts/api/queries';
import {PostsPaginationModel, SortDirection, Post} from '@/entities/posts/types';

export const usePosts = () => {
    // cursor-based pagination, filtering & sorting state
    const [endCursorPostId, setEndCursorPostId] = useState<number | null>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.DESC);
    const [posts, setPosts] = useState<Post[]>([]);

    // fetch posts
    const {loading, error, data, fetchMore} = useQuery<{ getPosts: PostsPaginationModel }>(GET_POSTS, {
        variables: {
            endCursorPostId: endCursorPostId ?? 0,
            searchTerm: searchTerm,
            pageSize,
            sortBy,
            sortDirection,
        },
        fetchPolicy: 'network-only',
    });

    // subscribe to new posts
    const { data: subscriptionData, error: subscriptionError } = useSubscription(POSTS_SUBSCRIPTION, {
        onError: (error) => {
            console.error('Subscription error:', error);
        },
        onComplete: () => {
            console.log('Subscription completed');
        },
        onData: ({ data }) => {
            console.log('New subscription data:', data);
        },
        shouldResubscribe: true,
        fetchPolicy: 'network-only'
    });

    // Update posts when initial data is loaded
    useEffect(() => {
        if (data?.getPosts.items) {
            setPosts(data.getPosts.items);
        }
    }, [data]);

    // Handle new posts from subscription
    useEffect(() => {
        if (subscriptionData?.newPost) {
            console.log('Received new post:', subscriptionData.newPost);
            setPosts(prevPosts => {
                // Check if post already exists
                const exists = prevPosts.some(post => post.id === subscriptionData.newPost.id);
                if (exists) {
                    return prevPosts;
                }
                // Add new post at the beginning if sorting by createdAt DESC
                if (sortBy === 'createdAt' && sortDirection === SortDirection.DESC) {
                    return [subscriptionData.newPost, ...prevPosts];
                }
                // Add new post at the end if sorting by createdAt ASC
                if (sortBy === 'createdAt' && sortDirection === SortDirection.ASC) {
                    return [...prevPosts, subscriptionData.newPost];
                }
                // For other sorting options, just add at the beginning
                return [subscriptionData.newPost, ...prevPosts];
            });
        }
    }, [subscriptionData, sortBy, sortDirection]);

    // Handle subscription errors
    useEffect(() => {
        if (subscriptionError) {
            console.error('Subscription error:', subscriptionError);
        }
    }, [subscriptionError]);

    // handlers
    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size);
        setEndCursorPostId(0);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
        setEndCursorPostId(0);
    }, []);

    const handleSortChange = useCallback((field: string) => {
        if (sortBy === field) {
            setSortDirection(dir => (dir === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC));
        } else {
            setSortBy(field);
            setSortDirection(SortDirection.DESC);
        }
        setEndCursorPostId(0);
    }, [sortBy]);

    const handleLoadMore = useCallback(() => {
        if (posts.length) {
            const lastId = posts[posts.length - 1].id;
            fetchMore({
                variables: {
                    endCursorPostId: lastId,
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        getPosts: {
                            ...fetchMoreResult.getPosts,
                            items: [...prev.getPosts.items, ...fetchMoreResult.getPosts.items],
                        },
                    };
                },
            });
        }
    }, [posts, fetchMore]);

    return {
        loading,
        error: error || subscriptionError,
        posts,
        pageSize,
        searchTerm,
        sortBy,
        sortDirection,
        endCursorPostId,
        handlePageSizeChange,
        handleSearchChange,
        handleSortChange,
        handleLoadMore,
        retry: () => fetchMore({variables: {endCursorPostId: 0}}),
    };
};
