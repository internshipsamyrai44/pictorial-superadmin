'use client';

import { Payment, PaymentsortBy, SortDirection } from '@/entities/payments/types';
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
  currentSortColumn?: PaymentsortBy;
  currentSortDirection?: SortDirection;
};

const columns = [
  { id: 'userName', label: 'Username', sort: true },
  { id: 'createdAt', label: 'Date added', sort: true },
  { id: 'amount', label: 'Amount, $', sort: true },
  { id: 'subscription', label: 'Subscription', sort: false },
  { id: 'paymentMethod', label: 'Payment Method', sort: true }
];

export const PaymentsTable = ({ 
  loading, 
  error, 
  payments, 
  handleSortChange,
  currentSortColumn = 'createdAt',
  currentSortDirection = 'desc'
}: Props) => {
  const handleColumnClick = (columnId: PaymentsortBy) => {
    handleSortChange?.(columnId);
  };

  return (
    <table className={s.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.id}>
              <div className={col.sort ? s.headerCell : s.noSortHeaderCell}>
                {col.sort ? (
                  <span 
                    className={s.sortableLabel} 
                    onClick={() => handleColumnClick(col.id as PaymentsortBy)}
                  >
                    {col.label}
                    <Filter 
                      sortDir={currentSortColumn === col.id ? currentSortDirection : null} 
                    />
                  </span>
                ) : (
                  <span>{col.label}</span>
                )}
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
