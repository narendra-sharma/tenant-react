import { GET_USER_PROFILE, LOGIN_HISTORY, USER_PERMISSIONS, USER_UPDATE } from './userTypes';

const initialState = {
  user: JSON.parse(localStorage.getItem('authUser')),
  permissions: [
    {
      name: 'Tenant Management',
      permissions: [
        {
          key: 'can_view_devices',
          name: 'Can view devices',
          readOnly: true,
          member: false,
          manager: true,
          admin: true,
        },
        {
          key: 'can_view_device_detail',
          name: 'Can view device details ',
          readOnly: true,
          member: false,
          manager: true,
          admin: true,
        },
        {
          key: 'can_change_own_detail',
          name: 'Can change own details',
          readOnly: true,
          member: false,
          manager: true,
          admin: true,
        },
        {
          key: 'can_change_device_detail',
          name: 'Can change device details (except serial number)',
          readOnly: false,
          member: true,
          manager: true,
          admin: true,
        },
        {
          key: 'can_change_device_rename_password',
          name: 'Can change device rename password',
          readOnly: false,
          member: true,
          manager: true,
          admin: true,
        },
        {
          key: 'can_change_company_detail',
          name: 'Can change company details',
          readOnly: false,
          member: true,
          manager: true,
          admin: true,
        },
      ],
    },
    {
      name: 'ADMIN Management',
      permissions: [
        {
          key: 'can_create_tenants',
          name: 'Can create tenants',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_create_new_user',
          name: 'Can create new users',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_create_new_device',
          name: 'Can create new devices',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_assign_devices',
          name: 'Can assign devices to tenants',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_delete_tenants',
          name: 'Can delete tenants',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_delete_users',
          name: 'Can delete users',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_delete_devices',
          name: 'Can delete devices',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
        {
          key: 'can_change_serial_number',
          name: 'Can change serial number of devices',
          readOnly: false,
          member: false,
          manager: false,
          admin: true,
        },
      ],
    },
  ],
  loginHistory: [],
  userData: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    case USER_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    case LOGIN_HISTORY:
      return {
        ...state,
        loginHistory: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
