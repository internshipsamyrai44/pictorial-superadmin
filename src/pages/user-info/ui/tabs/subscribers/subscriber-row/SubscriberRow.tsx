import Table from '@/components/table/Table';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';
import Link from 'next/link';
import s from './SubscriberRow.module.css';
import { SubscriberType } from '@/features/user-info/subscriptions/types';

type Props = {
  subscriber: SubscriberType;
};

export const SubscriberRow = ({ subscriber }: Props) => {
  const { id, userId, userName, createdAt } = subscriber;
  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{userName}</Table.Cell>
      <Table.Cell>
        <Link className={s.link} href={`https://pictorial.work/profile/${userId}`}>
          {userName}
        </Link>
      </Table.Cell>
      <Table.Cell>{convertToLocalDate(createdAt)}</Table.Cell>
    </Table.Row>
  );
};
