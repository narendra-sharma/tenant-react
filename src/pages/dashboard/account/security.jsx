import * as React from 'react';
import { useEffect, useState } from 'react';
import { change_password, get_login_history } from '@/reduxData/user/userAction';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { config } from '@/config';
import { SessionItem } from '@/components/dashboard/account/session-item';

const metadata = {
  title: `Security | ${config.site.name}`,
};

export function Page() {
  const [formData, setformData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = React.useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const loginHistory = useSelector((state) => state.user.loginHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(formData);
    output.forEach(([key, value]) => {
      if (!value) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      } else if (value && key === 'newPassword' && !passwordRegex.test(value)) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'invalid' }));
      } else if (key === 'confirmPassword' && value !== formData?.newPassword) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'unmatch' }));
      }
    });
    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkAllErrors()) {
      return;
    }

    const { oldPassword, newPassword } = formData;
    change_password(dispatch, { oldPassword, newPassword });
  };

  useEffect(() => {
    get_login_history(dispatch);
  }, []);

  const handleChange = (value, label) => {
    setformData((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      [label]: !value
        ? 'required'
        : label === 'newPassword' && !passwordRegex.test(value)
          ? 'invalid'
          : label === 'confirmPassword' && value !== formData?.newPassword
            ? 'unmatch'
            : '',
    }));
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack divider={<Divider />} spacing={5}>
          <Stack spacing={3}>
            <Typography level="h4">Change Password</Typography>
            <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
              <FormControl>
                <FormLabel>Current password</FormLabel>
                <Input
                  name="oldPassword"
                  type="password"
                  style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  onChange={(e) => handleChange(e.target.value, 'oldPassword')}
                />
                {errors?.oldPassword ? (
                  <FormHelperText style={{ color: 'red' }}>Current password is required.</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>New password</FormLabel>
                <Input
                  name="newPassword"
                  type="password"
                  style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  onChange={(e) => handleChange(e.target.value, 'newPassword')}
                />
                {errors.newPassword && (
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.newPassword === 'required' ? 'New password is required' : 'Your new password must be more than 12 characters including 1 uppercase letter, 1 lowercase letter, 1 number, 1 symbol.'}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Confirm new password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
                />
                {errors?.confirmPassword && (
                  <FormHelperText style={{ color: 'red' }}>
                    {errors?.confirmPassword === 'required'
                      ? 'Confirm password is required'
                      : 'Password does not match'}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
                Discard
              </Button>
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <Typography level="h4">Password Device Renaming</Typography>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                defaultValue=""
                name="renamePasswoed"
                type="password"
                style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
              Discard
            </Button>
            <Button type="submit">Save Changes</Button>
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <div>
            <Typography level="h4">Login History</Typography>
            <Typography level="body-sm">Your recent login activity</Typography>
          </div>
          <List sx={{ '--List-gap': '24px' }}>
            {loginHistory.map((session) => (
              <div key={session?._id}>
                <SessionItem session={session} />
              </div>
            ))}
          </List>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
