import {ShowMoreButton} from "@/pages/posts/ui/showMoreButton/ShowMoreButton";
import TimeAgo from 'react-timeago';
import Image from "next/image";
import s from "@/pages/posts/ui/post/Post.module.scss";
import NoAvatar from '../../../../../public/img/noAvatar.png';
import {BlockIcon} from "public/icons/BlockIcon";
import {ImagePost as GraphQLImagePost} from '@/gql/graphql';

type PostProps = {
    item: {
        id: number;
        images: GraphQLImagePost[];
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
        <li className={s.postItem} key={item.id}>
            {/* Основной контейнер поста */}
            <div className={s.postContent}>
                {/* Контейнер изображения */}
                <div className={s.imageContainer}>
                    {firstImage?.url ? (
                        <Image
                            className={s.postImage}
                            src={firstImage.url}
                            alt={item.description || 'Post image'}
                            width={firstImage.width || 230}
                            height={firstImage.height || 230}
                            priority={false}
                        />
                    ) : (
                        <div className={s.noImage}>No image available</div>
                    )}
                </div>

                {/* Контейнер информации */}
                <div className={s.infoContainer}>
                    <div className={s.header}>
                        <Image
                            className={s.avatar}
                            src={item.avatarOwner || NoAvatar}
                            alt="User avatar"
                            width={36}
                            height={36}
                            priority={false}
                        />
                        <h3 className={s.userName}>{item.userName}</h3>
                        <div className={s.blockIcon}>
                            <BlockIcon/>
                        </div>
                    </div>
                    <div className={s.time}>
                        <TimeAgo date={item.createdAt}/>
                    </div>
                    <div className={s.description}>
                        <ShowMoreButton maxLength={70} text={item.description}/>
                    </div>
                </div>
            </div>
        </li>
    );
}
