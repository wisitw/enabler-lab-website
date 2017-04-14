import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SignUpPage from './components/signup/SignUpPage';
import SignInPage from './components/signin/SignInPage';
import AboutUsPage from './components/aboutus/AboutUsPage';
import DashboardPage from './components/dashboard/DashboardPage';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path="/signup" component={ SignUpPage } />
    <Route path="/signin" component={ SignInPage } />
    <Route path="/aboutus" component={ AboutUsPage } />
    <Route path="/dashboard" component={ DashboardPage } />
  </Route>
);
