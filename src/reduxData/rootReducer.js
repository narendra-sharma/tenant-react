import { combineReducers } from 'redux';

import userReducer from './user/useReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
