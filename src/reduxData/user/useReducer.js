import { LOG_OUT, UPDATE_PASSWORD, USER_UPDATE } from './userTypes';

const initialState = {
  user: JSON.parse(localStorage.getItem('authUser')),
  password: null,
  token: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return initialState;
  }
};

export default userReducer;
