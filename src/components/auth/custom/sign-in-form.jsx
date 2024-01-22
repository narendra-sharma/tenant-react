'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { useUser } from '@/hooks/use-user';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';
import { toast } from '@/components/core/toaster';

const oAuthProviders = [
  {
    id: 'google',
    name: 'Google',
    logo: '/assets/logo-google.svg',
  },
  {
    id: 'discord',
    name: 'Discord',
    logo: '/assets/logo-discord.svg',
  },
];

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

const defaultValues = {
  email: '',
  password: '',
};

export function SignInForm() {
  const navigate = useNavigate();
  const { checkSession } = useUser();
  const [showPassword, setShowPassword] = React.useState();
  const [isPending, setIsPending] = React.useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onAuth = React.useCallback(async (provider) => {
    setIsPending(true);

    const { error } = await authClient.signInWithOAuth({ provider });

    if (error) {
      setIsPending(false);
      toast.error(error);
      return;
    }

    setIsPending(false);

    // Redirect to OAuth provider
  }, []);

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError('root', {
          type: 'server',
          message: error,
        });
        setIsPending(false);
        return;
      }

      // Update the user context state
      await checkSession();

      // The page guard will redirect to the dashboard if the user is authenticated.
      navigate(0);
    },
    [navigate, setError, checkSession]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='authform'>
      <Stack spacing={3}>
        <Stack spacing={2}>
        <Typography level="h3" textAlign="center">
              Sign In
            </Typography>
          <FormControl color={errors.email ? 'danger' : undefined}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" {...register('email')} />
            {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.password ? 'danger' : undefined}>
            <FormLabel>Password</FormLabel>
            <Input
              endDecorator={
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <EyeSlashIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                  ) : (
                    <EyeIcon style={{ fontSize: 'var(--Icon-fontSize)' }} weight="bold" />
                  )}
                </IconButton>
              }
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
          </FormControl>
          <div>
            <Link component={RouterLink} href={paths['auth.custom.reset-password']}>
              Fogot password?
            </Link>
          </div>
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} fullWidth type="submit" style={{padding: '10px 10px' , background:'#0074be'}}>
            Sign In
          </Button>
        </Stack>
        <Alert color="warning" variant="soft" style={{display: 'none'}}>
          <Typography fontSize="sm">
            Use <Typography fontWeight="lg">rene@devias.io</Typography> with password{' '}
            <Typography fontWeight="lg">Secret1</Typography>
          </Typography>
        </Alert>
      </Stack>
    </form>
  );
}
