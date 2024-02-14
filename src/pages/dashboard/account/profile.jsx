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
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { config } from '@/config';
import { getInitials } from '@/lib/get-initials';
import 'react-phone-number-input/style.css';
import { PhoneInput } from '@/components/core/phone-input';

const url = import.meta.env.VITE_APP_ASSET_URL;
const metadata = {
  title: `Profile | Account | Dashboard | ${config.site.name}`,
};
const Page = ({ userData }) => {
  const dispatch = useDispatch();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const [countries, setCountries] = React.useState([]);
  const [imagePath, setimagePath] = useState('');
  const [cuser, setCuser] = React.useState({
    profile_pic: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    website: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address: '',
    company_first_name: '',
    company_last_name: '',
    company_email: '',
    company_phone_number: '',
    vat_number: '',
  });
  const [errors, setErrors] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    country: '',
    city: '',
    zipcode: '',
    address: '',
    company_first_name: '',
    company_last_name: '',
    company_email: '',
    vat_number: '',
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userData) {
      setCuser({
        profile_pic: userData?.profile_pic,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        phone_number: userData?.phone_number,
        website: userData?.website,
        country: userData?.country,
        state: userData?.state,
        city: userData?.city,
        zipcode: userData?.zipcode,
        address: userData?.address,
        company_first_name: userData?.company_first_name,
        company_last_name: userData?.company_last_name,
        company_email: userData?.comapny_email,
        company_phone_number: userData?.company_phone_number,
        vat_number: userData?.vat_number,
      });
    }
  }, [userData]);
  React.useEffect(() => {
    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);

  const handleElementChange = (value, label) => {
    setCuser((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]: !value && (label!=='phone_number') && (label!=='company_phone_number') && (label!=='state') && (label!=='website')
        ? 'required'
        : (label === 'email' || label === 'comapnyEmail') && !emailRegex.test(value)
          ? 'invalid'
          : '',
    }));
  };
  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(cuser);
    output.forEach(([key, value]) => {
      if (!value && (key!=='phone_number') && (key!=='company_phone_number') && (key!=='state') && (key!=='website')) {
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
    const formData = new FormData();
    formData.append('first_name', cuser?.first_name);
    formData.append('last_name', cuser?.last_name);
    formData.append('email', cuser?.email);
    formData.append('phone_number', cuser?.phone_number);
    formData.append('website', cuser?.website);
    formData.append('country', cuser?.country);
    formData.append('state', cuser?.state);
    formData.append('city', cuser?.city);
    formData.append('zipcode', cuser?.zipcode);
    formData.append('address', cuser?.address);
    formData.append('company_first_name', cuser?.company_first_name);
    formData.append('company_last_name', cuser?.company_last_name);
    formData.append('comapny_email', cuser?.company_email);
    formData.append('company_phone_number', cuser?.company_phone_number);
    formData.append('vat_number', cuser?.vat_number);
    update_profile_detail(formData, dispatch);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }} >
            <Avatar src={imagePath}>{getInitials(`${cuser?.first_name} ${cuser?.last_name}`)}</Avatar>
            
          </Box>
          <div style={{textTransform:'capitalize'}}>
            <Typography level="h4">{cuser.first_name} {cuser.last_name}</Typography>
            <Typography level="body-sm">{cuser.company_first_name}</Typography>
          </div>
        </Stack>
        {errors.profile_pic && <FormHelperText style={{ color: 'red' }}>{errors?.profile_pic}</FormHelperText>}
        <Stack spacing={3}>
          <Typography level="h4">My details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>First Name <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.first_name}
                    name="first_name"
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
                  <FormLabel>Last Name <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.last_name}
                    name="last_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'last_name')}
                  />
                  {errors.last_name && <FormHelperText style={{ color: 'red' }}>Last Name is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Email <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.email}
                    name="email"
                    type="email"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'email')}
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
                  <FormLabel>My Phone Number</FormLabel>
                  <Box component={'div'} display={'flex'} flexDirection={'row'}>
                  <div className="phoneNumberContainer"  style={{borderRadius:'5px',boxShadow: 'var(--joy-shadow-xs)', border: 'solid 1px #EAEEF6', fontSize: '14px', width: '100%' }} >
                      <PhoneInput
                        international
                        maxLength="15"
                        placeholder="Enter phone number"
                        value={cuser.phone_number}
                        onChange={(e) => handleElementChange(e, 'phone_number')}
                      />
                  </div>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Typography level="h4">Company details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Name <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.company_first_name}
                    name="companyFirstName"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_first_name')}
                  />
                  {errors.company_first_name && (
                    <FormHelperText style={{ color: 'red' }}>Company Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Tenant Name <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.company_last_name}
                    name="company_last_name"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_last_name')}
                  />
                  {errors.company_last_name && (
                    <FormHelperText style={{ color: 'red' }}>Tenant Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Company Email <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.company_email}
                    name="company_email"
                    type="email"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'company_email')}
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
                  <FormLabel>Company Phone Number</FormLabel>
                  <Box component={'div'} display={'flex'} flexDirection={'row'}>
                  <div className="phoneNumberContainer"  style={{borderRadius:'5px',boxShadow: 'var(--joy-shadow-xs)', border: 'solid 1px #EAEEF6', fontSize: '14px', width: '100%' }} >
                  <PhoneInput
                      maxLength="15"
                      placeholder="Enter phone number"
                      value={cuser.company_phone_number}
                      onChange={(e) => handleElementChange(e, 'company_phone_number')}
                    />
                    </div>
                  
                  </Box>
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>VAT ID <sup>*</sup></FormLabel>
                  <Input
                    value={cuser?.vat_number}
                    name="vat_number"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'vat_number')}
                  />
                  {errors.vat_number && <FormHelperText style={{ color: 'red' }}>VAT ID is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Website <sup>*</sup></FormLabel>
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
                  />
                  {errors.website && <FormHelperText style={{ color: 'red' }}>Website is required.</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <Stack spacing={3}>
            <Typography level="h4">Company Address</Typography>
            <Box sx={{ maxWidth: 'lg' }}>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Country <sup>*</sup></FormLabel>
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
                    {errors.country && <FormHelperText style={{ color: 'red' }}>Country is required.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>State</FormLabel>
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
                    <FormLabel>City <sup>*</sup></FormLabel>
                    <Input
                    value={cuser?.city}
                    name="city"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'city')}
                  />
                    {errors.city && <FormHelperText style={{ color: 'red' }}>City is required.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Zip Code <sup>*</sup></FormLabel>
                    <Input
                      value={cuser?.zipcode}
                      name="zip"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'zipcode')}
                    />
                    {errors.zipcode && <FormHelperText style={{ color: 'red' }}>Zip Code is required.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Address <sup>*</sup></FormLabel>
                    <Input
                      value={cuser?.address}
                      name="address"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'address')}
                    />
                    {errors.address && <FormHelperText style={{ color: 'red' }}>Address is required.</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" variant="outlined" onClick={(e) => navigate('../')}>
            Discard
          </Button>
          <Button onClick={(event) => handleSubmit(event)}>Save Changes</Button>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.user,
  };
};

export default connect(mapStateToProps)(Page);
