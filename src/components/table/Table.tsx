import { ReactNode } from 'react';
import clsx from 'clsx';
import s from './Table.module.css';

type TableProps = {
  children: ReactNode;
  className?: string;
};

type SectionProps = {
  children: ReactNode;
  className?: string;
};

type CompoundTable = React.FC<TableProps> & {
  Header: React.FC<SectionProps>;
  Body: React.FC<SectionProps>;
  Row: React.FC<SectionProps>;
  Cell: React.FC<SectionProps>;
};

const Table: React.FC<TableProps> = ({ children, className }) => (
  <table className={clsx(s.table, className)}>{children}</table>
);

const Header: React.FC<SectionProps> = ({ children, className }) => (
  <thead className={clsx(s.head, className)}>{children}</thead>
);
const Body: React.FC<SectionProps> = ({ children, className }) => (
  <tbody className={clsx(s.body, className)}>{children}</tbody>
);

const Row: React.FC<SectionProps> = ({ children, className }) => <tr className={clsx(s.row, className)}>{children}</tr>;

const Cell: React.FC<SectionProps> = ({ children, className }) => (
  <td className={clsx(s.cell, className)}>{children}</td>
);

const TableComponent = Table as CompoundTable;

TableComponent.Header = Header;
TableComponent.Body = Body;
TableComponent.Row = Row;
TableComponent.Cell = Cell;

export default TableComponent;
