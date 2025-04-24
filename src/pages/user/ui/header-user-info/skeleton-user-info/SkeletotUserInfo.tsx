import clsx from 'clsx';
import s from './SkeletontUserInfo.module.scss';

export const SkeletonUserInfo = () => {
  return (
    <div className={s.main}>
      <div className={clsx(s.photoBlock, s.skeletonBlock)}>
        <div className={clsx(s.avatar, s.skeleton)} />
        <div className={s.nameBlock}>
          <div className={clsx(s.userName, s.skeleton)} />
          <div className={clsx(s.fullName, s.skeleton)} />
        </div>
      </div>
      <div className={s.infoBlock}>
        <div className={clsx(s.id, s.skeleton)} />
        <div className={clsx(s.id, s.skeleton)} />
      </div>
      <div className={s.infoBlock}>
        <div className={clsx(s.id, s.skeleton)} />
        <div className={clsx(s.id, s.skeleton)} />
      </div>
    </div>
  );
};
