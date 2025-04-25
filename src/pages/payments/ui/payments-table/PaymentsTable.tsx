'use client';

import { Payment, PaymentsortBy } from '@/entities/payments/types';
import { PaymentRow } from './payment-row/PaymentRow';
import s from './PaymentsTable.module.scss';
import { PaymentsTableLoading } from './PaymentsTableLoading';
import { PaymentsTableError } from './PaymentsTableError';
import { PaymentsTableEmpty } from './PaymentsTableEmpty';
import Filter from '../../../../../public/icons/Filter';

type Props = {
  loading: boolean;
  error: any;
  payments?: Payment[];
  handleSortChange?: (columnId: PaymentsortBy) => void;
};

const columns = [
  { id: 'userName', label: 'Username', sort: true },
  { id: 'createdAt', label: 'Date added', sort: true },
  { id: 'amount', label: 'Amount, $', sort: true },
  { id: 'subscription', label: 'Subscription', sort: false },
  { id: 'paymentMethod', label: 'Payment Method', sort: true }
];

export const PaymentsTable = ({ loading, error, payments, handleSortChange }: Props) => {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.id} onClick={col.sort ? () => handleSortChange?.(col.id as PaymentsortBy) : undefined}>
              <div className={s.headerCell}>
                {col.label}
                {col.sort ? <Filter /> : null}
              </div>
            </th>
          ))}
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
