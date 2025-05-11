import {ShowMoreButton} from "@/pages/posts/ui/showMoreButton/ShowMoreButton";
import TimeAgo from 'react-timeago';
import Image from "next/image";
import s from "@/pages/posts/ui/post/Post.module.scss";
import NoAvatar from '../../../../../public/img/noAvatar.png';
import {BlockIcon} from "public/icons/BlockIcon";
import {ImagePost} from '@/entities/posts/types';

type PostProps = {
    item: {
        id: number;
        images: ImagePost[];
        description: string;
        avatarOwner: string;
        userName: string;
        ownerId: number;
        createdAt: string;
    };
};

export default function Post({item}: PostProps) {
    const firstImage = item.images[0];

    return (
        <li className={s.postItem}>
            <div className={s.imageWrapper}>
                {firstImage?.url ? (
                    <Image
                        className={s.image}
                        src={firstImage.url}
                        alt={item.description || 'Post image'}
                        width={firstImage.width || 500}
                        height={firstImage.height || 500}
                        priority={false}
                    />
                ) : (
                    <div className={s.noImage}>No image available</div>
                )}

                <div className={s.userLink}>
                    <div className={s.userAvatarLink}>
                        <Image
                            className={s.avatar}
                            src={item.avatarOwner || NoAvatar}
                            alt="user avatar"
                            width={36}
                            height={36}
                            priority={false}
                        />
                        <h3 className={s.userName}>{item.userName}</h3>
                        <div className={s.blockIcon}>
                            <BlockIcon/>
                        </div>
                    </div>
                </div>

                <div className={s.time}>
                    <TimeAgo date={item.createdAt}/>
                </div>

                <div className={s.description}>
                    <ShowMoreButton maxLength={70} text={item.description}/>
                </div>
            </div>
        </li>
    );
}
