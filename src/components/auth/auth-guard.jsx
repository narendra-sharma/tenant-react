'use client';

import * as React from 'react';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';
import { useSelector } from 'react-redux';

export function AuthGuard({ children }) {
  const navigate = useNavigate();
  const { error, isLoading } = useUser();
  const user = localStorage.getItem('authUser');
  const [isChecking, setIsChecking] = React.useState(true);

  const checkPermissions = async () => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');

      switch (config.auth.strategy) {
        case AuthStrategy.CUSTOM: {
          navigate(paths['auth.custom.sign-in']);
          return;
        }
        case AuthStrategy.SUPABASE: {
          navigate(paths['auth.supabase.sign-in']);
          return;
        }
      }
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
