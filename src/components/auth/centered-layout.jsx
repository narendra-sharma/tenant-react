import * as React from 'react';
import Box from '@mui/joy/Box';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Tooltip from '@mui/joy/Tooltip';

import { AuthStrategy } from '@/lib/auth/strategy';
import { Image } from '@/components/core/image';

export function CenteredLayout({ children, strategy }) {
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
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            maxWidth: '500px',
            width: '100%',
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
          {strategy ? (
            <Box sx={{ p: 3 }}>
              {strategy === AuthStrategy.SUPABASE ? (
                <Tooltip color="neutral" placement="right-start" title="Authenticating with Supabase" variant="solid">
                  <Box
                    component="a"
                    href="https://supabase.com"
                    sx={{ display: 'inline-block', fontSize: 0 }}
                    target="_blank"
                  >
                    <Image alt="Supabase" height={40} src="/assets/logo-supabase.svg" width={40} />
                  </Box>
                </Tooltip>
              ) : null}
            </Box>
          ) : null}
        </Box>
      </Box>
    </React.Fragment>
  );
}
