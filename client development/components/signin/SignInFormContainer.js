import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInForm from './SignInForm';
import * as userActions from '../../actions/userActions';

class SignInFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      email: this.props.email,
      password: "",
      signinError: this.props.signinError
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.checkFormError = this.checkFormError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      email: nextProps.email,
      password: "",
      signinError: nextProps.signinError
    });
  }

  updateFormState(event) {
    const field = event.target.name;
    const state = { ...this.state };
    state[field] = event.target.value;
    return this.setState(state);
  }

  checkFormError(event) {
    const field = event.target.name;
    const state = { ...this.state };
    state[field + "Error"] = event.target.value == "" ? "required" : "";
    return this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signin({
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <SignInForm formInfo={ this.state } onChange={ this.updateFormState } onBlur= { this.checkFormError } onSubmit={ this.handleSubmit } />
    );
  }
}

SignInFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  signinError: PropTypes.string
}

function mapStateToProps(state, props) {
  return state.user;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormContainer);
