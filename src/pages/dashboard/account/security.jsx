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
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '@/config';
import { SessionItem } from '@/components/dashboard/account/session-item';
import { useNavigate } from 'react-router';

const metadata = {
  title: `Security | ${config.site.name}`,
};

export function Page() {
  const [formData, setformData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [oldPassError, setoldPassError] = useState(null);
  const [newPassError, setnewPassError] = useState(null);
  const [confirmPassError, setconfirmPassError] = useState(null);
  const loginHistory = useSelector((state) => state.user.loginHistory);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.oldPassword == '' || formData.oldPassword == null) {
      setoldPassError('Current password is required');
    } else {
      setoldPassError(null);
    }

    if (formData.newPassword == '' || formData.confirmPassword == null) {
      setnewPassError('New password is required');
    } else {
      setnewPassError(null);
    }

    if (formData.confirmPassword == '' || formData.confirmPassword == null) {
      setconfirmPassError('Confirm password is required');
    } else if (formData.confirmPassword != formData.newPassword) {
      setconfirmPassError("Password doesn't match");
      return
    } else {
      setconfirmPassError(null);
    }
    if (formData.newPassword === formData.confirmPassword && formData.newPassword && formData.confirmPassword && !oldPassError && !newPassError && !confirmPassError) {
      console.log(formData.oldPassword,formData.newPassword,formData.confirmPassword )
      const { oldPassword, newPassword } = formData;
       change_password(dispatch, { oldPassword, newPassword });
    }
  };

  useEffect(() => {
    get_login_history(dispatch);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    switch (name) {
      case 'oldPassword':
        setoldPassError(value == null || value == '' ? 'Current password is required' : null);
        break;
      case 'newPassword':
        setnewPassError(
          value == null || value == ''
            ? 'New password is required'
            : value.length < 8
              ? 'Password must be greater than 8 digits'
              : null
        );
        break;
      case 'confirmPassword':
        setconfirmPassError(value == null || value == '' ? 'Confirm password is required' : null);
        break;
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Typography level="h4">Change Password</Typography>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl>
              <FormLabel>Current password</FormLabel>
              <Input
                defaultValue=""
                name="oldPassword"
                type="password"
                style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                onChange={(e) => handleChange(e)}
              />
              {oldPassError ? <FormHelperText style={{ color: 'red' }}>{oldPassError}</FormHelperText> : null}
            </FormControl>
            <FormControl>
              <FormLabel>New password</FormLabel>
              <Input
                defaultValue=""
                name="newPassword"
                type="password"
                style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                onChange={(e) => handleChange(e)}
              />
              <FormHelperText>Your new password must be more than 8 characters.</FormHelperText>
            </FormControl>
            {newPassError ? <FormHelperText style={{ color: 'red' }}>{newPassError}</FormHelperText> : null}
            <FormControl>
              <FormLabel>Confirm new password</FormLabel>
              <Input
                defaultValue=""
                name="confirmPassword"
                type="password"
                style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            {confirmPassError ? <FormHelperText style={{ color: 'red' }}>{confirmPassError}</FormHelperText> : null}
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
        <Stack spacing={3}>
          <div>
            <Typography level="h4">Login History</Typography>
            <Typography level="body-sm">Your recent login activity</Typography>
          </div>
          <List sx={{ '--List-gap': '24px' }}>
            {loginHistory.map((session) => (
              <div key={session?._id}>
              <SessionItem  session={session} />
              </div>
            ))}
          </List>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
