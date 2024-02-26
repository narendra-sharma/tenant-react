import { GET_USERS, GET_USER_PROFILE, LOGIN_HISTORY, USER_PERMISSIONS, USER_UPDATE } from './userTypes';

const initialState = {
  user: JSON.parse(localStorage.getItem('authUser')),
  permissions:null,
  loginHistory: [],
  users: [],
  tusers:0,
  usersPermissions:null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    case USER_PERMISSIONS:
      localStorage.setItem('permissions',JSON.stringify(action.payload.a))
      return {
        ...state,
        permissions: action.payload?.b,
        usersPermissions:action.payload?.a
      };
    case LOGIN_HISTORY:
      return {
        ...state,
        loginHistory: action.payload,
      };
      case GET_USERS:
        // const combinedArray = [...state.users, ...(action.payload?.data || [])];
        // const uniqueArray = Array.from(new Set(combinedArray.map(item => item._id))).map(_id => combinedArray.find(item => item._id === _id));
        return {
          ...state,
          users: action.payload?.data,
          tusers:action.payload?.total
        };
    
    default:
      return state;
  }
};

export default userReducer;
