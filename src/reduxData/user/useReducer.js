import { GET_USERS, GET_USER_PROFILE, LOGIN_HISTORY, USER_PERMISSIONS, USER_UPDATE } from './userTypes';

const initialState = {
  user: JSON.parse(localStorage.getItem('authUser')),
  permissions: [
    {
      name: 'Tenant Management',
      permissions: [
        {
          key: 'can_view_devices',
          name: 'Can view devices',
          tenant_read_only: true,
          tenant_user: false,
          tenant_manager: true,
          admin: true,
        },
        {
          key: 'can_view_device_detail',
          name: 'Can view device details ',
          tenant_read_only: true,
          tenant_user: false,
          tenant_manager: true,
          admin: true,
        },
        {
          key: 'can_change_own_detail',
          name: 'Can change own details',
          tenant_read_only: true,
          tenant_user: false,
          tenant_manager: true,
          admin: true,
        },
        {
          key: 'can_change_device_detail',
          name: 'Can change device details (except serial number)',
          tenant_read_only: false,
          tenant_user: true,
          tenant_manager: true,
          admin: true,
        },
        {
          key: 'can_change_device_rename_password',
          name: 'Can change device rename password',
          tenant_read_only: false,
          tenant_user: true,
          tenant_manager: true,
          admin: true,
        },
        {
          key: 'can_change_company_detail',
          name: 'Can change company details',
          tenant_read_only: false,
          tenant_user: true,
          tenant_manager: true,
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
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_create_new_user',
          name: 'Can create new users',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_create_new_device',
          name: 'Can create new devices',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_assign_devices',
          name: 'Can assign devices to tenants',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_delete_tenants',
          name: 'Can delete tenants',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_delete_users',
          name: 'Can delete users',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_delete_devices',
          name: 'Can delete devices',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
        {
          key: 'can_change_serial_number',
          name: 'Can change serial number of devices',
          tenant_read_only: false,
          tenant_user: false,
          tenant_manager: false,
          admin: true,
        },
      ],
    },
  ],
  loginHistory: [],
  users: [],
  tusers:0
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
      case GET_USERS:
        const combinedArray = [...state.users, ...(action.payload?.data || [])];
        const uniqueArray = Array.from(new Set(combinedArray.map(item => item._id))).map(_id => combinedArray.find(item => item._id === _id));
        return {
          ...state,
          users: uniqueArray,
          tusers:action.payload?.total
        };
    
    default:
      return state;
  }
};

export default userReducer;
