import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextFieldGroup from './TextFieldGroup';
import * as userActions from '../../actions/userActions';

class SignUpFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      user: this.props.user,
      error: {

      },
      notTyped: true
    };
    this.updateTextField = this.updateTextField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      notTyped: true
    });
  }

  updateTextField(key, value) {
    let newState = Object.assign({}, this.state);
    newState.user[key] = value;

    if (key == "firstName") {
      newState.notTyped = (value == "") || (this.state.user.lastName == "") || (this.state.user.email == "") || (this.state.user.password == "");
    }

    if (key == "lastName") {
      newState.notTyped = (value == "") || (this.state.user.firstName == "") || (this.state.user.email == "") || (this.state.user.password == "");
    }

    if (key == "email") {
      newState.notTyped = (value == "") || (this.state.user.lastName == "") || (this.state.user.firstName == "") || (this.state.user.password == "");
    }

    if (key == "password") {
      newState.notTyped = (value == "") || (this.state.user.lastName == "") || (this.state.user.email == "") || (this.state.user.firstName == "");
    }

    this.setState(newState);
  }

  handleError(key, error) {
    let newState = Object.assign({}, this.state);
    newState.error[key] = error;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signup(this.state.user);
  }

  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2"><i className="icon-user-add"></i> สมัครสมาชิกเลย ฟรี! </h2>
        <div className="row">
          <div className="col-sm-12">
            <form className="form-horizontal">
              <TextFieldGroup name="firstName" label="ชื่อ" value={ this.state.user.firstName } isRequired={ true } onUpdate={ this.updateTextField } setError={ this.handleError } />
              <TextFieldGroup name="lastName" label="นามสกุล" value={ this.state.user.lastName } isRequired={ true } onUpdate={ this.updateTextField } setError={ this.handleError } />
              <TextFieldGroup name="email" types="อีเมล" label="Email" value={ this.state.user.email } isRequired={ true } onUpdate={ this.updateTextField } isEmail={ true } setError={ this.handleError } />
              <TextFieldGroup name="password" types="รหัสผ่าน" label="Password" value={ this.state.user.password } isRequired={ true } onUpdate={ this.updateTextField } setError={ this.handleError }  />
              <div className="form-group">
                <label className="col-sm-4 control-label"></label>
                <div className="col-sm-6">
                  <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.notTyped || this.state.error.firstName || this.state.error.lastName  || this.state.error.email  || this.state.error.password } >สมัครสมาชิก</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignUpFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
