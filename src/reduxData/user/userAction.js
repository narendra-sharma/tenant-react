import axios from 'axios';

import { LOG_OUT, USER_UPDATE } from './userTypes';
import { start_loading, stop_loading } from '../rootAction';
import { toast } from '@/components/core/toaster';
const url = import.meta.env.VITE_API_URL;
const Headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};
export const logout = () => {
  return {
    type: LOG_OUT,
  };
};

export const catch_errors_handle = (error,dispatch) => {
  if (error.response) {
    toast.error(error.response.data.message);
    if (error.response.status === 401) {
      localStorage.removeItem("authUser");
      localStorage.removeItem('custom-auth-token');
      dispatch(set_update_user(''));
    }
  } else {
    toast.error(error.message);
  }
};

export const signup = async (user, role, navigate, dispatch) => {
  // start loading dispatch
  console.log('Started diapatch');
  try {
    const url = 'dummyurl.com';
    const Headers = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const res = await axios.post(url, user, Headers);
    if (res?.data?.status) {
      // send a toast success message
      navigate('/login');
    }
  } catch (error) {}
};

export const login = async (user, dispatch,navigate) => {
  dispatch(start_loading());
  try {
    const res = await axios.post(url+'auth/login', user, Headers);
    console.log(res);
    if (res?.data?.token && res?.data?.data) {
      toast.success("Successfully user logged-in!");
      localStorage.setItem('custom-auth-token', res?.data?.token);
      dispatch(set_update_user({...res?.data?.data,token:res?.data?.token}));
      navigate('/dashboard')
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch));
  }finally {
    dispatch(stop_loading());
  }
};
export const set_update_user = (user) => {
  localStorage.setItem("authUser", JSON.stringify(user));
  return {
    type: USER_UPDATE,
    payload: user,
  };
};