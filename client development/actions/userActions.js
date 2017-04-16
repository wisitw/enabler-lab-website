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
        userApi.fetchCurrentUser({token: token}).then(response => {
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

export function signout() {
  return function(dispatch) {
    return userApi.signout({token: localStorage.getItem("enablerT")}).then(() => {
      dispatch(userApi.signoutSuccess());
    });
  };
}

export function updateUser(userAttribute, value) {
  return function(dispatch) {
    return userApi.updateUserInfo(userAttribute, value, localStorage.getItem("enablerT")).then(() => {
      userApi.fetchCurrentUser({token: localStorage.getItem("enablerT")}).then(response => {
        dispatch(userApi.updateUserInfoSuccess(response.user));
      });
    });
  };
}

export function fetchCurrentUser() {
  return function(dispatch) {
    return userApi.fetchCurrentUser({token: localStorage.getItem("enablerT")}).then((response) => {
      if (response.user) {
        dispatch(userApi.fetchCurrentUserSuccess(response.user));
      } else {
        dispatch(userApi.fetchCurrentUserError());
      }
    });
  };
}

export function forgotPassword(email) {
  userApi.forgotPassword(email);
}

export function checkResetPasswordCode(code) {
  return function(dispatch) {
    return userApi.checkResetPasswordCode(code).then((response) => {
      if (response.found) {
        dispatch(userApi.checkResetPasswordCodeSuccess(response));
      } else {
        dispatch(userApi.checkResetPasswordCodeError());
      }
    });
  };
}

export function resetPassword(newPassword, code) {
  return function(dispatch) {
    return userApi.resetPassword(newPassword, code).then((response) => {
      if (response.success) {
        dispatch(userApi.resetPasswordSuccess(response));
      } else {
        dispatch(userApi.resetPasswordError());
      }
    });
  };
}
