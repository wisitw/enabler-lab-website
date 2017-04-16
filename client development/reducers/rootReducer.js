import { combineReducers } from 'redux';
import user from './userReducer';
import project from './projectReducer';
import projects from './projectsReducer';
import searchAutoComplete from './searchAutoCompleteReducer';

const rootReducer = combineReducers({
  user,
  project,
  projects,
  searchAutoComplete
});

export default rootReducer;
