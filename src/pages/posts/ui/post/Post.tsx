import {ShowMoreButton} from "@/pages/posts/ui/showMoreButton/ShowMoreButton";
import TimeAgo from 'react-timeago';
import Image from "next/image";
import s from "@/pages/posts/ui/post/Post.module.scss";
import NoAvatar from '../../../../../public/img/noAvatar.png';
import {BlockIcon} from "public/icons/BlockIcon";
import {ImagePost as GraphQLImagePost} from '@/gql/graphql';
import {SliderPost} from "@/pages/posts/ui/slider/SliderPost";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    return (
        <li className={s.postItem} key={item.id}>
            <article className={s.postContent}>
                <div className={s.imageContainer} role="region" aria-label="Post images">
                    {item.images.length > 0 ? (
                        <SliderPost 
                            isDots={item.images.length > 1}
                            sizeBtn={24}
                            sliderLength={item.images.length}
                        >
                            {item.images.map((image, index) => {
                                const imageUrl = image.url?.includes('...') 
                                    ? image.url.replace('...', '') 
                                    : image.url;
                                
                                return (
                                    <div key={index} className={s.slide}>
                                        <Image
                                            className={s.postImage}
                                            src={imageUrl || NoAvatar}
                                            alt={`${item.description || 'Post image'} ${index + 1} of ${item.images.length}`}
                                            width={image.width || 230}
                                            height={image.height || 230}
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
                            aria-label="Block user"
                            title="Block user"
                        >
                            <BlockIcon/>
                        </button>
                    </header>
                    <time className={s.time} dateTime={item.createdAt}>
                        <TimeAgo date={item.createdAt}/>
                    </time>
                    <div className={s.description}>
                        <ShowMoreButton maxLength={70} text={item.description}/>
                    </div>
                </div>
            </article>
        </li>
    );
}
