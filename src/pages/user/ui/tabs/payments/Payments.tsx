import Table from '@/components/table/Table';

export const Payments = () => {
  return (
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
    </Table>
  );
};
