import axios from 'axios';

import { USER_PERMISSIONS, USER_UPDATE } from './userTypes';
import { start_loading, stop_loading } from '../rootAction';
import { toast } from '@/components/core/toaster';
const url = import.meta.env.VITE_API_URL;
const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const token=localStorage.getItem('custom-auth-token');
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

export const login = async (user, dispatch,navigate) => {
  dispatch(start_loading());
  try {
    const res = await axios.post(url+'auth/login', user, headers);
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
export const update_profile_detail = async (data,dispatch) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] = token;
    const res = await axios.post(url+'auth/profile',data, headers);
    if (res.data && res.data.status) {
      toast.success("Successfully updated profile");
      localStorage.setItem('custom-auth-token', token);
      dispatch(set_update_user({...res?.data?.data,token:token}));
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
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


export const get_permissions = async (dispatch) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] = token;
    const res = await axios.get(url+'auth/permissions', headers);
    if (res.data && res.data.status) {
      dispatch({
        type: USER_PERMISSIONS,
        payload: res.data.data
      })
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};
export const update_permissions = async (data,dispatch) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] = token;
    const res = await axios.post(url+'auth/permissions',data, headers);
    if (res.data && res.data.status) {
      toast.success("Successfully updated permissions!");
      get_permissions(dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error,dispatch))
  } finally {
    dispatch(stop_loading());
  }
};