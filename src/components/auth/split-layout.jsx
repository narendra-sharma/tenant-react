import * as React from 'react';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

import { config } from '@/config';
import { AuthStrategy } from '@/lib/auth/strategy';
import { Image } from '@/components/core/image';

export function SplitLayout({ children, strategy }) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            background: 'var(--joy-palette-neutral-950)',
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--joy-palette-neutral-950)',
          display: {
            xs: 'flex',
            md: 'grid',
          },
          flexDirection: 'column',
          gridTemplateColumns: {
            md: 'repeat(2, 1fr)',
          },
          minHeight: '100vh',
          gap: 3,
          p: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            bgcolor: 'var(--joy-palette-background-body)',
            borderRadius: 'var(--joy-radius-xl)',
            color: 'var(--joy-palette-text-primary)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Box sx={{ maxWidth: '420px', width: '100%' }}>{children}</Box>
          </Box>
          
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            color: 'var(--joy-palette-common-white)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: { xs: -1, md: 2 },
            p: 3,
            position: 'relative',
          }}
        >
          <Stack spacing={{ xs: '48px', sm: '64px', lg: '96px' }} sx={{ maxWidth: 'sm', mx: 'auto' }}>
              <Box>
                <Image
                  alt="photo"
                  priority
                  quality={100} 
                  src="/assets/logo.svg"

                  style={{ objectFit: 'cover' , maxWidth: '100%' , width:'100%'}}
                />
              </Box>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}
