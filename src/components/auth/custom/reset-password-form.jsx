'use client';

import * as React from 'react';
import { useState } from 'react';
import { forgot_password } from '@/reduxData/user/userAction';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export function ResetPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailAdd, setemailAdd] = useState('');
  const [emailError, setemailError] = useState(null);

  const { t, i18n } = useTranslation();

  const handleSubmit = async (e) => {
    const redirect = true;
    e.preventDefault();
    const exptest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailAdd == '') {
      setemailError('Email is Required');
      return;
    } else if (!exptest.test(emailAdd)) {
      setemailError('Email is Invalid');
      return;
    } else {
      setemailError(null);
    }
    if (emailAdd !== '' || (emailAdd !== null && !emailError)) {
      await forgot_password(emailAdd, dispatch, navigate, redirect);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setemailAdd(value);
    switch (name) {
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        setemailError(value === '' ? 'Email is Required' : !emailRegex.test(value) ? 'Email is Invalid' : null);
        break;
      default:
        break;
    }
  };

  return (
    <form className="authform">
      <Stack spacing={3}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>{t('EmailAddr')}</FormLabel>
            <Input type="email" name="email" onChange={(e) => handleInputChange(e)} />
            {emailError && <FormHelperText style={{ color: 'red' }}>{emailError}</FormHelperText>}
          </FormControl>
          <Button
            onClick={(e) => handleSubmit(e)}
            fullWidth
            type="submit"
            style={{ padding: '10px 10px', background: '#0074be' }}
          >
            {t('SendResetLink')}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
