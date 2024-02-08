'use client';

import { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { update_password } from '../../../reduxData/user/userAction';

export function UpdatePasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newpassword: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;

  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(formData);
    output.forEach(([key, value]) => {
      if (!value) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      } else if (value && key === 'newpassword' && !passwordRegex.test(value)) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'invalid' }));
      } else if (key === 'confirmpassword' && value !== formData?.newpassword) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'unmatch' }));
      }
    });
    return err;
  };

  const handleChange = (value, label) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      [label]: !value
        ? 'required'
        : label === 'newpassword' && !passwordRegex.test(value)
          ? 'invalid'
          : label === 'confirmpassword' && value !== formData?.newpassword
            ? 'unmatch'
            : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkAllErrors()) {
      return;
    }
    const userDataForm = {
      newUserPassword: formData.newpassword,
    };
    const { newpassword, confirmpassword } = formData;
    let data = await update_password(searchParams.get('token'), dispatch, userDataForm);
    if (data.data.status) {
      navigate('../../../');
    }
  };
  return (
    <form>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="newpassword" onChange={(e) => handleChange(e.target.value, 'newpassword')} />

            {errors.newpassword && (
              <FormHelperText style={{ color: 'red' }}>
                {errors.newpassword === 'required'
                  ? 'Password is required'
                  : 'Your new password must be more than 12 characters including 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol.'}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmpassword"
              onChange={(e) => handleChange(e.target.value, 'confirmpassword')}
            />
            {errors.confirmpassword ? (
              <FormHelperText style={{ color: 'red' }}>
                {errors.confirmpassword === 'required' ? 'Confirm password is requiredd' : 'Password does not match'}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button fullWidth type="submit" onClick={(e) => handleSubmit(e)}>
            Update Password
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
