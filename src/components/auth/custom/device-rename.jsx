'use client';

import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { get_device_bySerialNumber, update_device_renaming } from '@/reduxData/devices/deviceAction';
import { Checkbox } from '@mui/joy';

const DeviceRename=()=>{
  const [isChecked,setIsChecked] = useState(false)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    serial_numer: '',
    device_name: '',
    device_renaming:'',
  });

const [errors, setErrors]=useState({
    serial_numer: '',
    device_name: '',
    device_renaming:'',
})

const { serial_number } = useParams();
const serialNumber = serial_number;
React.useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await get_device_bySerialNumber(serialNumber,dispatch);
            setFormData({
                serial_numer: data.data.data?.serial_number,
                device_name: '',
                device_renaming:'' ,
            })
          } catch (error) {
            console.error("Error in useEffect:", error);
          }
        };
      
        fetchData();
      }, [serial_number]);

const checkAllErrors = () => {
    let err = false;
    let output = Object.entries(formData);
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
      update_device_renaming(formData, dispatch,isChecked)
  };

  const handleElementChange = (value, label) => {
    value
    setFormData((prev) => ({ ...prev, [label]: value }));
      setErrors((prev) => ({
        ...prev,
      [label]: !value
        ? 'required'
        :
           '',
    }));
 
  };

  return (
       <form
       className='authform'
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography level="h3" textAlign="center">
          OnTheGo Device Renaming 
          </Typography>
          <FormControl>
            <FormLabel>Serial Number</FormLabel>
            <Input type="text" name="serial_numer" value={formData?.serial_numer} disabled={true} onChange={(e) => handleElementChange(e.target.value,'serial_numer')} />
            {errors?.serial_numer && <FormHelperText style={{ color: 'red' }}>Serial Number is Required.</FormHelperText>}
          </FormControl>

          <FormControl>
            <FormLabel>Device Name</FormLabel>
            <Input type="text" name="device_name" value={formData?.device_name} onChange={(e) => handleElementChange(e.target.value,'device_name')} />
            {errors?.device_name && <FormHelperText style={{ color: 'red' }}>Device Name is Required.</FormHelperText>}
          </FormControl>

          <FormControl>
            <FormLabel>Password Device Renaming</FormLabel>
            <Input type="text" name="device_renaming" value={formData?.device_renaming} onChange={(e) => handleElementChange(e.target.value,'device_renaming')} />
            {errors?.device_renaming && <FormHelperText style={{ color: 'red' }}>Device password is required.</FormHelperText>}
          </FormControl>
          <FormControl>
            <Checkbox type = "checkbox" label="Save Password Device Renaming" value={isChecked} defaultChecked={isChecked} onChange={()=>setIsChecked(!isChecked)}></Checkbox>
          </FormControl>

          <Button
            fullWidth
            type="submit"
            style={{ padding: '10px 10px', background: '#0074be' }}
          >
            Update Device Name
          </Button>
        </Stack>
       
      </Stack>
    </form>
  );
}
export default DeviceRename;
