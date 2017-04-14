import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import SignUpForm from './SignUpForm';
import * as userActions from '../../actions/userActions';
import * as userApi from '../../api/userApi';

class UserFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      user: this.props.user
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.checkFormError = this.checkFormError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (!this.props.user.isSignedin) {
      browserHistory.push('/signin');
    }
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
    state.user[field] = event.target.value;
    return this.setState(state);
  }

  checkFormError(event) {
    const field = event.target.name;
    const state = { ...this.state };
    state.user[field + "Error"] = event.target.value == "" ? "required" : "";

    if (field == "email" && event.target.value != "") {
      var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegEx.test(event.target.value)) {    
        userApi.validateEmail({email: event.target.value}).then(response => {
          if (!response.available) {
            state.user["emailError"] = "This email is already in use"
          } else {
            state.user["emailError"] = "";
          }
          return this.setState(state);
        })
      } else {
        state.user["emailError"] = "This email is not valid"
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

UserFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

function mapStateToProps(state, props) {
  return state.user;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer);
