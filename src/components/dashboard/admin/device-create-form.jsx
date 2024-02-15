'use client';

import * as React from 'react';
import { create_devices, update_device } from '@/reduxData/devices/deviceAction';
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
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function DeviceCreateForm({ onDataFromChild }) {
  const [devices, setDevices] = React.useState({
    device_name: '',
    serial_number: '',
    client_firstname: '',
    client_lastname: '',
    tenant_ids: [],
    device_status: 'pt',
  });
  const state = useSelector((state) => state);
  const [tenatntList, setTenantList] = React.useState();
  const dispatch = useDispatch();
  const id = useParams();
  React.useEffect(() => {
    if (id.deviceId) {
      let data = state.device.devices.filter((res) => {
        if (res._id === id.deviceId) {
          onDataFromChild('edit');
        //  const ans = {
        //     data: res?.tenant_ids
        // };
          setDevices({
            device_name: res?.device_name,
            serial_number: res?.serial_number,
            client_firstname: res?.client_firstname,
            client_lastname: res?.client_lastname,
            tenant_ids: res?.tenant_ids,
            device_status: res?.device_status,
          });
        }
      });
    }

    const url = import.meta.env.VITE_API_URL;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('custom-auth-token'),
      },
    };

    fetch(`${url}admin/tenant_list`, headers)
      .then((res) => res.json())
      .then((data) => {
        setTenantList(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [errors, setErrors] = React.useState({
    device_name: '',
    serial_number: '',
    client_firstname: '',
    client_lastname: '',
    tenant_ids: '',
    device_status: '',
  });

  const handleElementChange = (value, label) => {

    setDevices((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]: !value && (label!=='client_firstname') && (label!=='client_lastname')
        ? 'required'
        :
           '',
    }));
  };

  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(devices);
    output.forEach(([key, value]) => {
      if (!value && (key!=='client_firstname') && (key!=='client_lastname')) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      }
    });
    return err;
  };

  const onSubmit = () => {
    if (checkAllErrors()) {
      return;
    }
    const tempData = devices.tenant_ids
    if (id?.deviceId) {
      devices.device_id = id?.deviceId
      devices.tenant_ids = [devices.tenant_ids[0]._id]
      update_device(devices, dispatch)
      devices.tenant_ids = tempData

    }else{
      devices.tenant_ids = [devices.tenant_ids[0]._id]
      create_devices(devices, dispatch);
      devices.tenant_ids = tempData
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    handleElementChange(selectedList,'tenant_ids')
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
                  <FormLabel>Device Name</FormLabel>
                  <Input
                    value={devices?.device_name}
                    name="device_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'device_name')}
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
                    onChange={(e) => handleElementChange(e?.target?.value, 'serial_number')}
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
                    value={devices?.client_firstname}
                    name="client_firstname"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'client_firstname')}
                  />
                  {/* {errors.client_firstname && (
                    <FormHelperText style={{ color: 'red' }}>Client First Name is required.</FormHelperText>
                  )} */}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Client Last Name</FormLabel>
                  <Input
                    value={devices?.client_lastname}
                    name="client_lastname"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'client_lastname')}
                  />
                  {/* {errors.client_lastname && (
                    <FormHelperText style={{ color: 'red' }}>Client Last Name is required.</FormHelperText>
                  )} */}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Tenant(s)</FormLabel>
                  {tenatntList && (
                    <Multiselect
                      options={tenatntList.data}
                      selectedValues={devices?.tenant_ids}
                      onSelect={onSelect}

                      displayValue="tenant_name" style={{ borderColor:"#EAEEF6"}}

                      singleSelect={true}

                    />
                  )}
                  {errors.tenant_ids && <FormHelperText style={{ color: 'red' }}>Tenant is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <select
                    name="device_status"
                    value={devices?.device_status}
                    
                    onChange={(e) => handleElementChange(e?.target.value, 'device_status')} className="form-control"
                  >
                    <option value="pt">Publish to Tenant</option>
                    {/* <option value="pu">Publish to user</option> */}
                  </select>
                  {errors.device_status && (
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
          <Button type="submit">{id?.deviceId ? 'Update' : 'Create'} Device</Button>
        </Stack>
      </Stack>
    </form>
  );
}
