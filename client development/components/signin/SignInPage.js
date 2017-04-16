import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SignInFormContainer from './SignInFormContainer';

class SignInPage extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 login-box">
              <SignInFormContainer />
              <div className="login-box-btm text-center">
                <p> ยังไม่ได้สมัครสมาชิก? <br />
                <Link to="/signup"><strong>สมัครเลย!</strong></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInPage;
