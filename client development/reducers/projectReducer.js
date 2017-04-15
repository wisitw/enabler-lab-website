import * as types from '../actions/types';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function projectReducer(state = initialState.project, action) {
  switch(action.type) {
    case types.ADD_PROJECT_SUCCESS:
      // browserHistory.push('/signin');
      return Object.assign({}, action.project);
    case types.ADD_PROJECT_ERROR:
      return Object.assign({}, action.project);
    default:
      return state;
  }
}
