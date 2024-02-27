'  client';

import * as React from 'react';
import { create_user, update_user } from '@/reduxData/user/userAction';
import { FormHelperText, Link } from '@mui/joy';
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
import { Plus } from '@phosphor-icons/react/dist/ssr/Plus';
import Multiselect from 'multiselect-react-dropdown';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function UserCreateForm({ onDataFromChild }) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const { t } = useTranslation();
  const [cuser, setCuser] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    tenant_ids: [],
    permission_profile: 'tenant_manager',
  });

  const [errors, setErrors] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    tenant_ids: '',
    permission_profile: '',
  });
  const [tenatntList, setTenantList] = React.useState();

  const state = useSelector((state) => state);
  const id = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
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
    if (id.userId) {
      let datas = state?.user?.users;
      let result = datas?.filter((res) => {
        if (res._id === id.userId) {
          onDataFromChild('edit');
          setCuser({
            first_name: res?.first_name,
            last_name: res?.last_name,
            email: res?.email,
            phone_number: res?.phone_number,
            tenant_ids: res?.tenant_ids,
            permission_profile: 'tenant_manager',
          });
        }
      });
    }
  }, []);

  const handleElementChange = (value, label) => {
    if (value == 'Tenant Manager' && label == 'permission_profile') {
      value = 'tenant_manager';
    } else if (value == 'Tenant User' && label == 'permission_profile') {
      value = 'tenant_user';
    } else if (value == 'Tenant' && label == 'permission_profile') {
      value = 'tenant';
    }
    let ids = cuser?.tenant_ids || [];
    setCuser((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]:
        !value && label !== 'phone_number' ? 'required' : label === 'email' && !emailRegex.test(value) ? 'invalid' : '',
    }));
  };

  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(cuser);
    output.forEach(([key, value]) => {
      if (!value && key !== 'phone_number') {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      } else if (value && key === 'email' && !emailRegex.test(value)) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'invalid' }));
      }
    });
    return err;
  };

  const onSubmit = () => {
    console.log(cuser);
    if (checkAllErrors()) {
      return;
    }
    const tempData = cuser.tenant_ids;
    cuser.tenant_ids = cuser.tenant_ids.map((tenant) => tenant._id);
    if (id?.userId) {
      cuser.user_id = id?.userId;
      update_user(cuser, dispatch);
      cuser.tenant_ids = tempData;
    } else {
      create_user(cuser, dispatch);
      cuser.tenant_ids = tempData;
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
                  <FormLabel>{t('FirstName')}</FormLabel>
                  <Input
                    value={cuser?.first_name}
                    name="first_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'first_name')}
                  />
                  {errors.first_name && <FormHelperText style={{ color: 'red' }}>{t('FirstNameError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('LastName')}</FormLabel>
                  <Input
                    name="last_name"
                    value={cuser?.last_name}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'last_name')}
                  />
                  {errors.last_name && <FormHelperText style={{ color: 'red' }}>{t('LastNameError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Email')}</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={cuser?.email}
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'email')}
                  />
                  {errors.email && <FormHelperText style={{ color: 'red' }}>{t('EmailError')} </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('PhoneNumber')}</FormLabel>
                  <Input
                    name="phone_number"
                    value={cuser?.phone_number}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'phone_number')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Tenants')}</FormLabel>
                  {tenatntList && (
                    <Multiselect
                      options={tenatntList.data}
                      selectedValues={cuser.tenant_ids}
                      onSelect={onSelect}
                      displayValue="tenant_name"
                    />
                  )}
                  {errors.tenant_ids && <FormHelperText style={{ color: 'red' }}>{t('TenantError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Permission')}</FormLabel>
                  <Select
                    placeholder="Select a permission"
                    defaultValue={cuser.permission_profile}
                    // sx={{ width: 240 }}
                    onChange={(value) => value && handleElementChange(value.target.textContent, 'permission_profile')}
                  >
                    <Option value="tenant_manager">Tenant Manager</Option>
                    <Option value="tenant_user">Tenant User</Option>
                    <Option value="tenant">Tenant</Option>
                  </Select>
                  {errors.permission_profile && (
                    <FormHelperText style={{ color: 'red' }}>{t('PermissionError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Link
            component={RouterLink}
            fontSize="sm"
            fontWeight="md"
            href={paths['dashboard.admin.create.tenant']}
            underline="none"
          >
            <Plus size={20} style={{ marginRight: '10px' }} />
            {t('AddAnotherTenant')}
          </Link>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.user']} variant="outlined">
            {t('Cancel')}
          </Button>
          <Button type="submit">
            {id?.userId ? t('Update') : t('Create')}
            {t('User')}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state,
  };
};

export default connect(mapStateToProps)(UserCreateForm);
