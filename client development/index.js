import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'; 
import routes from './routes';
import * as userApi from './api/userApi';
import * as types from './actions/types';

const store= configureStore();

if (localStorage.getItem("enablerT") !== null) {
  userApi.fetchCurrentUser({token: localStorage.getItem("enablerT")}).then(response => {
    store.dispatch({
      type: types.FETCH_CURRENT_USER_INFO_SUCCESS,
      user: userApi.apiUserToUser(response.user)
    })
  });
}

render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
  , document.getElementById('app'));
