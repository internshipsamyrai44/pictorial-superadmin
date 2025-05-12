import {useQuery} from '@apollo/client';
import {useState, useCallback, useEffect} from 'react';
import {GET_POSTS, POSTS_SUBSCRIPTION} from '@/entities/posts/api/queries';
import {SortDirection} from '@/entities/posts/types';
import {GetPostsQuery, GetPostsQueryVariables, OnNewPostSubscription} from '@/gql/graphql';

export const usePosts = () => {
    const [endCursorPostId, setEndCursorPostId] = useState<number | null>(0);
    const [pageSize, setPageSize] = useState<number>(18);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc);
    const [posts, setPosts] = useState<GetPostsQuery['getPosts']['items']>([]);

    const {loading, error, data, fetchMore, subscribeToMore} =
        useQuery<GetPostsQuery, GetPostsQueryVariables>(GET_POSTS, {
            variables: {
                endCursorPostId,
                pageSize,
                searchTerm,
                sortBy,
                sortDirection
            },
            fetchPolicy: 'cache-and-network',
        });

    useEffect(() => {
        if (data?.getPosts.items) {
            setPosts(data.getPosts.items);
        }
    }, [data]);

    useEffect(() => {
        const unsubscribe = subscribeToMore<OnNewPostSubscription>({
            document: POSTS_SUBSCRIPTION,
            updateQuery: (prev, {subscriptionData}) => {
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
        });
        return () => unsubscribe();
    }, [subscribeToMore, sortBy, sortDirection]);

    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size);
        setEndCursorPostId(0);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
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
        const lastId = posts[posts.length - 1].id;
        fetchMore({
            variables: {endCursorPostId: lastId},
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
    }, [posts, fetchMore]);

    return {
        loading,
        error,
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