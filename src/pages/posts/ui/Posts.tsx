'use client';

import {useState, useEffect, useRef} from 'react';
import Post from '@/pages/posts/ui/post/Post';
import s from './Posts.module.scss';
import {Input} from "@internshipsamyrai44-ui-kit/components-lib";
import {usePosts} from '../hooks/usePosts';
import {Post as PostType} from '@/entities/posts/types';

export const Posts = () => {
    const [inputValue, setInputValue] = useState('');
    const {
        posts,
        loading,
        error,
        handleSearchChange,
        handleLoadMore,
        retry
    } = usePosts();

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    handleLoadMore();
                }
            },
            {
                root: null,
                rootMargin: '100px',
                threshold: 0.1
            }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loading, handleLoadMore]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        handleSearchChange({currentTarget: {value}} as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className={s.container}>
            <Input
                value={inputValue}
                placeholder="Search"
                type="search"
                onChangeValue={handleInputChange}
            />

            {error && (
                <div className={s.error}>
                    Error: {error.message}
                    <button onClick={() => retry()}>Retry</button>
                </div>
            )}

            <div className={s.postList}>
                {posts.map((post: PostType) => (
                    <Post
                        key={post.id}
                        item={{
                            id: post.id,
                            images: post.images,
                            description: post.description,
                            avatarOwner: post.postOwner?.avatars?.[0]?.url || '',
                            userName: post.postOwner?.userName || `${post.postOwner?.firstName || ''} ${post.postOwner?.lastName || ''}`.trim() || 'Unknown User',
                            ownerId: post.ownerId,
                            createdAt: post.createdAt
                        }}
                    />
                ))}
            </div>

            <div ref={observerTarget} className={s.loadingIndicator}>
                {loading && 'Loading...'}
            </div>
        </div>
    );
};

