import * as React from 'react';
import Box from '@mui/joy/Box';

export function ColumnList({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        gap: 3,
        overflowX: 'auto',
        overflowY: 'hidde',
        pb: 8,
        px: {
          xs: 2,
          sm: 3,
        },
        '& > *': {
          flexGrow: 0,
          minWidth: '300px',
          width: '342px',
        },
      }}
    >
      {children}
    </Box>
  );
}
