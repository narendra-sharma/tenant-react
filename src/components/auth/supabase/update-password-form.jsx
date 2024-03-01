'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';

const schema = zod
  .object({
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    confirm: zod.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

const defaultValues = {
  password: '',
  confirm: '',
};

export function UpdatePasswordForm() {
  const [supabaseClient] = React.useState(createSupabaseClient());
  const navigate = useNavigate();
  const [isPending, setIsPending] = React.useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values) => {
      setIsPending(true);

      const { error } = await supabaseClient.auth.updateUser({
        password: values.password,
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        setIsPending(false);
        return;
      }

      navigate(paths['dashboard']);
    },
    [supabaseClient, navigate, setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <FormControl color={errors.password ? 'danger' : undefined}>
            <FormLabel>{t('Password')}</FormLabel>
            <Input type="password" {...register('password')} />
            {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
          </FormControl>
          <FormControl color={errors.confirm ? 'danger' : undefined}>
            <FormLabel>{t('ConfirmPass')}</FormLabel>
            <Input type="password" {...register('confirm')} />
            {errors.confirm ? <FormHelperText>{errors.confirm.message}</FormHelperText> : null}
          </FormControl>
          {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} fullWidth type="submit">
            {t('UpdatePass')}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
