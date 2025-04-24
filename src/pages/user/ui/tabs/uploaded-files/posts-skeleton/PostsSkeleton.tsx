'use client';

import s from './PostsSkeleton.module.scss';

type Props = {
  quantity: number;
};

export default function PostsSkeleton({ quantity = 16 }: Props) {
  return (
    <>
      {Array(quantity)
        .fill(null)
        .map((_, id) => (
          <div className={s.postSkeleton} key={id}></div>
        ))}
    </>
  );
}
