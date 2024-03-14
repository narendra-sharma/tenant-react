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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

export function TenantCreateForm({ onDataFromChild }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
    connection_string: '',
    db_name: '',
    account_key: '',
    device_renaming: '',
    ac_db_water: '',
    ac_db_water_key: '',
    ac_db_electricity: '',
    ac_db_electricity_key: '',
    watermeter_timeframes: '',
    electricity_timeframes: '',
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
    connection_string: '',
    db_name: '',
    account_key: '',
    device_renaming: '',
    ac_db_water: '',
    ac_db_water_key: '',
    ac_db_electricity: '',
    ac_db_electricity_key: '',
    watermeter_timeframes: '',
    electricity_timeframes: '',
  });
  const navigate = useNavigate()
  const id = useParams();
  React.useEffect(() => {
    if (id.tenantId) {
      let data = state.tenant.tenants.filter((res) => {
        if (res._id === id.tenantId) {
          onDataFromChild('edit');
          setCuser({
            company_name: res?.company_name,
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
            connection_string: res?.setting_endpoint_uri,
            db_name: res?.setting_database_name,
            account_key: res?.setting_key,
            device_renaming:res?.device_renaming
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

    // localStorage.setItem('device_renaming', cuser?.device_renaming);
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
    formData.append('connection_string', cuser?.connection_string);
    formData.append('db_name', cuser?.db_name);
    formData.append('account_key', cuser?.account_key);
    formData.append('device_renaming',cuser?.device_renaming)
    // formData.app
    if (id?.tenantId) {
      formData.append('tenant_id', id?.tenantId);
      update_tenant(formData, dispatch);
      clearForm();
      navigate("../../../admin/tennants")
    } else {
      create_tenant(cuser, dispatch);
      clearForm();
      navigate("../../../admin/tennants")
    }
  });

  const clearForm = () => {
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
      connection_string: '',
      db_name: '',
      account_key: '',
      device_renaming: '',
    });
  };

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
          <Typography level="h4">{t('AccountInfo')}</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('CompanyName')}</FormLabel>
                  <Input
                    value={cuser?.company_name}
                    name="company_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_name')}
                  />
                  {errors.company_name && (
                    <FormHelperText style={{ color: 'red' }}>{t('CompanyNameError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('TenantName')}</FormLabel>
                  <Input
                    name="tenant_name"
                    value={cuser.tenant_name}
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'tenant_name')}
                  />
                  {errors.tenant_name && (
                    <FormHelperText style={{ color: 'red' }}>{t('TenantNameError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('CompanyEmail')}</FormLabel>
                  <Input
                    value={cuser.company_email}
                    name="company_email"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_email')}
                  />
                  {errors.company_email && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.company_email === 'required' ? t('CompanyEmailError') : t('ValidEmailError')}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('CompanyPhoneNumber')}</FormLabel>
                  <Input
                    value={cuser.company_phone_number}
                    name="company_phone_number"
                    type="tel"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_phone_number')}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('TaxId')}</FormLabel>
                  <Input
                    value={cuser.tax_id}
                    name="tax_id"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'tax_id')}
                  />
                  {errors.tax_id && <FormHelperText style={{ color: 'red' }}>{t('TaxIdError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Website')}</FormLabel>
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

              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('PasswordRenaming')}</FormLabel>
                  <Input
                    value={cuser.device_renaming}
                    name="device_renaming"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'device_renaming')}
                  />
                  {errors.device_renaming && (
                    <FormHelperText style={{ color: 'red' }}>{t('PasswordrenamingError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">{t('Address')}</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Country')}</FormLabel>
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
                  {errors.country && <FormHelperText style={{ color: 'red' }}>{t('CountryError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('State')}</FormLabel>
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
                  <FormLabel>{t('City')}</FormLabel>
                  <Input
                    name="city"
                    type="text"
                    value={cuser.city}
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'city')}
                  />
                  {errors.city && <FormHelperText style={{ color: 'red' }}>{t('CityError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('ZipCode')}</FormLabel>
                  <Input
                    name="zip_code"
                    value={cuser.zip_code}
                    onChange={(e) => handleElementChange(e.target.value, 'zip_code')}
                  />
                  {errors.zip_code && <FormHelperText style={{ color: 'red' }}>{t('ZipError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Address')}</FormLabel>
                  <Textarea
                    maxRows={3}
                    minRows={2}
                    name="address"
                    value={cuser.address}
                    onChange={(e) => handleElementChange(e.target.value, 'address')}
                  />
                  {errors.address && <FormHelperText style={{ color: 'red' }}>{t('AddressError')}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">{t('SettingsDB')}</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              {/* <Grid md={12} xs={12}>
                <FormControl>
                  <FormLabel>Connection String Azure Cosmos DB</FormLabel>
                  <Input defaultValue="" name="state" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  />
                 
                </FormControl>
              </Grid> */}
              <Grid md={12} xs={12}>
                <FormControl>
                  <FormLabel>{t('AzureCosomosDb')}</FormLabel>
                  <Input
                    name="connection_string"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    value={cuser.connection_string}
                    onChange={(e) => handleElementChange(e.target.value, 'connection_string')}
                  />
                  {errors.connection_string && (
                    <FormHelperText style={{ color: 'red' }}>{t('AzureCompassDbError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('AzureCosomosDbName')}</FormLabel>
                  <Input
                    defaultValue=""
                    name="db_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    value={cuser.db_name}
                    onChange={(e) => handleElementChange(e.target.value, 'db_name')}
                  />
                  {errors.db_name && (
                    <FormHelperText style={{ color: 'red' }}>{t('AzureCompassDbNameError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('AzureCosmosDbKey')}</FormLabel>
                  <Input
                    name="account_key"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    value={cuser.account_key}
                    onChange={(e) => handleElementChange(e.target.value, 'account_key')}
                  />
                  {errors.account_key && (
                    <FormHelperText style={{ color: 'red' }}>{t('AzureCompassDbKeyError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Container Name Water</FormLabel>
                  <Input
                    value={cuser.ac_db_water}
                    maxRows={3}
                    minRows={1}
                    name="ac_db_water"
                    onChange={(e) => handleElementChange(e.target.value, 'ac_db_water')}
                  />
                  {errors.ac_db_water && (
                    <FormHelperText style={{ color: 'red' }}>Azure Cosmos DB Container Name Water is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Partion Key Path Water </FormLabel>
                  <Input
                    value={cuser.ac_db_water_key}
                    maxRows={3}
                    minRows={1}
                    name="ac_db_water_key"
                    onChange={(e) => handleElementChange(e.target.value, 'ac_db_water_key')}
                  />
                  {errors.ac_db_water_key && (
                    <FormHelperText style={{ color: 'red' }}>Azure Cosmos DB Partion Key Path Water is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Container Name Electricity</FormLabel>
                  <Input
                    value={cuser.ac_db_electricity}
                    maxRows={3}
                    minRows={1}
                    name="ac_db_electricity"
                    onChange={(e) => handleElementChange(e.target.value, 'ac_db_electricity')}
                  />
                    {errors.ac_db_electricity && (
                    <FormHelperText style={{ color: 'red' }}>Azure Cosmos DB Container Name Electricity is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Azure Cosmos DB Partion Key Path Electricity</FormLabel>
                  <Input
                    value={cuser.ac_db_electricity_key}
                    maxRows={3}
                    minRows={1}
                    name="ac_db_electricity_key"
                    onChange={(e) => handleElementChange(e.target.value, 'ac_db_electricity_key')}
                  />
                     {errors.ac_db_electricity_key && (
                    <FormHelperText style={{ color: 'red' }}>Azure Cosmos DB Partion Key Path Electricity is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Typography level="h4">Settings Timeframe Meters</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Watermeters Timeframe (Seconds)</FormLabel>
                  <Input
                    value={cuser.watermeter_timeframes}
                    maxRows={3}
                    minRows={1}
                    name="watermeter_timeframes"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'watermeter_timeframes')}
                  />
                  {errors.watermeter_timeframes && (
                    <FormHelperText style={{ color: 'red' }}>Watermeters Timeframe (Seconds) is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Electricitymeters Timeframe (Seconds)</FormLabel>
                  <Input
                    value={cuser.electricity_timeframes}
                    maxRows={3}
                    minRows={1}
                    name="electricity_timeframes"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'electricity_timeframes')}
                  />
                    {errors.electricity_timeframes && (
                    <FormHelperText style={{ color: 'red' }}>Electricitymeters Timeframe (Seconds) is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" component={RouterLink} href={paths['dashboard.admin.tennats']} variant="outlined">
            {t('Cancel')}
          </Button>
          <Button type="submit">
            {id?.tenantId ? t('Update') : t('Create')} {t('Tenant')}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
