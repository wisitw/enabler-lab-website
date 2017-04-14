import * as types from '../actions/types';
import initialState from './initialState';
import { browserHistory } from 'react-router';

export default function userReducer(state = initialState.user, action) {
  console.log("user reducer");
  switch(action.type) {
    case types.SIGNUP_SUCCESS:
      browserHistory.push('/signin');
      return Object.assign({}, action.user, { emailError: '', signinError: '' });
    case types.SIGNUP_EMAIL_ALREADY_IN_USED:
      return Object.assign({}, action.user, { emailError: 'This email is already in use' });
    case types.SIGNIN_SUCCESS:
      browserHistory.push('/');
      console.log(action.user);
      return Object.assign({}, action.user, { isSignedIn: true, emailError: '', signinError: '' });
    case types.SIGNIN_ERROR:
      return Object.assign({}, action.user, { signinError: 'Wrong email and/or password' });
    case types.SIGNOUT_SUCCESS:
      return Object.assign({}, { emailError: '', signinError: '' });
    default:
      return state;
  }
}
