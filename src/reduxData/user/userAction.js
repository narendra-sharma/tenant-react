import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { GET_USERS, GET_USER_PROFILE, LOGIN_HISTORY, USER_PERMISSIONS, USER_UPDATE } from './userTypes';

const url = import.meta.env.VITE_API_URL;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':localStorage.getItem('custom-auth-token')

  },
};
const token =()=>{
  return localStorage.getItem('custom-auth-token');
};
export const catch_errors_handle = (error, dispatch) => {
  if (error.response) {
    toast.error(error.response.data.message || error.response.data.error);
    if (error.response.status === 401) {
      localStorage.removeItem('authUser');
      localStorage.removeItem('custom-auth-token');
      dispatch(set_update_user(''));
    } 
  } else {
    toast.error(error.message);
  }
};

export const login = async (user, dispatch, navigate) => {
  dispatch(start_loading());
  try {
    const res = await axios.post(url + 'auth/login', user, headers);
    if (res?.data?.token && res?.data?.data) {
      toast.success('Successfully user logged-in!');
      localStorage.setItem('custom-auth-token', res?.data?.token);
      dispatch(set_update_user({ ...res?.data?.data, token: res?.data?.token }));
      navigate('/dashboard');
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};
export const update_profile_detail = async (data, dispatch) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] =token();
    headers.headers['Content-Type'] = 'multipart/form-data';
    const res = await axios.put(url + 'profile/update', data, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully updated profile');
      get_user_profile_details(dispatch)
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};
export const set_update_user = (user) => {
  localStorage.setItem('authUser', JSON.stringify(user));
  return {
    type: USER_UPDATE,
    payload: user,
  };
};
export const update_password = async (token, dispatch, newPassword) => {
  dispatch(start_loading());
  try {
    const res = await axios.post(`${url}auth/reset-password/${token}`, { password: newPassword.newUserPassword }, Headers);
    if (res?.data?.status) {
      toast.success('password updated succesfully!');
      return res;
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const forgot_password = async (userEmail, dispatch, navigate, redirect) => {
  dispatch(start_loading());
  try {
    const res = await axios.post(`${url}auth/forgot-password`, { email: userEmail }, Headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      (redirect && navigate) && navigate(`/reset-password-sent?email=${encodeURIComponent(userEmail)}`);
      return res.data;
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const change_password = async (dispatch, userData) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] =token();
    const res = await axios.put(`${url}profile/change-password`, userData, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      return res;
    } else {
      toast.error(res?.data?.error);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  } finally {
    dispatch(stop_loading());
  }
};

export const get_permissions = async (dispatch) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] =token();
    const res = await axios.get(url + 'admin/permission', headers);
    if (res.data && res.data.status) {
      const data=[
        {
          name:'Tenant Management',
          permissions:res.data.data[0].permissions
        },
        {
          name:'ADMIN Management',
          permissions:res.data.data[1].permissions
        },
      ]
      dispatch({
        type: USER_PERMISSIONS,
        payload: data,
      });
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const update_permissions = async (data, dispatch) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] =token();
    const res = await axios.put(url + 'admin/edit-permission', {permission:data}, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully updated permissions!');
      get_permissions(dispatch);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_login_history = async (dispatch) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] =token();
    const res = await axios.get(`${url}profile/login-history`, headers);
    if (res?.data?.status) {
      dispatch({ type: LOGIN_HISTORY, payload: res?.data.data });
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_users = async (dispatch) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] =token();
    const res = await axios.get(`${url}admin/users`, headers);
    if (res?.data?.status) {
      dispatch({ type: GET_USERS, payload: res?.data.data });
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_user_profile_details = async (dispatch) => {
  dispatch(start_loading());
  try {
    if(token()){
      headers.headers['x-access-token'] =token();
      const res = await axios.get(`${url}profile`, headers);
      if (res?.data?.status) {
        dispatch(set_update_user({ ...res?.data?.data, token: token() }));
      } else {
        toast.error(res?.data?.message);
      }
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};
