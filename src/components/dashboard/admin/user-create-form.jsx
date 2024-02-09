'  client';

import * as React from 'react';
import { create_user, update_user } from '@/reduxData/user/userAction';
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
import { connect, useDispatch, useSelector } from 'react-redux';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { useParams } from 'react-router';

export function UserCreateForm({onDataFromChild}) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [cuser, setCuser] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    tenant_id: [],
    permission_profile: 'tenant_manager',
  });

  const [errors, setErrors] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    tenant_id: '',
    permission_profile: '',
  });
  const [tenatntList, setTenantList] = React.useState()

  const state = useSelector((state) => state);
  console.log(state)
  const id = useParams();
  const dispatch = useDispatch()

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
        // Handle errors if any
      });

      if (id.userId) {
        let datas = state?.user?.users?.data
        let result = datas?.filter((res) => {
          if (res._id === id.userId) {
            onDataFromChild('edit');
            setCuser({
              first_name: res?.first_name,
              last_name: res?.last_name,
              email: res?.email,
              phone_number: res?.phone_number,
              tenant_id: res?.tenant_ids,
              permission_profile: 'tenant_manager',
            });
          }
        });
      }
  }, []);

  const handleElementChange = (value, label) => {
    console.log(label, value);
    let ids = cuser?.tenant_id || [];
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
    console.log('cuser', cuser);
    if (checkAllErrors()) {
      return;
    }
    if(id?.userId){
      update_user(cuser,dispatch)
    }else{

      create_user(cuser, dispatch);
    }
  };

 const  onSelect=(selectedList, selectedItem)=> {
  handleElementChange(selectedList,'tenant_id')
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
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={cuser?.first_name}
                    name="first_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'first_name')}
                  />
                  {errors.first_name && (
                    <FormHelperText style={{ color: 'red' }}>First Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="last_name"
                    value={cuser?.last_name}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'last_name')}
                  />
                  {errors.last_name && <FormHelperText style={{ color: 'red' }}>Last Name is required.</FormHelperText>}
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
                  {errors.email && <FormHelperText style={{ color: 'red' }}>Email is required. </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
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
                  <FormLabel>Tenant(s)</FormLabel>
                  {tenatntList && <Multiselect
                    options={tenatntList.data} 
                    selectedValues={tenatntList.selectedValue}
                    onSelect={onSelect}
                    displayValue="tenant_name" 
                  />}
                  {errors.tenant_id && <FormHelperText style={{ color: 'red' }}>Tenant is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Permision</FormLabel>
                  <Select
                    placeholder="Select a permission"
                    defaultValue={cuser.permission_profile}
                    sx={{ width: 240 }}
                    onChange={(value) => value && handleElementChange(value.target.textContent, 'permission_profile')}
                  >
                    <Option value="tenant_manager">Tenant Manager</Option>
                    <Option value="tenant_user">Tenant User</Option>
                    <Option value="tenant">Tenant</Option>
                  </Select>
                  {errors.permission_profile && (
                    <FormHelperText style={{ color: 'red' }}>Permission is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.user']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">{id?.userId ? 'Update' : 'Create'} User</Button>
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