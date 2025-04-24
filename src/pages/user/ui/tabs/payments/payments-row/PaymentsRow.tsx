import Table from '@/components/table/Table';
import { PaymentType } from '@/entities/payments/types';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';
import s from './PaymentsRow.module.css';

type Props = {
  payment: PaymentType;
};

const paymentTypeMap = {
  DAY: '1 day',
  WEEKLY: '7 days',
  MONTHLY: '30 days'
};

export const PaymentRow = ({ payment }: Props) => {
  const { startDate, endDate, price, paymentType, type } = payment;
  return (
    <Table.Row className={s.row}>
      <Table.Cell>{convertToLocalDate(startDate)}</Table.Cell>
      <Table.Cell>{convertToLocalDate(endDate)}</Table.Cell>
      <Table.Cell>${price}</Table.Cell>
      <Table.Cell>{paymentTypeMap[type]}</Table.Cell>
      <Table.Cell>{paymentType}</Table.Cell>
    </Table.Row>
  );
};
