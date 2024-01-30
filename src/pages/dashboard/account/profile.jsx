import * as React from 'react';
import { useState } from 'react';
import { get_user_profile_details, update_profile_detail } from '@/reduxData/user/userAction';
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
import { Pen as PenIcon } from '@phosphor-icons/react/dist/ssr/Pen';
import { City, Country, State } from 'country-state-city';
import { Helmet } from 'react-helmet-async';
import { connect, useDispatch } from 'react-redux';

import { config } from '@/config';
import { getInitials } from '@/lib/get-initials';
import { CustomAutoComplete } from '@/components/core/auto-complte-feild';
import CountryCodeField from '@/components/core/country-code-field';

const url = import.meta.env.VITE_APP_ASSET_URL;
const metadata = {
  title: `Profile | Account | Dashboard | ${config.site.name}`,
};
const Page = ({ userData }) => {
  const dispatch = useDispatch();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const fileinputRef = React.useRef();
  const [countries, setCountries] = React.useState([]);
  const [countryCode, setCountryCode] = React.useState('IN');
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
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
    avatar: '',
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    countryCodeCompany: '',
    number: '',
    website: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address: '',
    companyFirstName: '',
    companyLastName: '',
    comapnyEmail: '',
    companyNumber: '',
    vatNumber: '',
  });
  React.useEffect(() => {
    get_user_profile_details(dispatch);
  }, []);

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
      changeCountry(userData?.country);
      changeState(userData?.state);
      setimagePath(userData?.profile_pic ? url + userData?.profile_pic : null);
    }
  }, [userData]);
  React.useEffect(() => {
    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (allowedTypes.includes(selectedFile.type)) {
        const maxSize = 3 * 1024 * 1024;
        if (selectedFile.size <= maxSize) {
          setCuser({ ...cuser, profile_pic: selectedFile });
          let reader = new FileReader();
          reader.onload = (e) => {
            setimagePath(e.target.result);
          };
          reader.readAsDataURL(e.target.files[0]);
          setErrors({ ...errors, avatar: null });
        } else {
          // toast.error('File size exceeds 3MB limit.');
          setErrors({ ...errors, avatar: 'File size exceeds 3MB limit.' });
        }
      } else if (!allowedTypes.includes(selectedFile.type)) {
        setErrors({ ...errors, avatar: 'Invalid file type. Please select a PNG, JPEG, or GIF file.' });
      } else {
        setErrors({ ...errors, avatar: null });
      }
    }
  };

  const changeCountry = (value) => {
    const country = countries.find((c) => c.name === value);
    setCountryCode(country?.isoCode);
    const stateArr = State.getStatesOfCountry(country?.isoCode);
    setStates([...stateArr]);
  };
  const changeState = (value) => {
    const state = states.find((c) => c.name === value);
    const citieArr = City.getCitiesOfState(countryCode, state?.isoCode);
    setCities([...citieArr]);
  };
  const handleElementChange = (value, label) => {
    setCuser((prev) => ({ ...prev, [label]: value }));
    setErrors((prev) => ({
      ...prev,
      [label]: !value
        ? 'required'
        : (label === 'email' || label === 'comapnyEmail') && !emailRegex.test(value)
          ? 'invalid'
          : '',
    }));

    if (label === 'country') {
      changeCountry(value);
    }
    if (label === 'state') {
      changeState(value);
    }
  };
  const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(cuser);
    output.forEach(([key, value]) => {
      if (!value) {
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
    formData.append('profile_pic', cuser?.profile_pic);
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
    get_user_profile_details(dispatch);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <input type="file" ref={fileinputRef} style={{ display: 'none' }} onChange={(e) => handleChange(e)} />
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }} onClick={() => fileinputRef.current.click()}>
            <Avatar src={imagePath}>{getInitials(`${userData?.first_name} ${userData?.last_name}`)}/</Avatar>
            <Box
              sx={{
                alignItems: 'center',
                borderRadius: '100%',
                color: 'var(--joy-palette-common-white)',
                cursor: 'pointer',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.4)',
                },
                '&:not(:hover) > *': {
                  display: 'none',
                },
              }}
            >
              <PenIcon style={{ fontSize: 'var(--joy-fontSize-lg)' }} weight="bold" />
            </Box>
          </Box>
          <div>
            <Typography level="h4">Profile Picture</Typography>
            <Typography level="body-sm">Supports PNGs, JPEGs and GIFs under 3MB</Typography>
          </div>
        </Stack>
        {errors.avatar && <FormHelperText style={{ color: 'red' }}>{errors?.avatar}</FormHelperText>}
        <Stack spacing={3}>
          <Typography level="h4">My details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={cuser?.first_name}
                    name="firstName"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'firstName')}
                  />
                  {errors.firstName && (
                    <FormHelperText style={{ color: 'red' }}>First Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={cuser?.last_name}
                    name="lastName"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'lastName')}
                  />
                  {errors.lastName && <FormHelperText style={{ color: 'red' }}>Last Name is required.</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
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
                    <CountryCodeField />
                    <Input
                      value={cuser?.phone_number}
                      name="number"
                      type="text"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px', width: '30%' }}
                      onChange={(e) => handleElementChange(e.target.value, 'number')}
                    />
                  </Box>
                  {errors.number && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.number === 'required' ? 'Phone number is required.' : null}
                    </FormHelperText>
                  )}
                  {errors.countryCode && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.countryCode === 'required' ? 'Country code is required.' : null}
                    </FormHelperText>
                  )}
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
                  <FormLabel>First Name</FormLabel>
                  <Input
                    value={cuser?.company_first_name}
                    name="companyFirstName"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'companyFirstName')}
                  />
                  {errors.companyFirstName && (
                    <FormHelperText style={{ color: 'red' }}>First Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={cuser?.company_last_name}
                    name="companyLastName"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'companyLastName')}
                  />
                  {errors.companyLastName && (
                    <FormHelperText style={{ color: 'red' }}>Company last Name is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={cuser?.company_email}
                    name="comapnyEmail"
                    type="email"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'companyEmail')}
                  />
                  {errors.comapnyEmail && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.comapnyEmail === 'required' ? 'Company email is required.' : 'Email is invalid.'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>My Phone Number</FormLabel>
                  <Box component={'div'} display={'flex'} flexDirection={'row'}>
                    <CountryCodeField />
                    <Input
                      value={cuser?.company_phone_number}
                      name="companyPhone"
                      type="text"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => handleElementChange(e.target.value, 'companyPhone')}
                    />
                    {errors.companyNumber && (
                      <FormHelperText style={{ color: 'red' }}>Phone Number is required.</FormHelperText>
                    )}
                  </Box>
                  {errors.countryCodeCompany && (
                    <FormHelperText style={{ color: 'red' }}>
                      {errors.countryCodeCompany === 'required' ? 'Country code is required.' : null}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>VAT Number</FormLabel>
                  <Input
                    value={cuser?.vat_number}
                    name="vatNumber"
                    type="text"
                    style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                    onChange={(e) => handleElementChange(e.target.value, 'vatNumber')}
                  />
                  {errors.vatNumber && (
                    <FormHelperText style={{ color: 'red' }}>Vat Number is required.</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Website</FormLabel>
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
            <Typography level="h4">Location</Typography>
            <Box sx={{ maxWidth: 'lg' }}>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Select
                      value={cuser?.country || ''}
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
                    <Select
                      value={cuser?.state || ''}
                      name="state"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => e && handleElementChange(e.target.textContent, 'state')}
                    >
                      <Option value="" disabled selected>
                        Choose a State
                      </Option>
                      {states.length > 0 &&
                        states.map((s) => (
                          <Option key={s.name} value={s.name}>
                            {s.name}
                          </Option>
                        ))}
                    </Select>
                    {errors.state && <FormHelperText style={{ color: 'red' }}>State is required.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Select
                      value={cuser?.city || ''}
                      name="city"
                      style={{ borderColor: '#EAEEF6', fontSize: '14px' }}
                      onChange={(e) => e && handleElementChange(e.target.textContent, 'city')}
                    >
                      <Option value="" disabled selected>
                        Choose a city
                      </Option>
                      {cities.length > 0 &&
                        cities.map((s) => (
                          <Option key={s.name} value={s.name}>
                            {s.name}
                          </Option>
                        ))}
                    </Select>
                    {errors.city && <FormHelperText style={{ color: 'red' }}>City is required.</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Zip Code</FormLabel>
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
                    <FormLabel>Address</FormLabel>
                    <CustomAutoComplete
                      value={cuser?.address}
                      onChange={(val) => handleElementChange(val, 'address')}
                    />
                    {errors.address && <FormHelperText style={{ color: 'red' }}>Address is required.</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button color="neutral" variant="outlined">
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
    userData: state.user.userData,
  };
};

export default connect(mapStateToProps)(Page);
