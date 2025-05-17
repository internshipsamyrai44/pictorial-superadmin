import * as React from 'react';

type FilterProps = {
  sortDir?: 'asc' | 'desc' | null;
};

const Filter = ({ sortDir }: FilterProps) => {
  const inactiveColor = "#4C4C4C";
  const activeColor = "#397DF6";

  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M4 -1.52588e-05L7.4641 4.49998H0.535898L4 -1.52588e-05Z" 
        fill={sortDir === 'asc' ? activeColor : inactiveColor} 
      />
      <path 
        d="M4 12L0.535898 7.49998L7.4641 7.49998L4 12Z" 
        fill={sortDir === 'desc' ? activeColor : inactiveColor} 
      />
    </svg>
  );
};

export default Filter;
