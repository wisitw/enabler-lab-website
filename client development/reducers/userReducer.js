import * as types from '../actions/types';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case types.SIGNUP_SUCCESS:
      browserHistory.push('/signin');
      return Object.assign({}, action.user);

    case types.SIGNUP_EMAIL_ALREADY_IN_USED:
      return Object.assign({}, action.user);

    case types.SIGNIN_SUCCESS:
      localStorage.setItem("enablerT", action.token);
      browserHistory.push('/');
      return Object.assign({}, action.user);

    case types.SIGNIN_ERROR:
      return Object.assign({}, action.user, { signinError: true });

    case types.SIGNOUT_SUCCESS:
      localStorage.removeItem("enablerT");
      browserHistory.push('/');
      return Object.assign({});

    case types.UPDATE_USER_INFO_SUCCESS:
      return Object.assign({}, action.user);
    
    case types.UPDATE_USER_INFO_ERROR:
      return Object.assign({}, state);

    case types.FETCH_CURRENT_USER_INFO_SUCCESS:
      return Object.assign({}, action.user);

    case types.FETCH_CURRENT_USER_INFO_ERROR:
      browserHistory.push('/405');
      return state;

    default:
      return state;
  }
}
