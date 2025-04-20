'use client';

import { Pagination, Select, SelectContainer, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './PaginationPanel.module.scss';

type PaginationPanelProps = {
  currentPage: number;
  pageSize: string;
  totalCount: number;
  onChangePage: (page: number) => void;
  onChangePageSize: (value: string) => void;
};

export const PaginationPanel = ({
  currentPage,
  pageSize,
  totalCount,
  onChangePage,
  onChangePageSize
}: PaginationPanelProps) => {
  return (
    <div className={s.paginationContainer}>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} pageSize={+pageSize} totalCount={totalCount} />
      <SelectContainer content={['Показать', 'на странице']}>
        <Select value={pageSize} onValueChange={onChangePageSize}>
          <SelectItem value="1">1</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </Select>
      </SelectContainer>
    </div>
  );
};
