import Table from '@/components/table/Table';

export const Following = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell>User ID</Table.Cell>
          <Table.Cell>Username</Table.Cell>
          <Table.Cell>Profile link</Table.Cell>
          <Table.Cell>Subscription date</Table.Cell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
};
