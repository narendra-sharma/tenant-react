'use client';

import * as React from 'react';
import { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { useUser } from '@/hooks/use-user';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';
import { toast } from '@/components/core/toaster';
import { login } from '@/reduxData/rootAction';


const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

export function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailerror, setEmailerror] = useState(null);
  const [passworderror, setPassworderror] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const exptest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (formData.email === '') {
      setEmailerror('Email is Required');
    } else if (!exptest.test(formData.email)) {
      setEmailerror('Email is Invalid');
    } else {
      setEmailerror(null);
    }

    if (formData.password === '') {
      setPassworderror('Password is Required');
    } else {
      setPassworderror(null);
    }

    if (formData.email !== '' && formData.password !== '') {
      await login(formData, dispatch,navigate);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setEmailerror(value === '' ? 'Email is Required' : !emailRegex.test(value) ? 'Email is Invalid' : null);
        break;
      case 'password':
        setPassworderror(
          value === ''
            ? 'Password is Required'
            : value.length < 5
              ? 'Password length should be more than 5 characters'
              : null
        );
        break;
      default:
        break;
    }
  };

  return (
    <form className="authform">
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography level="h3" textAlign="center">
            Sign In 
          </Typography>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" name="email" onChange={(e) => handleInputChange(e)} />
            {emailerror && <FormHelperText style={{ color: 'red' }}>{emailerror}</FormHelperText>}
          </FormControl>
          <FormControl>
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
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => handleInputChange(e)}
            />
            {passworderror && <FormHelperText style={{ color: 'red' }}>{passworderror}</FormHelperText>}
          </FormControl>
          <div>
            <Link component={RouterLink} href={paths['auth.custom.reset-password']}>
              Forgot password?
            </Link>
          </div>
          <Button
            fullWidth
            type="submit"
            style={{ padding: '10px 10px', background: '#0074be' }}
            onClick={(e) => handleSubmit(e)}
          >
            Sign In
          </Button>
        </Stack>
        <Alert color="warning" variant="soft" style={{ display: 'none' }}>
          <Typography fontSize="sm">
            Use <Typography fontWeight="lg">rene@devias.io</Typography> with password{' '}
            <Typography fontWeight="lg">Secret1</Typography>
          </Typography>
        </Alert>
      </Stack>
    </form>
  );
}
