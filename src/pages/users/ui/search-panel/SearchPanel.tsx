'use client';

import { Input, Select, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './SearchPanel.module.scss';
import React, { useState } from 'react';

type FilterOption = {
  label: string;
  value: string;
};

type SearchPanelProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (value: string) => void;
};

export enum FilterOptions {
  BLOCKED = 'BLOCKED',
  UNBLOCKED = 'UNBLOCKED',
  ALL = 'ALL'
}

const options = [
  {
    label: 'Blocked',
    value: FilterOptions.BLOCKED
  },
  {
    label: 'Not Blocked',
    value: FilterOptions.UNBLOCKED
  },
  {
    label: 'Not selected',
    value: FilterOptions.ALL
  }
];

export const SearchPanel = ({ searchTerm, onSearchChange, onFilterChange }: SearchPanelProps) => {
  const [filterValue, setFilterValue] = useState(FilterOptions.ALL);

  const handleFilterChange = (value: string) => {
    setFilterValue(value as FilterOptions);
    onFilterChange(value);
  };

  return (
    <div className={s.searchContainer}>
      <Input
        placeholder="Search"
        type="search"
        className={s.searchInput}
        value={searchTerm}
        onChange={onSearchChange}
      />
      <Select value={filterValue} onValueChange={handleFilterChange}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
