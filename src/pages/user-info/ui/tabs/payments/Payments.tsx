import Table from '@/components/table/Table';
import { useParams } from 'next/navigation';
import { ParamsType } from '@/pages/user-info/ui/header-user-info/HeaderUserInfo';
import { PaymentRow } from '@/pages/user-info/ui/tabs/payments/payments-row/PaymentsRow';

import { PaginationPanel } from '@/shared/components/pagination-panel';
import { usePayments } from '@/pages/user-info/hooks/usePayments';
import TableRowSkeleton from '@/pages/user-info/ui/skeletons/table-row-skeleton/TableRowSkeleton';

export const Payments = () => {
  const { userId } = useParams() as ParamsType;
  const { payments, totalCount, loading, currentPage, pageSize, setCurrentPage, handlePageSizeChange } =
    usePayments(userId);

  const paymensColumns = [
    { key: 'startDate', label: 'Date of Payment' },
    { key: 'endDate', label: 'End date of Payment' },
    { key: 'price', label: 'Amount, $' },
    { key: 'subscriptionType', label: 'Subscription Type' },
    { key: 'paymentType', label: 'Payment Type' }
  ];
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            {paymensColumns.map((column) => (
              <Table.Cell key={column.key}>{column.label}</Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>{payments?.map((payment) => <PaymentRow payment={payment} key={payment.id} />)}</Table.Body>
      </Table>

      {loading && <TableRowSkeleton quantity={10} />}

      {totalCount > pageSize && (
        <PaginationPanel
          pageSize={pageSize.toString() || '10'}
          currentPage={currentPage}
          totalCount={totalCount as number}
          onChangePage={setCurrentPage}
          onChangePageSize={handlePageSizeChange}
        />
      )}
    </>
  );
};
