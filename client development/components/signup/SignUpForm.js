import React, { Component, PropTypes } from 'react';
import TextFieldGroup from '../common/form/TextFieldGroup'

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2"><i className="icon-user-add"></i> Create your account, Its free </h2>
        <div className="row">
          <div className="col-sm-12">
            <form className="form-horizontal">
              <TextFieldGroup name="firstName" label="First Name" onChange={ this.props.onChange } onBlur={ this.props.onBlur } error={ this.props.formInfo.firstNameError } value={ this.props.formInfo.firstName } isRequired={ true } />
              <TextFieldGroup name="lastName" label="Last Name" onChange={ this.props.onChange } onBlur={ this.props.onBlur } error={ this.props.formInfo.lastNameError } value={ this.props.formInfo.lastName } isRequired={ true } />
              <TextFieldGroup name="email" type="email" label="Email" onChange={ this.props.onChange } onBlur={ this.props.onBlur } error={ this.props.formInfo.emailError } value={ this.props.formInfo.email } isRequired={ true } />
              <TextFieldGroup name="password" type="password" label="Password" onChange={ this.props.onChange } onBlur={ this.props.onBlur } error={ this.props.formInfo.passwordError } value={ this.props.formInfo.password } isRequired={ true } />
              <div className="form-group">
                <label className="col-md-4 control-label"></label>
                <div className="col-md-8">
                  <button className="btn btn-primary" onClick={ this.props.onSubmit } disabled={ (this.props.formInfo.firstNameError || this.props.formInfo.lastNameError || this.props.formInfo.emailError || this.props.formInfo.passwordError) ? true : false }>Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  formInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SignUpForm;
