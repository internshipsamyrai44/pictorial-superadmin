'use client';

import s from './TableRowSkeleton.module.css';

type Props = {
  quantity: number;
};

export default function TableRowSkeleton({ quantity = 16 }: Props) {
  return (
    <>
      {Array(quantity)
        .fill(null)
        .map((_, id) => (
          <div className={s.skeleton} key={id}></div>
        ))}
    </>
  );
}
