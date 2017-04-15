import { combineReducers } from 'redux';
import user from './userReducer';
import project from './projectReducer'

const rootReducer = combineReducers({
  user,
  project
});

export default rootReducer;
