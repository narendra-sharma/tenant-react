import * as React from 'react';
import { forgot_password } from '@/reduxData/user/userAction';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { SplitLayout } from '@/components/auth/split-layout';

const metadata = {
  title: `Reset Password | ${config.site.name}`,
};

export function Page() {
  const location = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  async function resendEmail() {
    const data = await forgot_password(email, dispatch, null, { redirect: false });
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SplitLayout>
        <Stack spacing={3}>
          <Typography level="h3" textAlign="center">
            Reset Password Sent
          </Typography>
        </Stack>
        <Stack alignItems={'center'} width={'100%'}>
          <Typography marginTop={'3vh'}>
            If an account exists with email "{email}", you will receive a recovery email.
          </Typography>
          <a
            style={{ color: '#443DF6',cursor:'pointer' }}
            fontSize={12}
            marginTop={5}
            marginBottom={5}
            fontWeight={500}
            onClick={() => navigateTo('/reset-password')}
          >
            Use another mail
          </a>
          <Button
            variant="contained"
            style={{ backgroundColor: '#443DF6', color: '#fff', width: '100%',marginTop:'12px' }}
            onClick={resendEmail}
            mt={5}
          >
            Resend
          </Button>
          <Typography marginTop={3} fontSize={10}>
            Wait a few minutes then try again
          </Typography>
        </Stack>
      </SplitLayout>
    </React.Fragment>
  );
}
