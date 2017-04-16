import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ForgotPasswordFormContainer from './ForgotPasswordFormContainer';

class ForgotPasswordPage extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 login-box">
              <ForgotPasswordFormContainer />
              <div className="login-box-btm text-center">
                <p> Don't have an account? <br />
                <Link to="/signup"><strong>Sign Up !</strong></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;
