'use client';

import * as React from 'react';
import { FormHelperText } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Multiselect from 'multiselect-react-dropdown';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function DeviceCreateForm() {
  const [devices, setDevices] = React.useState({
    device_name: '',
    serial_number: '',
    client_first_name: '',
    client_last_name: '',
    tenant: '',
    status: '',
  });
  const [tenatntList, setTenantList] = React.useState()
  React.useEffect(() => {
    const url = import.meta.env.VITE_API_URL;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('custom-auth-token'),
      },
    };

    fetch(`${url}admin/tenant_list`, headers)
      .then(res => res.json()) 
      .then(data => {
        setTenantList(data)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [errors, setErrors] = React.useState({
    device_name: '',
    serial_number: '',
    client_first_name: '',
    client_last_name: '',
    tenant: '',
    status: '',
  });

  const handleElementChange = (value, label) => {
    setDevices((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      [label]: !value ? 'required' : '',
    }));
  };

  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(devices);
    output.forEach(([key, value]) => {
      if (!value) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      }
    });
    return err;
  };

  const onSubmit = () => {
    console.log(devices)
    if (checkAllErrors()) {
      return;
    }
    console.log(devices);
  };

  const  onSelect=(selectedList, selectedItem)=> {
    // console.log(selectedList,selectedItem)
    handleElementChange(selectedList,'tenant')
  }

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
                  <FormLabel>Device Name</FormLabel>
                  <Input
                    value={devices?.device_name}
                    name="device_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'device_name')}
                  />
                  {errors.device_name && (
                    <FormHelperText style={{ color: 'red' }}>Device Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Serial Number</FormLabel>
                  <Input
                    value={devices?.serial_number}
                    name="serial_number"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'serial_number')}
                  />
                  {errors.serial_number && (
                    <FormHelperText style={{ color: 'red' }}>Serial Number is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Client First Name</FormLabel>
                  <Input
                    value={devices?.client_first_name}
                    name="client_first_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'client_first_name')}
                  />
                  {errors.client_first_name && (
                    <FormHelperText style={{ color: 'red' }}>Client First Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Client Last Name</FormLabel>
                  <Input
                    value={devices?.client_last_name}
                    name="client_last_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'client_last_name')}
                  />
                  {errors.client_last_name && (
                    <FormHelperText style={{ color: 'red' }}>Client Last Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
              <FormControl>
                  <FormLabel>Tenant(s)</FormLabel>
                  {tenatntList && <Multiselect
                    options={tenatntList.data} 
                    selectedValues={tenatntList.selectedValue}
                    onSelect={onSelect}
                    displayValue="tenant_name" 
                  />}
                  {errors.tenant && <FormHelperText style={{ color: 'red' }}>Tenant is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select
                    name="status"
                    value={devices?.status}
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.textContent, 'status')}
                  >
                    <Option value="">Publish to Tenant</Option>
                    <Option value="ca">Publish to user</Option>
                  </Select>
                  {errors.client_first_name && (
                    <FormHelperText style={{ color: 'red' }}>Status is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.devices']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">Create Device</Button>
        </Stack>
      </Stack>
    </form>
  );
}
