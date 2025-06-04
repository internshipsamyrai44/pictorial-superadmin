'use client';

import {useState, useEffect, useRef} from 'react';
import Post from '@/pages/posts/ui/post/Post';
import s from './Posts.module.scss';
import {Input} from '@internshipsamyrai44-ui-kit/components-lib';
import {usePosts} from '../hooks/usePosts';
import {Loader} from '@/shared/components/loader/Loader';

export const Posts = () => {
    const [inputValue, setInputValue] = useState('');
    const {
        posts,
        loading,
        error,
        handleSearchChange,
        handleLoadMore,
        retry,
    } = usePosts();

    // Для бесконечной прокрутки
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!observerTarget.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    handleLoadMore();
                }
            },
            {
                root: null,
                rootMargin: '0px 0px 200px 0px',
                threshold: 0.1,
            }
        );

        const el = observerTarget.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [loading, handleLoadMore]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        handleSearchChange({
            currentTarget: {value},
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const postsToRender = Array.isArray(posts) ? posts : [];

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

            {postsToRender.length === 0 && !loading && !error && (
                <div className={s.emptyState}>
                    No posts found. Try changing your search criteria.
                </div>
            )}

            <div className={s.postList}>
                {postsToRender.map((post, idx) => {
                    if (!post) return null;

                    const isTrigger = idx === postsToRender.length - 5;

                    return (
                        <div
                            key={post.id}
                            ref={isTrigger ? observerTarget : null}
                            className={s.postWrapper}
                        >
                            <Post
                                item={{
                                    id: post.id,
                                    images: post.images || [],
                                    description: post.description || '',
                                    avatarOwner:
                                        post.postOwner?.avatars?.[0]?.url || '',
                                    userName:
                                        post.postOwner?.userName ||
                                        `${post.postOwner?.firstName || ''} ${
                                            post.postOwner?.lastName || ''
                                        }`
                                            .trim() ||
                                        'Unknown User',
                                    ownerId: post.ownerId,
                                    createdAt: post.createdAt || new Date().toISOString(),
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {loading && (
                <div className={s.loadingIndicator}>
                    <Loader/>
                </div>
            )}
        </div>
    );
};