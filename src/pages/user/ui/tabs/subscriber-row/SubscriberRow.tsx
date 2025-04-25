import Table from '@/components/table/Table';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';
import { FollowerType } from '@/features/subscriptions/types';
import Link from 'next/link';

type Props = {
  subscriber: FollowerType;
};

export const SubscriberRow = ({ subscriber }: Props) => {
  const { id, userId, userName, createdAt } = subscriber;
  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{userName}</Table.Cell>
      <Table.Cell>
        <Link href={`https://pictorial.work/profile/${userId}`}>{userName} Profile</Link>
      </Table.Cell>
      <Table.Cell>{convertToLocalDate(createdAt)}</Table.Cell>
    </Table.Row>
  );
};
