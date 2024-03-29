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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function DeviceCreateForm({ onDataFromChild }) {
  const { t } = useTranslation();
  const [devices, setDevices] = React.useState({
    device_name: '',
    serial_number: '',
    client_firstname: '',
    client_lastname: '',
    tenant_ids: null,
    device_publish: '',
  });
  const state = useSelector((state) => state);
  const [tenatntList, setTenantList] = React.useState();
  const dispatch = useDispatch();
  const id = useParams();
  const navigate = useNavigate()
  React.useEffect(() => {
    if (id.deviceId) {
      let data = state.device.devices.filter((res) => {
        if (res.serial_number === id.deviceId) {
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
            device_publish: res?.device_publish,
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

  const currentUserRole = JSON.parse(localStorage.getItem('authUser'))?.role
  const permissions = JSON.parse(localStorage.getItem('permissions'))

  const [errors, setErrors] = React.useState({
    device_name: '',
    serial_number: '',
    client_firstname: '',
    client_lastname: '',
    tenant_ids: null,
    device_publish: '',
  });

  const handleElementChange = (value, label) => {
    setDevices((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]: !value 
        ? 'required'
        :
           '',
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
    if (checkAllErrors()) {
      return;
    }
    const tempData = devices.tenant_ids;
    if (id?.deviceId) {
      devices.device_id = id?.deviceId
      devices.tenant_ids = [devices.tenant_ids[0]._id]
      update_device(devices, dispatch,navigate)
      devices.tenant_ids = tempData
      // navigate('../../../admin/devices')
    }else{
      devices.tenant_ids = [devices.tenant_ids[0]._id]
      create_devices(devices, dispatch,navigate);
      devices.tenant_ids = tempData
      // navigate('../../../admin/devices')
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    handleElementChange(selectedList, 'tenant_ids');
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
                  <FormLabel>{t('DeviceName')}</FormLabel>
                  <Input
                    value={devices?.device_name}
                    name="device_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'device_name')}
                  />
                  {errors.device_name && (
                    <FormHelperText style={{ color: 'red' }}>{t('DeviceNameError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('SerialNumber')}</FormLabel>
                  <Input
                    value={devices?.serial_number}
                    disabled={devices?.serial_number && id?.deviceId ? true :false}
                    name="serial_number"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'serial_number')}
                  />
                  {errors.serial_number && (
                    <FormHelperText style={{ color: 'red' }}>{t('SerialNumberError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('ClientName')}</FormLabel>
                  <Input
                    value={devices?.client_firstname}
                    name="client_firstname"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'client_firstname')}
                  />
                  {errors.client_firstname && (
                    <FormHelperText style={{ color: 'red' }}>Client First Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('ClientLastName')}</FormLabel>
                  <Input
                    value={devices?.client_lastname}
                    name="client_lastname"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e?.target?.value, 'client_lastname')}
                  />
                  {errors.client_lastname && (
                    <FormHelperText style={{ color: 'red' }}>Client Last Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Tenants')}</FormLabel>
                  {tenatntList && (
                    <Multiselect
                      options={tenatntList.data}
                      selectedValues={devices?.tenant_ids}
                      onSelect={onSelect}
                      displayValue="tenant_name"
                      style={{ borderColor: '#EAEEF6' }}
                      singleSelect={true}
                    />
                  )}
                  {errors.tenant_ids && <FormHelperText style={{ color: 'red' }}>{t('TenantError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Status')}</FormLabel>
                  <select
                    name="device_publish"
                    value={devices?.device_publish}
                    onChange={(e) => handleElementChange(e?.target.value, 'device_publish')}
                    className="form-control"
                  >
                    <option value="" selected disabled>Select</option>
                    <option value="concept">Concept</option>
                    <option value="pt">Publish to Tenant</option>
                  </select>
                  {errors.device_publish && <FormHelperText style={{ color: 'red' }}>{t('StatusError')}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.devices']} variant="outlined">
            {t('Cancel')}
          </Button>
          <Button type="submit" disabled={currentUserRole=='admin'?false: !permissions['ADMIN Management']?.can_create_new_device} >{id?.deviceId ? t('Update') : t('Create')} {t('Device')}</Button>
        </Stack>
      </Stack>
    </form>
  );
}
