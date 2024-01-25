import * as React from 'react';
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
import { Helmet } from 'react-helmet-async';
import { config } from '@/config';
import { getInitials } from '@/lib/get-initials';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { FormHelperText } from '@mui/joy';
import { Country,State,City } from 'country-state-city';
import { CustomAutoComplete } from '@/components/core/auto-complte-feild';
const metadata = {
  title: `Profile | Account | Dashboard | ${config.site.name}`,
};

export function Page() {
  const dispatch=useDispatch();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const fileinputRef = React.useRef();
  const [countries, setCountries] = React.useState([]);
  const [countryCode,setCountryCode]=React.useState('IN');
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  React.useEffect(() => {
    const cArr = Country.getAllCountries();
    setCountries(cArr);
  }, []);
  const handleChange=(e)=>{
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (allowedTypes.includes(selectedFile.type)) {
        const maxSize = 3 * 1024 * 1024;
        if (selectedFile.size <= maxSize) {
          update_profile(selectedFile,dispatch);
        } else {
          toast.error('File size exceeds 3MB limit.');
        }
      } else {
        toast.error('Invalid file type. Please select a PNG, JPEG, or GIF file.');
      }
    }
  }
  
  const [cuser, setCuser] = React.useState({
    avatar: '/assets/avatar.png',
    firstName: 'Rene',
    lastName: 'Wells',
    email: 'rene@devias.io',
    number: '+323388393',
    website: 'devias.io',
    country: 'India',
    state: 'Colorado',
    city: 'Denver',
    zipcode: '80218',
    address: 'Street Roy Alley 1155, house 1B',
    companyFirstName:'Company',
    companyLastName: 'wells',
    comapnyEmail:'info@company.com',
    companyNumber:'+323388393',
    vatNumber:'BE045182565734',
  });
  const [errors, setErrors] = React.useState({
    avatar:'',
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    website: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    address: '',
    companyFirstName:'',
    companyLastName: '',
    comapnyEmail:'',
    companyNumber:'',
    vatNumber:'',
  });
  const changeCountry=(value)=>{
    const country=countries.find(c=>c.name===value);
    setCountryCode(country?.isoCode)
    const stateArr = State.getStatesOfCountry(country?.isoCode);
    setStates([...stateArr]);
  }
  const changeState=(value)=>{
    const state=states.find(c=>c.name===value);
    const citieArr = City.getCitiesOfState(countryCode,state?.isoCode);
    setCities([...citieArr]);
  }
  const handleElementChange = (value, label) => {
    setCuser((prev) => ({...prev,[label]:value}));
    setErrors((prev) => ({
      ...prev,
      [label]:(!value)?'required'
      :((((label==='email') || (label==='comapnyEmail')) && (!emailRegex.test(value))))
      ?'invalid':''}));

    if(label==='country'){
      changeCountry(value);
    }
    if(label==='state'){
      changeState(value);
    }
  };
  const checkAllErrors=()=>{
    let err=false;
    let output = Object.entries(cuser);
    output.forEach(([key, value]) =>{
      if(!value){
        err=true;
        setErrors((prevErrors) => ({ ...prevErrors,[key]:'required'}))
      }else if(value && ((((key==='email') || (key==='comapnyEmail')) && (!emailRegex.test(value))))){
        err=true;
        setErrors((prevErrors) => ({ ...prevErrors,[key]:'invalid'}))
      }
    });
    return err
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkAllErrors()) {
      return;
    }
    update_profile_detail(cuser,dispatch);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack component="main" divider={<Divider />} spacing={5}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
        <input type="file" ref={fileinputRef}   style={{ display: 'none' }} onChange={(e)=>handleChange(e)} />
          <Box sx={{ '--Avatar-size': '120px', position: 'relative' }} onClick={()=>fileinputRef.current.click()}>
            <Avatar src={cuser.avatar}>{getInitials(`${cuser.firstName} ${cuser.lastName}`)}/</Avatar>
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
        <Stack spacing={3}>
          <Typography level="h4">My details</Typography>
          <Box sx={{ maxWidth: 'lg' }}>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input defaultValue={cuser.firstName} name="firstName"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'firstName')}/>
                  {errors.firstName && <FormHelperText style={{ color: 'red' }}>
                    First Name is required.
                  </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input defaultValue={cuser.lastName} name="lastName"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'lastName')}/>
                  {errors.lastName && <FormHelperText style={{ color: 'red' }}>
                    Last Name is required.
                  </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue={cuser.email} name="email" type="email"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'email')}/>
                  {errors.email && <FormHelperText style={{ color: 'red' }}>
                    {errors.email==='required'?'Last Name is required.':'Email is invalid.'}
                  </FormHelperText>}
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>My Phone Number</FormLabel>
                  <Input  defaultValue={cuser.number} name="number" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'number')}/>
                  {errors.number && <FormHelperText style={{ color: 'red' }}>
                    {errors.number==='required'?'Last Name is required.':'Email is invalid.'}
                  </FormHelperText>}
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
                  <Input defaultValue={cuser.companyFirstName} name="companyFirstName"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'companyFirstName')}/>
                  {errors.companyFirstName && <FormHelperText style={{ color: 'red' }}>
                    First Name is required.
                  </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input defaultValue={cuser.companyLastName} name="companyLastName"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'companyLastName')}/>
                  {errors.companyLastName && <FormHelperText style={{ color: 'red' }}>
                    Last Name is required.
                  </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>  
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input defaultValue={cuser.comapnyEmail} name="comapnyEmail" type="email"  style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'companyEmail')}/>
                  {errors.comapnyEmail && <FormHelperText style={{ color: 'red' }}>
                    {errors.comapnyEmail==='required'?'Last Name is required.':'Email is invalid.'}
                  </FormHelperText>}
                </FormControl>
              
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>My Phone Number</FormLabel>
                  <Input  defaultValue={cuser.companyNumber} name="number" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'companyPhone')}/>
                  {errors.companyNumber && <FormHelperText style={{ color: 'red' }}>
                    Phone Number is required.
                  </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>VAT Number</FormLabel>
                  <Input  defaultValue={cuser.vatNumber} name="vatNumber" type="text" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'vatNumber')}/>
                  {errors.vatNumber && <FormHelperText style={{ color: 'red' }}>
                    Vat Number is required.
                  </FormHelperText>}
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    defaultValue={cuser.website}
                    name="website"
                    startDecorator={
                      <Chip size="sm" variant="soft">
                        www.
                      </Chip>
                    }
                    style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'website')}/>
                  {errors.website && <FormHelperText style={{ color: 'red' }}>
                    Website is required.
                  </FormHelperText>}
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
                    <Select defaultValue={cuser.country} name="country" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} onChange={(e)=>e && handleElementChange(e.target.textContent,'country')}>
                      <Option value="" disabled selected>Choose a country</Option>
                      {(countries.length > 0) && countries.map((c) =>
                        <Option key={c.name} value={c.name}>{c.name}</Option>
                      )}
                    </Select>
                    {errors.country && <FormHelperText style={{ color: 'red' }}>
                      Country is required.
                    </FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>State</FormLabel>
                    <Select defaultValue={cuser.state} name="country" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} onChange={(e)=>e && handleElementChange(e.target.textContent,'state')}>
                      <Option value="" disabled selected>Choose a country</Option>
                      {(states.length > 0) && states.map((s) =>
                        <Option key={s.name} value={s.name}>{s.name}</Option>
                      )}
                    </Select>
                    {errors.state && <FormHelperText style={{ color: 'red' }}>
                      State is required.
                    </FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>City</FormLabel>
                    <Select defaultValue={cuser.city} name="country" style={{borderColor:'#EAEEF6' , fontSize:'14px'}} onChange={(e)=>e && handleElementChange(e.target.textContent,'city')}>
                      <Option value="" disabled selected>Choose a country</Option>
                      {(cities.length > 0) && states.map((s) =>
                        <Option key={s.name} value={s.name}>{s.name}</Option>
                      )}
                    </Select>
                    {errors.city && <FormHelperText style={{ color: 'red' }}>
                      City is required.
                    </FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Zip Code</FormLabel>
                    <Input defaultValue={cuser.zipcode} name="zip" style={{borderColor:'#EAEEF6' , fontSize:'14px'}}  onChange={(e)=>handleElementChange(e.target.value,'zipcode')}/>
                    {errors.zipcode && <FormHelperText style={{ color: 'red' }}>
                      Zip Code is required.
                    </FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12}>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <CustomAutoComplete value={cuser.address} onChange={(val)=>handleElementChange(val,'address')}/>
                    {errors.address && <FormHelperText style={{ color: 'red' }}>
                      Address is required.
                    </FormHelperText>}
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
        <Button onClick={()=>handleSubmit()}>Save Changes</Button>
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
