'use client';

import { Payment } from '@/entities/payments/types';
import { PaymentRow } from './payment-row/PaymentRow';
import s from './PaymentsTable.module.scss';
import { PaymentsTableLoading } from './PaymentsTableLoading';
import { PaymentsTableError } from './PaymentsTableError';
import { PaymentsTableEmpty } from './PaymentsTableEmpty';

type Props = {
  loading: boolean;
  error: any;
  payments?: Payment[];
};

export const PaymentsTable = ({ loading, error, payments }: Props) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Date added</th>
          <th>Amount, $</th>
          <th>Subscription</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <PaymentsTableLoading />
        ) : error ? (
          <PaymentsTableError />
        ) : payments?.length === 0 ? (
          <PaymentsTableEmpty />
        ) : (
          payments?.map((p) => <PaymentRow key={p.id} payment={p} />)
        )}
      </tbody>
    </table>
  );
};
