import * as types from '../actions/types';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function projectReducer(state = initialState.project, action) {
  switch(action.type) {
    case types.ADD_PROJECT_SUCCESS:
      browserHistory.push('/project/' + action.project.projectUrl);
      return Object.assign({}, action.project);
    case types.ADD_PROJECT_ERROR:
      return Object.assign({}, action.project);
    case types.FETCH_PROJECT_SUCCESS:
      return Object.assign({}, action.project);
    case types.FETCH_PROJECT_ERROR:
      browserHistory.push('/project/error' + action.project.projectUrl);
      return Object.assign({}, {error: action.error});
    default:
      return state;
  }
}
