'use client';

import * as React from 'react';
import { create_tenant, update_tenant } from '@/reduxData/tenant/tenantAction';
import { FormHelperText } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { Country } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function TenantCreateForm({ onDataFromChild }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [cuser, setCuser] = React.useState({
    company_name: '',
    tenant_name: '',
    company_email: '',
    company_phone_number: '',
    tax_id: '',
    website: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    address: '',
    azure_cosmos: '',
    database_name: '',
    account_key: '',
  });
  const [countries, setCountries] = React.useState([]);
  const [errors, setErrors] = React.useState({
    company_name: '',
    tenant_name: '',
    company_email: '',
    company_phone_number: '',
    tax_id: '',
    website: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    address: '',
    azure_cosmos: '',
    database_name: '',
  });

  const id = useParams();
  React.useEffect(() => {
    if (id.tenantId) {
      let data = state.tenant.tenants.filter((res) => {
        if (res._id === id.tenantId) {
          onDataFromChild('edit');
          setCuser({
            company_name: res?.tenant_company_name,
            tenant_name: res?.tenant_name,
            company_email: res?.comapny_email,
            company_phone_number: res?.company_phone_number,
            tax_id: res?.company_tax_id,
            website: res?.company_website,
            country: res?.company_country,
            state: res?.company_state,
            city: res?.company_city,
            zip_code: res?.company_zip_code,
            address: res?.company_address,
            azure_cosmos: res?.setting_endpoint_uri,
            database_name: res?.setting_database_name,
            account_key: res?.setting_key,
          });
        }
      });
    }

    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);

  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(cuser);
    output.forEach(([key, value]) => {
      if (!value && key !== 'phone_number' && key !== 'company_phone_number' && key !== 'state' && key !== 'website') {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      } else if (value && (key === 'email' || key === 'companyEmail') && !emailRegex.test(value)) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'invalid' }));
      }
    });
    return err;
  };

  const onSubmit = React.useCallback(() => {
    if (checkAllErrors()) {
      return;
    }
    const formData = new FormData();
    formData.append('company_name', cuser?.company_name);
    formData.append('tenant_name', cuser?.tenant_name);
    formData.append('company_email', cuser?.company_email);
    formData.append('company_phone_number', cuser?.company_phone_number);
    formData.append('website', cuser?.website);
    formData.append('tax_id', cuser?.tax_id);
    formData.append('state', cuser?.state);
    formData.append('city', cuser?.city);
    formData.append('country', cuser?.country);
    formData.append('address', cuser?.address);
    formData.append('zipcode', cuser?.zip_code);
    formData.append('connection_string', cuser?.azure_cosmos);
    formData.append('db_name', cuser?.database_name);
    formData.append('account_key', cuser?.account_key);
    if (id?.tenantId) {
      formData.append('tenant_id', id?.tenantId);
      update_tenant(formData, dispatch);
      clearForm()
    } else {
      create_tenant(formData, dispatch);
      clearForm()
    }
  });

  const clearForm =()=>{
    setCuser({
      company_name: '',
      tenant_name: '',
      company_email: '',
      company_phone_number: '',
      tax_id: '',
      website: '',
      country: '',
      state: '',
      city: '',
      zip_code: '',
      address: '',
      azure_cosmos: '',
      database_name: '',
      account_key: ''
    });
  }

  const handleElementChange = (value, label) => {
    setCuser((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]:
        !value &&
        label !== 'phone_number' &&
        label !== 'company_phone_number' &&
        label !== 'state' &&
        label !== 'website'
          ? 'required'
          : (label === 'email' || label === 'company_email') && !emailRegex.test(value)
            ? 'invalid'
            : '',
    }));
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
          <Typography level="h4">Account Information</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Name</FormLabel>
                  <Input
                    value={cuser?.company_name}
                    name="company_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_name')}
                  />
                  {errors.company_name && (
                    <FormHelperText style={{ color: 'red' }}>Company Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Tenant Name</FormLabel>
                  <Input
                    name="tenant_name"
                    value={cuser.tenant_name}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'tenant_name')}
                  />
                  {errors.tenant_name && (
                    <FormHelperText style={{ color: 'red' }}>Tenant Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Email</FormLabel>
                  <Input
                    value={cuser.company_email}
                    name="company_email"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_email')}
                  />
                  {errors.company_email && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.company_email === 'required' ? 'Company Email is required' : 'Enter valid email id.'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Phone Number</FormLabel>
                  <Input
                    value={cuser.company_phone_number}
                    name="company_phone_number"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_phone_number')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>TAX ID</FormLabel>
                  <Input
                    value={cuser.tax_id}
                    name="tax_id"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'tax_id')}
                  />
                  {errors.tax_id && <FormHelperText style={{ color: 'red' }}>TAX ID is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    value={cuser.website}
                    name="website"
                    startDecorator={
                      <Chip size="sm" variant="soft">
                        www.
                      </Chip>
                    }
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'website')}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">Address</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Select
                    name="country"
                    value={cuser?.country}
                    onChange={(e) => e && handleElementChange(e.target.textContent, 'country')}
                  >
                    <Option value="">Choose a country</Option>
                    {countries.length > 0 &&
                      countries.map((c) => (
                        <Option key={c.name} value={c.name}>
                          {c.name}
                        </Option>
                      ))}
                  </Select>
                  {errors.country && <FormHelperText style={{ color: 'red' }}>Country is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input
                    name="state"
                    value={cuser.state}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'state')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input
                    name="city"
                    type="text"
                    value={cuser.city}
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'city')}
                  />
                  {errors.city && <FormHelperText style={{ color: 'red' }}>City is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    name="zip_code"
                    value={cuser.zip_code}
                    onChange={(e) => handleElementChange(e.target.value, 'zip_code')}
                  />
                  {errors.zip_code && <FormHelperText style={{ color: 'red' }}>Zip Code is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    maxRows={3}
                    minRows={2}
                    name="address"
                    value={cuser.address}
                    onChange={(e) => handleElementChange(e.target.value, 'address')}
                  />
                  {errors.address && <FormHelperText style={{ color: 'red' }}>Address is required.</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">Settings</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              {/* <Grid md={12} xs={12}>
                <FormControl>
                  <FormLabel>Connection String Azure Cosmos DB</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                 
                </FormControl>
              </Grid> */}
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Connection String Azure Cosmos DB</FormLabel>
                  <Input
                    name="azure_cosmos"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    value={cuser.azure_cosmos}
                    onChange={(e) => handleElementChange(e.target.value, 'azure_cosmos')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Database Name</FormLabel>
                  <Input
                    name="database_name"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    value={cuser.database_name}
                    onChange={(e) => handleElementChange(e.target.value, 'database_name')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Account Key</FormLabel>
                  <Input
                    name="account_key"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    value={cuser.account_key}
                    onChange={(e) => handleElementChange(e.target.value, 'account_key')}
                  />
                </FormControl>
              </Grid>
              {/* <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Container Name Water</FormLabel>
                  <Input defaultValue="" name="zip" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Partition Key Path Water</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Container Name Electricityr</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Partition Key Path Electricity</FormLabel>
                  <Textarea defaultValue="" maxRows={3} minRows={2} name="street" />
                </FormControl>
              </Grid> */}
            </Grid>
          </Box>
        </Stack>

        {/* <Stack spacing={3}>
          <Typography level="h4">Settings Timeframe Meters
          </Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={12} xs={12}>
                <FormControl>
                  <FormLabel>Watermeters Timeframe (Seconds)</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                 
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Electricitymeters Timeframe (Seconds)</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                </FormControl>
              </Grid>
              
            </Grid>
          </Box>
        </Stack> */}

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.tenants']} variant="outlined">
            Cancel
          </Button>
          <Button type="submit">{id?.tenantId ? 'Update' : 'Create'} Tenant</Button>
        </Stack>
      </Stack>
    </form>
  );
}
