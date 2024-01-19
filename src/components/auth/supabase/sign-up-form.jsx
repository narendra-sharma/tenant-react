'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import { Image } from '@/components/core/image';
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
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  terms: false,
};

export function SignUpForm() {
  const [supabaseClient] = React.useState(createSupabaseClient());
  const navigate = useNavigate();
  const { checkSession } = useUser();
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

  const onAuth = React.useCallback(
    async (provider) => {
      setIsPending(true);

      const redirectToUrl = new URL(paths['auth.supabase.callback'], window.location.origin);
      redirectToUrl.searchParams.set('next', paths['dashboard']);

      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectToUrl.href,
        },
      });

      if (error) {
        setIsPending(false);
        toast.error(error.message);
        return;
      }

      window.location.href = data.url;
    },
    [supabaseClient]
  );

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      // It is really important that you read the official notes
      // under "If signUp() is called for an existing confirmed user"
      // https://supabase.com/docs/reference/javascript/auth-signup
      // If a user already exists with this email, they will not
      // receive a confirmation email.

      const redirectToUrl = new URL(paths['auth.supabase.callback'], window.location.origin);
      redirectToUrl.searchParams.set('next', paths['dashboard']);

      const { data, error } = await supabaseClient.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: redirectToUrl.href,
        },
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        setIsPending(false);
        return;
      }

      if (data.session) {
        // Update the user context state
        await checkSession();

        // The page guard will redirect to the dashboard if the user is authenticated.
        navigate(0);
        return;
      }

      if (data.user) {
        const searchParams = new URLSearchParams({ email: values.email });
        navigate(`${paths['auth.supabase.sign-up-confirm']}?${searchParams.toString()}`);
        return;
      }

      setIsPending(false);
    },
    [supabaseClient, navigate, setError, checkSession]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {oAuthProviders.map((provider) => (
            <Button
              color="neutral"
              disabled={isPending}
              endDecorator={<Image alt="" height={24} src={provider.logo} width={24} />}
              key={provider.id}
              onClick={() => {
                onAuth(provider.id).catch(() => {
                  // noop
                });
              }}
              variant="outlined"
            >
              Continue with {provider.name}
            </Button>
          ))}
        </Stack>
        <Divider>or</Divider>
        <Stack spacing={2}>
          <FormControl color={errors.firstName ? 'danger' : undefined}>
            <FormLabel>First Name</FormLabel>
            <Input {...register('firstName')} />
            {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.lastName ? 'danger' : undefined}>
            <FormLabel>Last Name</FormLabel>
            <Input {...register('lastName')} />
            {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.email ? 'danger' : undefined}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" {...register('email')} />
            {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.password ? 'danger' : undefined}>
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register('password')} />
            {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.terms ? 'danger' : undefined}>
            <Checkbox label="I agree to the Terms and Conditions" {...register('terms')} />
            {errors.terms ? <FormHelperText>{errors.terms.message}</FormHelperText> : null}
          </FormControl>
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} fullWidth type="submit">
            Create Account
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
