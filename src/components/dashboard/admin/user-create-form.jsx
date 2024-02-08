'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function UserCreateForm() {
  const navigate = useNavigate();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [cuser, setCuser] = React.useState({
    firstName: '',
    lastNumber: '',
    email: '',
    phoneNumber: '',
    tenant1: '',
    permission: '',
  });

  const [errors, setErrors] = React.useState({
    firstName: '',
    lastNumber: '',
    email: '',
    phoneNumber: '',
    tenant1: '',
    permission: '',
  });

  const handleElementChange = (value, label) => {
    console.log(value, label);
    setCuser((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]:
        !value && label !== 'phoneNumber' ? 'required' : label === 'email' && !emailRegex.test(value) ? 'invalid' : '',
    }));
  };

  const onSubmit = () => {
    console.log('cuser', cuser);
    // navigate(paths['dashboard.admin.user']);
  };

  const handleChange = (event, newValue) => {
    setCuser.tenant1 = newValue;
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Stack divider={<Divider />} spacing={5}>
        <Stack spacing={3}>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={cuser?.firstName}
                    name="firstName"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'firstName')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastNumber"
                    value={cuser?.lastNumber}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'lastNumber')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={cuser?.email}
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'email')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="phoneNumber"
                    value={cuser?.phoneNumber}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'phoneNumber')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Tenant(s)</FormLabel>
                  {/* <Select
                    name="tenant1"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={handleChange}
                  >
                    <Option value="tenant1">Tenant 1</Option>
                    <Option value="tenant2">Tenant 2</Option>
                    <Option value="tenant3">Tenant 3</Option>
                  </Select> */}
                  <Select placeholder="Select a pet…" defaultValue="tenant1" sx={{ width: 240 }}  onChange={handleChange}>
                  <Option value="tenant1">Tenant 1</Option>
                    <Option value="tenant2">Tenant 2</Option>
                    <Option value="tenant3">Tenant 3</Option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Permision</FormLabel>
                  <Select
                    value={cuser?.permission}
                    name="permission"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'permission')}
                  >
                    <Option value="">Tenant Manager</Option>
                    <Option value="">Tenant User</Option>
                    <Option value="">Tenant</Option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.user']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Create Device</Button>
        </Stack>
      </Stack>
    </form>
  );
}
