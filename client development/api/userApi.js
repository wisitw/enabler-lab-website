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

function userAttributeToApiUserAttribute(userAttribute, value, token) {
  switch (userAttribute) {
    case 'firstName':
      return {
        fname: value,
        token: token
      }
    case 'lastName':
      return {
        lname: value,
        token: token
      }
    default:
      return {
        [userAttribute]: value,
        token: token
      };
  }
}

export function apiUserToUser(user) {
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

export function isEmailAvailable(email) {
  var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegEx.test(email)) {
    const formBody = rootApi.objectToBody({email: email});

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
  } else {
    return new Promise(function(resolve, reject) {
      return resolve({
        available: false
      });
    });
  }
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
  return {
    type: types.SIGNIN_SUCCESS, 
    user: apiUserToUser(user),
    token: token
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

export function fetchCurrentUser(token) {
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

export function updateUserInfo(userAttribute, value, token) {
  const formBody = rootApi.objectToBody(userAttributeToApiUserAttribute(userAttribute, value, token));

  const request = new Request(rootApi.rootEndPoint + 'editinfo', {
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

export function updateUserInfoSuccess(user) {
  return {
    type: types.UPDATE_USER_INFO_SUCCESS,
    user: apiUserToUser(user)
  }
}

export function fetchCurrentUserSuccess(user) {
  return {
    type: types.FETCH_CURRENT_USER_INFO_SUCCESS,
    user: apiUserToUser(user)
  }
}

export function fetchProjectError() {
  return {
    type: types.FETCH_CURRENT_USER_INFO_ERROR,
    user: {}
  }
}

export function forgotPassword(email) {
  const formBody = rootApi.objectToBody({email: email});

  const request = new Request(rootApi.rootEndPoint + 'forget', {
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

export function checkResetPasswordCode(code) {
  const formBody = rootApi.objectToBody({code: code});

  const request = new Request(rootApi.rootEndPoint + 'checktochange', {
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

export function checkResetPasswordCodeSuccess(response) {
  return {
    type: types.CHECK_RESET_PASSWORD_CODE_SUCCESS,
    user: {

    }
  }
}

export function checkResetPasswordCodeError() {
  return {
    type: types.CHECK_RESET_PASSWORD_CODE_ERROR,
    user: {

    }
  }
}

export function resetPassword(newPassword, code) {
  const formBody = rootApi.objectToBody({code: code, password: newPassword});

  const request = new Request(rootApi.rootEndPoint + 'changepwd', {
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

export function resetPasswordSuccess() {
  return {
    type: types.RESET_PASSWORD_SUCCESS,
    user: {

    }
  }
}

export function resetPasswordError() {
  return {
    type: types.RESET_PASSWORD_ERROR,
    user: {
      
    }
  }
}
