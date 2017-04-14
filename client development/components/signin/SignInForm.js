import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TextFieldBlock from '../common/form/TextFieldBlock';

class SignInForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const errorAlert = this.props.formInfo.signinError ? (
      <div className="alert alert-danger">
        <strong>Error!</strong> { this.props.formInfo.signinError }
      </div>) : "";

    return (
      <div className="panel panel-default">
        { errorAlert }
        <div className="panel-intro text-center">
          <h2 className="logo-title">
            <span className="logo-icon"><i className="icon icon-search-1 ln-shadow-logo shape-0"></i> </span> ENABLER<span>LAB </span>
          </h2>
        </div>
        <div className="panel-body">
          <form role="form">
            <TextFieldBlock name="email" icon="icon-user fa" type="email" label="Email" onChange={ this.props.onChange } onBlur={ this.props.onBlur } error={ this.props.formInfo.emailError } value={ this.props.formInfo.email } isRequired={ true } />
            <TextFieldBlock name="password" icon="icon-lock fa" type="password" label="Password" onChange={ this.props.onChange } onBlur={ this.props.onBlur } error={ this.props.formInfo.passwordError } value={ this.props.formInfo.password } isRequired={ true } />
            <div className="form-group">
              <label className="col-md-4 control-label"></label>
              <div className="col-md-8">
                <button className="btn btn-primary" onClick={ this.props.onSubmit }>Sign In</button>
              </div>
            </div>
          </form>
        </div>
        <div className="panel-footer">
          <p className="text-center pull-right"><Link to="/forgotpassword">Lost your password?</Link></p>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  formInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignInForm;
