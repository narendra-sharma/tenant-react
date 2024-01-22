'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/custom/client';
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
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export function SignUpForm() {
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

      const { error } = await authClient.signUp(values);

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
        {/* <Stack spacing={2}>
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
              variant="outlined" style={ {borderColor: '#EAEEF6' , boxShadow: 'unset'}}
            >
              Continue with {provider.name} 
            </Button>
          ))}
        </Stack>
        <Divider style={{color:'#32383E'}}>or</Divider> */}
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
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} fullWidth type="submit"  style={{padding: '10px 10px'}}>
            Create Account
          </Button>
        </Stack>
        <Alert color="warning" variant="soft" style={{display: 'none'}}>
          <Typography fontSize="sm">Created users are not persisted</Typography>
        </Alert>
      </Stack>
    </form>
  );
}
