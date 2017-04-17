import * as types from '../actions/types';
import * as initialState from './initialState';
import { browserHistory } from 'react-router';

export default function projectsReducer(state = initialState.getNewProjects(), action) {
  switch(action.type) {
    case types.GET_MY_PROJECTS_SUCCESS:
      return Object.assign({}, state, action.projects);

    case types.GET_MY_PROJECTS_ERROR:
      browserHistory.push('/500');
      return state;

    default:
      return state;
  }
}
