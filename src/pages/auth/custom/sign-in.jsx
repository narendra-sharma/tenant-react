import * as React from 'react';
import Stack from '@mui/joy/Stack';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/custom/sign-in-form';
import { SplitLayout } from '@/components/auth/split-layout';

const metadata = {
  title: `Sign In  | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SplitLayout>
        <Stack spacing={3}>
          <SignInForm />
        </Stack>
      </SplitLayout>
    </React.Fragment>
  );
}
