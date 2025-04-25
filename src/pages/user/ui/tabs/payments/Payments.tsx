import Table from '@/components/table/Table';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ParamsType } from '@/pages/user/ui/header-user-info/HeaderUserInfo';
import { PaymentRow } from '@/pages/user/ui/tabs/payments/payments-row/PaymentsRow';
import { useState } from 'react';
import { PaginationPanel } from '@/pages/users/ui/pagination-panel';
import { GET_USER_PAYMENTS } from '@/features/payments/api';
import { PaymentResponse } from '@/features/payments/types';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortBy {
  createdAt = 'createdAt',
  paymentMethod = 'paymentMethod',
  status = 'status',
  dateOfPayment = 'dateOfPayment'
}

export const Payments = () => {
  const { userId } = useParams() as ParamsType;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const { data } = useQuery<PaymentResponse>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(userId),
      page: page,
      pageSize: pageSize,
      pageNumber: 1,
      sortBy: SortBy.createdAt,
      sortDirection: SortDirection.DESC
    },
    fetchPolicy: 'network-only'
  });

  const response = data?.getPaymentsByUser;
  if (!response) return null;
  const payments = response.items;
  const totalCount = response.totalCount;
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Date of Payment</Table.Cell>
            <Table.Cell>End date of Payment</Table.Cell>
            <Table.Cell>Amount, $</Table.Cell>
            <Table.Cell>Subscription Type</Table.Cell>
            <Table.Cell>Payment Type</Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {payments.map((payment) => (
            <PaymentRow payment={payment} key={payment.id} />
          ))}
        </Table.Body>
      </Table>
      <PaginationPanel
        pageSize={pageSize.toString() || '10'}
        currentPage={page}
        totalCount={totalCount}
        onChangePage={(e) => setPage(e)}
        onChangePageSize={(value) => setPageSize(Number(value))}
      />
    </>
  );
};
