import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignUpForm from './SignUpForm';
import * as userActions from '../../actions/userActions';
import * as userApi from '../../api/userApi';

class SignUpFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      password: ""
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.checkFormError = this.checkFormError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.firstName,
      lastName: nextProps.lastName,
      email: nextProps.email,
      password: ""
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

    if (field == "email" && event.target.value != "") {
      var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegEx.test(event.target.value)) {    
        userApi.validateEmail({email: event.target.value}).then(response => {
          if (!response.available) {
            state["emailError"] = "This email is already in use"
          } else {
            state["emailError"] = "";
          }
          return this.setState(state);
        })
      } else {
        state["emailError"] = "This email is not valid"
        return this.setState(state);
      }
    } else {
      return this.setState(state);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <SignUpForm formInfo={ this.state } onChange={ this.updateFormState } onBlur= { this.checkFormError } onSubmit={ this.handleSubmit } />
    );
  }
}

SignUpFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstNameError: PropTypes.string,
  lastNameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string
}

function mapStateToProps(state, props) {
  return state.user;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer);
