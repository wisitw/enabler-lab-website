import { combineReducers } from 'redux';
import user from './userReducer';
import project from './projectReducer';
import projects from './projectsReducer';
import searchAutoComplete from './searchAutoCompleteReducer';
import advanceSearch from './advanceSearchReducer';

const rootReducer = combineReducers({
  user,
  project,
  projects,
  searchAutoComplete,
  advanceSearch
});

export default rootReducer;
