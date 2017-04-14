import * as rootApi from './rootApi';
import * as types from '../actions/types'

function userToApiUser(user) {
  return {
    fname: user.firstName,
    lname: user.lastName,
    email: user.email,
    password: user.password
  };
}

function apiUserToUser(user) {
  return {
    firstName: user.fname,
    lastName: user.lname,
    email: user.email,
    password: user.password
  };
}

export function signupSuccess(user) {
  return {
    type: types.SIGNUP_SUCCESS, 
    user
  }
}

export function signupError(user, error) {
  switch (error) {
    case 1:
      return {
        type: types.SIGNUP_EMAIL_ALREADY_IN_USED,
        user
      }
    default:
      return {
        type: types.SIGNUP_EMAIL_ALREADY_IN_USED,
        user
      }
  }
}

export function signup(user) {
  const formBody = rootApi.objectToBody(userToApiUser(user));

  const request = new Request(rootApi.rootEndPoint + 'signup', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: formBody
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function validateEmail(email) {
  const formBody = rootApi.objectToBody(email);

  const request = new Request(rootApi.rootEndPoint + 'emailavailable', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: formBody
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function signin(user) {
  const formBody = rootApi.objectToBody(user);

  const request = new Request(rootApi.rootEndPoint + 'signin', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: formBody
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function signinSuccess(user, token) {
  let userWithToken = apiUserToUser(user);
  userWithToken.token = token;


  return {
    type: types.SIGNIN_SUCCESS, 
    user: userWithToken
  }
}

export function signinError(user, error) {
  switch (error) {
    case 1:
      return {
        type: types.SIGNIN_ERROR,
        user
      }
    case 2:
      return {
        type: types.SIGNIN_ERROR,
        user
      }
    case 3: {
      return {
        type: types.SIGNIN_ERROR,
        user
      }
    }
    default:
      return {
        type: types.SIGNIN_ERROR,
        user
      }
  }
}

export function getCurrentUser(token) {
  const formBody = rootApi.objectToBody(token);

  const request = new Request(rootApi.rootEndPoint + 'userdata', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: formBody
  });
  
  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function signout(token) {
  const formBody = rootApi.objectToBody(token);

  const request = new Request(rootApi.rootEndPoint + 'signout', {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: formBody
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function signoutSuccess() {
  return {
    type: types.SIGNOUT_SUCCESS
  }
}
