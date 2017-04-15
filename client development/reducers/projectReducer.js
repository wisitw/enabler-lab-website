import * as types from '../actions/types';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function projectReducer(state = initialState.project, action) {
  switch(action.type) {
    case types.ADD_PROJECT_SUCCESS:
      browserHistory.push('/project/' + action.project.projectUrl);
      return Object.assign({}, state, action.project);

    case types.ADD_PROJECT_ERROR:
      return Object.assign({}, state);

    case types.FETCH_PROJECT_SUCCESS:
      return Object.assign({}, state, action.project);

    case types.FETCH_PROJECT_ERROR:
      browserHistory.push('/404');
      return state;

    case types.CLEAR_PROJECT:
      return initialState.project;

    case types.UPDATE_PROJECT_SUCCESS:
      return Object.assign({}, state, action.project);

    default:
      return state;
  }
}
