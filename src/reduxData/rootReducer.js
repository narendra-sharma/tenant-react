import { combineReducers } from 'redux';
import loaderReducer from "./Loader/loaderReducer";
import userReducer from './user/useReducer';
import tenantReducer from './tenant/tenantReducer';
import deviceReducer from './devices/deviceReducer';

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  tenant:tenantReducer,
  device:deviceReducer,
});

export default rootReducer;
