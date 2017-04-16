import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import SignUpPage from './components/signup/SignUpPage';
import SignInPage from './components/signin/SignInPage';
import ForgotPasswordPage from './components/forgotpassword/ForgotPasswordPage';
import ResetPasswordPage from './components/resetpassword/ResetPasswordPage';
import AboutUsPage from './components/aboutus/AboutUsPage';
import FounderPage from './components/founder/FounderPage';
import DashboardPage from './components/dashboard/DashboardPage';
import AddProjectPage from './components/addproject/AddProjectPage';
import ProjectPage from './components/project/ProjectPage';
import SearchPage from './components/search/SearchPage';

import Error404Page from './components/error/404';
import Error405Page from './components/error/405';
import Error500Page from './components/error/500';

const requireAuthentication = (nextState, replace) => {
  if (localStorage.getItem("enablerT") === null) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path="/signup" component={ SignUpPage } />
    <Route path="/signin" component={ SignInPage } />
    <Route path="/forgotpassword" component={ ForgotPasswordPage } />
    <Route path="/resetpassword/:code" component={ ResetPasswordPage } />
    <Route path="/aboutus" component={ AboutUsPage } />
    <Route path="/founder" component={ FounderPage } />
    <Route path="/dashboard" component={ DashboardPage } onEnter={ requireAuthentication} />
    <Route path="/project/add" component={ AddProjectPage } onEnter={ requireAuthentication} />
    <Route path="/project/:projectUrl" component={ ProjectPage } />
    <Route path="/search" component={ SearchPage } />
    <Route path="/404" component={ Error404Page } />
    <Route path="/405" component={ Error405Page } />
    <Route path="/500" component={ Error500Page } />
  </Route>
);
