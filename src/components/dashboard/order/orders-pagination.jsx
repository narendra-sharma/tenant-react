'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { paths } from '@/paths';
import { Pagination } from '@/components/core/pagination';

export function OrdersPagination() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = React.useMemo(() => {
    if (!searchParams.has('page')) {
      return 1;
    }

    return parseInt(searchParams.get('page')) || 1;
  }, [searchParams]);

  const handleChange = (event, newPage) => {
    // NOTE: You might want to persist the other search params, such as filters.
    //  To have that, you can initiate the constructor with the `searchParams` data.

    const newSearchParams = new URLSearchParams();

    if (newPage) {
      newSearchParams.set('page', newPage.toString());
    }

    navigate(`${paths['dashboard.orders']}?${newSearchParams.toString()}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={10}
        onChange={handleChange}
        page={page}
        showFirstButton
        showLastButton
        size="sm"
        variant="outlined"
      />
    </Box>
  );
}
