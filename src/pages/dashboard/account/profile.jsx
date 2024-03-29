import * as React from 'react';
import { useState } from 'react';
import { update_profile_detail } from '@/reduxData/user/userAction';
import { FormHelperText } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
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
import Typography from '@mui/joy/Typography';
import { Country } from 'country-state-city';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { config } from '@/config';
import 'react-phone-number-input/style.css';

import { PhoneInput } from '@/components/core/phone-input';

const url = import.meta.env.VITE_APP_ASSET_URL;
const metadata = {
  title: `Profile | Account | Dashboard | ${config.site.name}`,
};
const Page = ({ userData, a }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [countries, setCountries] = React.useState([]);
  const [imagePath, setimagePath] = useState('');
  const [cuser, setCuser] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    company_name: '',
    tenant_name: '',
    company_phone_number: '',
    comapny_email: '',
    address: '',
    city: '',
    country: '',
    state: '',
    tax_id: '',
    website: '',
    zipcode: '',
  });
  const [errors, setErrors] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    city: '',
    zipcode: '',
    address: '',
    company_name: '',
    tenant_name: '',
    comapny_email: '',
    tax_id: '',
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (a?.tenant?.selectedTenantDevices) {
      const data = a?.tenant?.selectedTenantDevices[0]?.tenant_ids[0];
      setCuser({
        first_name: data?.tenant_name,
        last_name: '',
        email: data?.client_email,
        phone_number: data?.client_phone_number,
        website: '',
        country: data?.company_country,
        state: data?.company_state,
        city: data?.company_city,
        zipcode: data?.company_zip_code,
        address: data?.company_address,
        company_name: data?.company_name,
        tenant_name: data?.tenant_name,
        company_email: data?.company_email,
        company_phone_number: data?.company_phone_number,
        tax_id: data?.company_tax_id,
      });
    } else if (userData) {
      setCuser({
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        phone_number: userData?.phone_number,
        website: userData?.company_website,
        country: userData?.company_country,
        state: userData?.company_state,
        city: userData?.company_city,
        zipcode: userData?.company_zip_code,
        address: userData?.company_address,
        company_name: userData?.company_name,
        tenant_name: userData?.tenant_name,
        company_email: userData?.company_email,
        company_phone_number: userData?.company_phone_number,
        tax_id: userData?.company_tax_id,
      });
    }
  }, [userData]);
  React.useEffect(() => {
    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);

  const currentUserRole = JSON.parse(localStorage.getItem('authUser'))?.role;
  const permissions = JSON.parse(localStorage.getItem('permissions'));

  const handleElementChange = (value, label) => {
    setCuser((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]:
        !value &&
        label !== 'phone_number' &&
        label !== 'company_phone_number' &&
        label !== 'website' &&
        label !== 'state'
          ? 'required'
          : (label === 'email' || label === 'company_email') && !emailRegex.test(value)
            ? 'invalid'
            : '',
    }));
  };
  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(cuser);
    output.forEach(([key, value]) => {
      if (
        !value &&
        key !== 'phone_number' &&
        key !== 'state' &&
        key !== 'company_phone_number' &&
        key !== 'state' &&
        key !== 'website'
      ) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'required' }));
      } else if (value && (key === 'email' || key === 'companyEmail') && !emailRegex.test(value)) {
        err = true;
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'invalid' }));
      }
    });
    return err;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkAllErrors()) {
      return;
    }
    update_profile_detail(cuser, dispatch);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }}>
            <Avatar src={imagePath}>{cuser.first_name ?`${cuser?.first_name && cuser?.first_name[0]}${
              cuser?.last_name && cuser?.last_name[0]
            }`:cuser?.tenant_name[0]}</Avatar>
          </Box>
          <div style={{ textTransform: 'capitalize' }}>
            <Typography level="h4">
              {cuser.first_name ? `${cuser.first_name} ${cuser.last_name}` : cuser?.tenant_name}
            </Typography>
            <Typography level="body-sm">{cuser.company_name}</Typography>
          </div>
        </Stack>
        {/* {errors.profile_pic && <FormHelperText style={{ color: 'red' }}>{errors?.profile_pic}</FormHelperText>} */}
        <Stack spacing={3}>
          <Typography level="h4">{t('MyDetails')}</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('FirstName')} <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.first_name}
                    name="first_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'first_name')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_own_detail
                    }
                  />
                  {errors.first_name && <FormHelperText style={{ color: 'red' }}>{t('FirstNameError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('LastName')} <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.last_name}
                    name="last_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'last_name')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_own_detail
                    }
                  />
                  {errors.last_name && <FormHelperText style={{ color: 'red' }}>{t('LastNameError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('Email')} <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.email}
                    name="email"
                    type="email"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'email')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_own_detail
                    }
                  />
                  {errors.email && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.email === 'required' ? 'Email is required.' : 'Email is invalid.'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('MyPhoneNumber')}</FormLabel>
                  <Box component={'div'} display={'flex'} flexDirection={'row'}>
                    <div
                      className="phoneNumberContainer"
                      style={{
                        borderRadius: '5px',
                        boxShadow: 'var(--joy-shadow-xs)',
                        border: 'solid 1px #EAEEF6',
                        fontSize: '14px',
                        width: '100%',
                      }}
                    >
                      <PhoneInput
                        international
                        maxLength="15"
                        placeholder="Enter phone number"
                        value={cuser.phone_number}
                        onChange={(e) => handleElementChange(e, 'phone_number')}
                        disabled={
                          currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_own_detail
                        }
                      />
                    </div>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">{t('CompanyDetails')}</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('CompanyName')} <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.company_name}
                    name="company_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_name')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_company_detail
                    }
                  />
                  {errors.company_name && (
                    <FormHelperText style={{ color: 'red' }}>{t('CompanyNameError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('TenantName')} <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.tenant_name}
                    name="tenant_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'tenant_name')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_company_detail
                    }
                  />
                  {errors.tenant_name && (
                    <FormHelperText style={{ color: 'red' }}>{t('TenantNameError')}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('CompanyEmail')} <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.company_email}
                    name="company_email"
                    type="email"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_email')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_company_detail
                    }
                  />
                  {errors.company_email && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.company_email === 'required' ? 'Company email is required.' : 'Email is invalid.'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('CompanyPhoneNumber')}</FormLabel>
                  <Box component={'div'} display={'flex'} flexDirection={'row'}>
                    <div
                      className="phoneNumberContainer"
                      style={{
                        borderRadius: '5px',
                        boxShadow: 'var(--joy-shadow-xs)',
                        border: 'solid 1px #EAEEF6',
                        fontSize: '14px',
                        width: '100%',
                      }}
                    >
                      <PhoneInput
                        maxLength="15"
                        placeholder="Enter phone number"
                        value={cuser.company_phone_number}
                        onChange={(e) => handleElementChange(e, 'company_phone_number')}
                        disabled={
                          currentUserRole == 'admin'
                            ? false
                            : !permissions['Tenant Management']?.can_change_company_detail
                        }
                      />
                    </div>
                  </Box>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>
                    {t('VATID')}
                    <sup>*</sup>
                  </FormLabel>
                  <Input
                    value={cuser?.tax_id}
                    name="tax_id"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'tax_id')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_company_detail
                    }
                  />
                  {errors.tax_id && <FormHelperText style={{ color: 'red' }}>{t('VatIdError')}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>{t('Website')}</FormLabel>
                  <Input
                    value={cuser?.website}
                    name="website"
                    startDecorator={
                      <Chip size="sm" variant="soft">
                        www.
                      </Chip>
                    }
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'website')}
                    disabled={
                      currentUserRole == 'admin' ? false : !permissions['Tenant Management']?.can_change_company_detail
                    }
                  />
                  {errors.website && <FormHelperText style={{ color: 'red' }}>{t('WebsiteError')}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={3}>
            <Typography level="h4">{t('CompanyAddress')}</Typography>
            <Box sx={{ maxWidth: 'lg' }}>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>
                      {t('Country')} <sup>*</sup>
                    </FormLabel>
                    <Select
                      value={cuser?.country}
                      name="country"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => e && handleElementChange(e.target.textContent, 'country')}
                    >
                      <Option value="" disabled selected>
                        Choose a country
                      </Option>
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
                      value={cuser?.state}
                      name="state"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'state')}
                    />
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>
                      {t('City')} <sup>*</sup>
                    </FormLabel>
                    <Input
                      value={cuser?.city}
                      name="city"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'city')}
                    />
                    {errors.city && <FormHelperText style={{ color: 'red' }}>{t('CityError')}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>
                      {t('ZipCode')}
                      <sup>*</sup>
                    </FormLabel>
                    <Input
                      value={cuser?.zipcode}
                      name="zipcode"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'zipcode')}
                    />
                    {errors.zipcode && <FormHelperText style={{ color: 'red' }}>{t('ZipError')}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>
                      {t('Address')} <sup>*</sup>
                    </FormLabel>
                    <Input
                      value={cuser?.address}
                      name="address"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'address')}
                    />
                    {errors.address && <FormHelperText style={{ color: 'red' }}>{t('AddressError')}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
            {t('Discard')}
          </Button>
          <Button onClick={(event) => handleSubmit(event)}>{t('SaveChanges')}</Button>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
    a: state,
  };
};

export default connect(mapStateToProps)(Page);
