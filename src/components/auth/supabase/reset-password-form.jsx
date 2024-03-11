// 'use client';

// import * as React from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Alert from '@mui/joy/Alert';
// import Button from '@mui/joy/Button';
// import FormControl from '@mui/joy/FormControl';
// import FormHelperText from '@mui/joy/FormHelperText';
// import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
// import Stack from '@mui/joy/Stack';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { z as zod } from 'zod';

// import { paths } from '@/paths';
// import { createClient as createSupabaseClient } from '@/lib/supabase/client';

// const schema = zod.object({
//   email: zod.string().min(1, { message: 'Email is required' }).email(),
// });

// const defaultValues = {
//   email: '',
// };

// export function ResetPasswordForm() {
//   const [supabaseClient] = React.useState(createSupabaseClient());
//   const navigate = useNavigate();
//   const [isPending, setIsPending] = React.useState(false);
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm({
//     defaultValues,
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = React.useCallback(
//     async (values) => {
//       setIsPending(true);

//       const redirectToUrl = new URL(paths['auth.supabase.callback'], window.location.origin);
//       redirectToUrl.searchParams.set('next', paths['auth.supabase.update-password']);

//       const { error } = await supabaseClient.auth.resetPasswordForEmail(values.email, {
//         redirectTo: redirectToUrl.href,
//       });

//       if (error) {
//         setError('root', {
//           type: 'server',
//           message: error.message,
//         });
//         setIsPending(false);
//         return;
//       }

//       const searchParams = new URLSearchParams({ email: values.email });
//       navigate(`${paths['auth.supabase.recover-link-sent']}?${searchParams.toString()}`);
//     },
//     [supabaseClient, navigate, setError]
//   );

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Stack spacing={3}>
//         <Stack spacing={2}>
//           <FormControl color={errors.email ? 'danger' : undefined}>
//             <FormLabel>Email Address</FormLabel>
//             <Input type="email" {...register('email')} />
//             {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
//           </FormControl>
//           {errors.root ? <Alert color="danger">{errors.root.message}</Alert> : null}
//           <Button disabled={isPending} fullWidth type="submit">
//           Send Reset Link
//           </Button>
//         </Stack>
//       </Stack>
//     </form>
//   );
// }
