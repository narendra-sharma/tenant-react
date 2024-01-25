import { LOG_OUT, USER_UPDATE } from './userTypes';

const initialState = {
  user: JSON.parse(localStorage.getItem('authUser'))
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        user: null
      };
      case USER_UPDATE:
        return {
          ...state,
          user: action.payload
        }
    default:
      return initialState;
  }
};

export default userReducer;
