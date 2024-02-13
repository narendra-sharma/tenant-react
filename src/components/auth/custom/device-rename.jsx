'use client';

import * as React from 'react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/custom/client';
import { useUser } from '@/hooks/use-user';
import { Image } from '@/components/core/image';
import { RouterLink } from '@/components/core/link';
import { toast } from '@/components/core/toaster';
import { login } from '@/reduxData/rootAction';
import { get_device_bySerialNumber, update_device_renaming } from '@/reduxData/devices/deviceAction';


const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

export function DeviceRename() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    serial_numer: '',
    device_name: '',
    device_renaming:''
  });

const [errors, setErrors]=useState({
    serial_numer: '',
    device_name: '',
    device_renaming:''
})

const { search } = useLocation();
const urlParams = new URLSearchParams(search);
const serialNumber = urlParams.get('serial_number');
React.useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await get_device_bySerialNumber(serialNumber,dispatch);
            setFormData({
                serial_numer: data.data.data?.serial_number,
                device_name: '',
                device_renaming:'' 
            })
          } catch (error) {
            console.error("Error in useEffect:", error);
          }
        };
      
        fetchData();
      }, [serialNumber]);

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

  const onSubmit = async (e) => {
    if (checkAllErrors()) {
        console.log('find the error', errors);
        return;
      }

      update_device_renaming(formData, dispatch)
  };

  const handleElementChange = (value, label) => {
    console.log(value, label);
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

          <Button
            fullWidth
            type="submit"
            style={{ padding: '10px 10px', background: '#0074be' }}
            onClick={(e) => onSubmit(e)}
          >
            Update Device Name
          </Button>
        </Stack>
        <Alert color="warning" variant="soft" style={{ display: 'none' }}>
          <Typography fontSize="sm">
            Use <Typography fontWeight="lg">rene@devias.io</Typography> with password{' '}
            <Typography fontWeight="lg">Secret1</Typography>
          </Typography>
        </Alert>
      </Stack>
    </form>
  );
}
