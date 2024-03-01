import * as React from 'react';
import { useEffect, useState } from 'react';
import { get_device_bySerialNumber, update_device_renaming } from '@/reduxData/devices/deviceAction';
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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { config } from '@/config';
import { SessionItem } from '@/components/dashboard/account/session-item';

const metadata = {
  title: `Security | ${config.site.name}`,
};

export function Page() {
  const { t } = useTranslation();
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

  const [devicePassword, setDevicePassword] = useState(null);
  const [deviceName, setDeviceName] = useState(null);

  React.useEffect(() => {
    const serialNumber = localStorage.getItem('serial_number');
    const fetchData = async () => {
      try {
        const data = await get_device_bySerialNumber(serialNumber, dispatch);
        setDevicePassword(data.data.data.device_renaming);
        setDeviceName(data.data.data.device_name);
      } catch (error) {
      }
    };
    if (serialNumber) {
      fetchData();
    }
  }, []);

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

  const updateDevicePassword = () => {
    const serialNumber = localStorage.getItem('serial_number');
    update_device_renaming(
      { device_renaming: devicePassword, serial_numer: serialNumber, device_name: deviceName },
      dispatch,
      true
    );
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack divider={<Divider />} spacing={5}>
          <Stack spacing={3}>
            <Typography level="h4">{t('ChangePassword')}</Typography>
            <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
              <FormControl>
                <FormLabel>{t('CurrentPassword')}</FormLabel>
                <Input
                  name="oldPassword"
                  type="password"
                  style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  onChange={(e) => handleChange(e.target.value, 'oldPassword')}
                />
                {errors?.oldPassword ? (
                  <FormHelperText style={{ color: 'red' }}>{t('CurrPassError')}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel>{t('NewPassword')}</FormLabel>
                <Input
                  name="newPassword"
                  type="password"
                  style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  onChange={(e) => handleChange(e.target.value, 'newPassword')}
                />
                {errors.newPassword && (
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.newPassword === 'required' ? t('NewPassError') : t('PassRegexError')}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>{t('ConfirmNewPassword')}</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                  onChange={(e) => handleChange(e.target.value, 'confirmPassword')}
                />
                {errors?.confirmPassword && (
                  <FormHelperText style={{ color: 'red' }}>
                    {errors?.confirmPassword === 'required' ? t('ConfirmPassError') : t('PassworNotMathcError')}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
                {t('Discard')}
              </Button>
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                {t('SaveChanges')}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <Typography level="h4">{t('PasswordDeviceRenaming')}</Typography>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="renamePasswoed"
                value={devicePassword}
                type="text"
                style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                onChange={(e) => setDevicePassword(e.target.value)}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
              {t('Discard')}
            </Button>
            <Button type="submit" onClick={() => updateDevicePassword()}>
              {t('SaveChanges')}
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3}>
          <div>
            <Typography level="h4">{t('LoginHistory')}</Typography>
            <Typography level="body-sm">{t('YourRecentLoginActivity')}</Typography>
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
