import { combineReducers } from 'redux';
import user from './userReducer';
import project from './projectReducer'
import projects from './projectsReducer'

const rootReducer = combineReducers({
  user,
  project,
  projects
});

export default rootReducer;
