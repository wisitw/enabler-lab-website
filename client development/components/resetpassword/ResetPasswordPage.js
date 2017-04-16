import React, { Component, PropTypes } from 'react';
import ResetPasswordFormContainer from './ResetPasswordFormContainer';

class ResetPasswordPage extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 login-box">
              <ResetPasswordFormContainer code={ this.props.params.code } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  params: PropTypes.object.isRequired
}

export default ResetPasswordPage;
