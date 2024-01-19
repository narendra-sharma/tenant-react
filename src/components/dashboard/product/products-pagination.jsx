'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';

import { Pagination } from '@/components/core/pagination';

// See orders pagination implementation
export function ProductsPagination() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination count={10} page={1} showFirstButton showLastButton size="sm" variant="outlined" />
    </Box>
  );
}
