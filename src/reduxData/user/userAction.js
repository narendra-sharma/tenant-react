import axios from 'axios';

import { toast } from '@/components/core/toaster';

import { start_loading, stop_loading } from '../rootAction';
import { GET_USER_PROFILE, GET_USERS, LOGIN_HISTORY, USER_PERMISSIONS, USER_UPDATE } from './userTypes';

const url = import.meta.env.VITE_API_URL;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': localStorage.getItem('custom-auth-token'),
  },
};
const token = () => {
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

export const login_user = async (user, dispatch, navigate) => {
  dispatch(start_loading());
  try {
    const res = await axios.post(url + 'auth/login', user, headers);
    if (res?.data?.token && res?.data?.data) {
      toast.success('Successfully user logged-in!');
      localStorage.setItem('custom-auth-token', res?.data?.token);
      dispatch(set_update_user({ ...res?.data?.data, token: res?.data?.token }));
      get_permissions(dispatch,res?.data?.data?.role);
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
    headers.headers['x-access-token'] = token();
    headers.headers['Content-Type'] = 'multipart/form-data';
    const res = await axios.put(url + 'profile/update', data, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully updated profile');
      get_user_profile_details(dispatch);
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
    const res = await axios.post(
      `${url}auth/reset-password/${token}`,
      { password: newPassword.newUserPassword },
      Headers
    );
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
      redirect && navigate && navigate(`/reset-password-sent?email=${encodeURIComponent(userEmail)}`);
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
    headers.headers['x-access-token'] = token();
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

export const get_permissions = async (dispatch, userRole) => {
  try {
    dispatch(start_loading());
    headers.headers['x-access-token'] = token();
    const res = await axios.get(url + 'admin/permission', headers);
    if (res.data && res.data.status) {
      const data = [
        {
          name: 'Tenant Management',
          permissions: res.data.data[0].permissions,
        },
        {
          name: 'ADMIN Management',
          permissions: res.data.data[1].permissions,
        },
      ];
      const permissionsArray = data;
      const makeObject = (key) => {
        const resultObject = {};

        permissionsArray.forEach((group,index) => {
          resultObject[group.name] = group.permissions.reduce((acc, permission) => {
            acc[permission.key] = permission[key];
            return acc;
          }, {});
        });

        return resultObject;
      };

      // Example usage:
      const tenantUserObject = makeObject(userRole);
      dispatch({
        type: USER_PERMISSIONS,
        payload: {a:tenantUserObject,b:data},
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
    headers.headers['x-access-token'] = token();
    data[0].name = 'tenant_management';
    data[1].name = 'admin_manangement';
    const res = await axios.put(url + 'admin/edit-permission', { permission: data }, headers);
    if (res.data && res.data.status) {
      toast.success('Successfully updated permissions!');
      // get_permissions(dispatch);
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
    headers.headers['x-access-token'] = token();
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

export const get_users = async (dispatch, page, limit, user, company, status) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.get(
      `${url}admin/user_list?page=${page}&limit=${limit}${user ? '&user=' + user : ''}${
        company ? '&company=' + company : ''
      }${status ? '&status=' + status : ''}`,
      headers
    );
    if (res?.data?.status) {
      dispatch({ type: GET_USERS, payload: res?.data });
    } else {
      toast.error(res?.data?.message);
    }
    return res.data.data;
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const get_user_profile_details = async (dispatch) => {
  dispatch(start_loading());
  try {
    if (token()) {
      headers.headers['x-access-token'] = token();
      const res = await axios.get(`${url}profile`, headers);
      get_permissions(dispatch, res?.data?.data?.role);
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

export const create_user = async (data, dispatch,navigate) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.post(`${url}admin/add_user`, data, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      navigate('../')
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

export const update_user = async (data, dispatch,navigate) => {
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.put(`${url}admin/edit_user`, data, headers);
    if (res?.data?.status) {
      toast.success(res?.data?.message);
      navigate('../')
      // get_tenants(dispatch)
    } else {
      toast.error(res?.data?.message);
    }
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
};

export const delete_user = async (id,dispatch)=>{
  dispatch(start_loading());
  try {
    headers.headers['x-access-token'] = token();
    const res = await axios.delete(
      `${url}admin/remove_user/${id}`,
      headers
    );
    if (res?.data?.status) {
      toast.success(res?.data?.message)
      // dispatch({ type: GET_DASHBOARD_DEVICES, payload: res?.data });
      get_users(dispatch)
    } else {
      toast.error(res?.data?.message);
    }
    return res.data.data;
  } catch (error) {
    dispatch(catch_errors_handle(error, dispatch));
  } finally {
    dispatch(stop_loading());
  }
}