'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Box from '@mui/joy/Box';

export function ColumnDroppable({ children, id }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: 'column',
    },
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...(isOver &&
          {
            // backgroundColor: 'var(--joy-palette-background-level1)',
          }),
      }}
    >
      {children}
    </Box>
  );
}
