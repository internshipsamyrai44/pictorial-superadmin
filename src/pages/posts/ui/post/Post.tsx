import {ShowMoreButton} from "@/pages/posts/ui/showMoreButton/ShowMoreButton";
import TimeAgo from 'react-timeago';
import Image from "next/image";
import s from "@/pages/posts/ui/post/Post.module.scss";
import NoAvatar from '../../../../../public/img/noAvatar.png';
import {ImagePost as GraphQLImagePost} from '@/gql/graphql';
import {SliderPost} from "@/pages/posts/ui/slider/SliderPost";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BlockIcon} from "public/icons/BlockIcon";
import {GrayBlockIcon} from "public/icons/GrayBlockIcon";
import {useState} from 'react';
import {BanModal} from "@/pages/users/ui/user-table/user-row/ui/BanModal";
import {User} from '@/entities/user/types';
import {useUserInfo} from "@/pages/user-info/hooks/useUserInfo";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    // хук useUserInfo для получения isBanned info
    const {user} = useUserInfo(String(item.ownerId));

    const isUserBanned = user?.userBan;

    // Создаем объект пользователя для передачи в модальное окно
    const userForBan: User = {
        id: item.ownerId,
        userName: item.userName || (user?.userName || ''),
        email: '',
        createdAt: item.createdAt || (user?.createdAt || new Date().toISOString()),
        profile: {
            firstName: user?.profile?.firstName || '',
            lastName: user?.profile?.lastName || ''
        },
        userBan: isUserBanned
    };

    const images = Array.isArray(item.images) ? item.images : [];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <li className={s.postItem} key={item.id}>
            <article className={s.postContent}>
                <div className={s.imageContainer} role="region" aria-label="Post images">
                    {images.length > 0 ? (
                        <SliderPost
                            isDots={images.length > 1}
                            sizeBtn={24}
                            sliderLength={images.length}
                        >
                            {images.map((image, index) => {
                                const imageUrl = image?.url?.includes('...')
                                    ? image.url.replace('...', '')
                                    : image?.url || '';

                                return (
                                    <div key={index} className={s.slide}>
                                        <Image
                                            className={s.postImage}
                                            src={imageUrl || NoAvatar}
                                            alt={`${item.description || 'Post image'} ${index + 1} of ${images.length}`}
                                            width={image?.width || 230}
                                            height={image?.height || 230}
                                            priority={false}
                                        />
                                    </div>
                                );
                            })}
                        </SliderPost>
                    ) : (
                        <div className={s.noImage} role="status">No image available</div>
                    )}
                </div>

                <div className={s.infoContainer}>
                    <header className={s.header}>
                        <Image
                            className={s.avatar}
                            src={item.avatarOwner || NoAvatar}
                            alt={`${item.userName}'s avatar`}
                            width={36}
                            height={36}
                            priority={false}
                        />
                        <h3 className={s.userName}>{item.userName}</h3>
                        <button
                            className={s.blockIcon}
                            aria-label={isUserBanned ? "User is blocked" : "Ban in the system"}
                            title={isUserBanned ? "User is blocked" : "Ban in the system"}
                            onClick={openModal}
                        >
                            {isUserBanned ? <BlockIcon/> : <GrayBlockIcon/>}
                        </button>
                    </header>
                    <time className={s.time} dateTime={item.createdAt}>
                        <TimeAgo date={item.createdAt}/>
                    </time>
                    <div className={s.description}>
                        <ShowMoreButton maxLength={70} text={item.description || ''}/>
                    </div>
                </div>
            </article>

            {isModalOpen && <BanModal user={userForBan} onClose={closeModal}/>}
        </li>
    );
}
