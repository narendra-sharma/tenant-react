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
  const [newpassworderror, setNewpassworderror] = useState(null);
  const [confirmpassworderror, setconfirmPassworderror] = useState(null);
  const [formData, setFormData] = useState({
    newpassword: '',
    confirmpassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('custom-auth-token');
    if (formData.newpassword == '') {
      setNewpassworderror('New Password is Required');
    } else if (formData.newpassword.length < 5) {
      setNewpassworderror('Password length should be more than 5 characters');
    } else {
      setNewpassworderror(null);
    }

    if (formData.confirmpassword == '') {
      setconfirmPassworderror('Confirm Password is Required');
    } else if (formData.confirmpassword !== formData.newpassword) {
      setconfirmPassworderror("Password doesn't match");
    } else {
      setconfirmPassworderror(null);
    }

    if (formData.newpassword == formData.confirmpassword && !newpassworderror && !confirmpassworderror) {
      const userDataForm = {
        newUserPassword: formData.newpassword,
      };
      if(formData?.newpassword && formData?.confirmpassword){
        let data = await update_password(searchParams.get('token'), dispatch, userDataForm);
        if(data.data.status){
         navigate('../../../')
        }
      }
    
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    switch (name) {
      case 'newpassword':
        setNewpassworderror(
          value == '' || value == null
            ? 'New Password is Required'
            : value.length < 5
              ? 'Password must be greater than 5 digits '
              : null
        );
        break;
      case 'confirmpassword':
        setconfirmPassworderror(value == '' || value == null ? 'Confirm password is required' : null);
        break;
      default:
        break;
    }
  };

  return (
    <form>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <FormControl color={newpassworderror ? 'danger' : undefined}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="newpassword" onChange={(e) => handleChange(e)} />
            {newpassworderror ? <FormHelperText>{newpassworderror}</FormHelperText> : null}
          </FormControl>
          <FormControl color={confirmpassworderror ? 'danger' : undefined}>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="confirmpassword" onChange={(e) => handleChange(e)} />
            {confirmpassworderror ? <FormHelperText>{confirmpassworderror}</FormHelperText> : null}
          </FormControl>
          <Button fullWidth type="submit" onClick={(e) => handleSubmit(e)}>
            Update Password
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
