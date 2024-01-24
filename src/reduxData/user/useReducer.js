import { LOG_IN, LOG_OUT, SET_USER_TYPE } from './userTypes';

const initialState = {
  user: JSON.parse(localStorage.getItem('userDetails')),
  role: JSON.parse(localStorage.getItem('user-type')),
  token: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        user: null,
        role: null,
        token: null,
      };
    case SET_USER_TYPE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return initialState;
  }
};

export default userReducer;
