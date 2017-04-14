import * as userApi from '../api/userApi';

export function signup(user) {
  return function(dispatch) {
    return userApi.signup(user).then(response => {
      if (response.success == true) {
        dispatch(userApi.signupSuccess(user));
      } else {
        dispatch(userApi.signupError(user, response.error));
      }
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function signin(user) {
  return function(dispatch) {
    return userApi.signin(user).then(response => {
      const token = response.token;
      if (response.success == true) {
        userApi.getCurrentUser({token: token}).then(response => {
          dispatch(userApi.signinSuccess(response.user, token));
        })      
      } else {
        dispatch(userApi.signinError(user, response.error));
      }
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}

export function signout(token) {
  return function(dispatch) {
    return userApi.signout({token: token}).then(response => {
      console.log(response);
      dispatch(userApi.signoutSuccess());
    });
  };
}
