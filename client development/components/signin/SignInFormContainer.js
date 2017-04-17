import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import TextFieldGroup from './TextFieldGroup';
import * as userActions from '../../actions/userActions';
import * as MessageSource from '../../resources/MessageSource';

class SignInFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      user: this.props.user,
      error: {

      },
      signInError: this.props.signInError
    };
    this.updateTextField = this.updateTextField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user,
      signInError: nextProps.signInError
    });
  }

  updateTextField(key, value) {
    let newState = Object.assign({}, this.state);
    newState.user[key] = value;
    this.setState(newState);
  }

  handleError(key, error) {
    let newState = Object.assign({}, this.state);
    newState.error[key] = error;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signin(this.state.user);
  }

  render() {
    return (
      <div className="panel panel-default">
        { 
          this.state.signInError ? (
            <div className="alert alert-danger">
              <strong>Error!</strong> { MessageSource.getAuthenticationError() }
            </div>
          ) : "" 
        }
        <div className="panel-intro text-center">
          <h2 className="logo-title">
            <span className="logo-icon"><i className="icon icon-search-1 ln-shadow-logo shape-0"></i> </span> ENABLER<span>LAB </span>
          </h2>
        </div>
        <div className="panel-body">
          <form role="form">
            <TextFieldGroup name="email" icon="icon-user fa" types="email" label="อีเมล" onUpdate={ this.updateTextField } setError={ this.handleError } value={ this.state.user.email } isRequired={ true } />
            <TextFieldGroup name="password" icon="icon-lock fa" types="password" label="รหัสผ่าน" onUpdate={ this.updateTextField } setError={ this.handleError } isRequired={ true } />
            <div className="form-group">
              <label className="col-md-4 control-label"></label>
              <div className="col-md-8">
                <button className="btn btn-primary" onClick={ this.handleSubmit }>เข้าสู่ระบบ</button>
              </div>
            </div>
          </form>
        </div>
        <div className="panel-footer">
          <p className="text-center pull-right"><Link to="/forgotpassword">ลืมรหัสผ่าน?</Link></p>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    );
  }
}

SignInFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signInError: PropTypes.bool
}

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email,
      password: ""
    },
    signInError: state.user.signinError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormContainer);
