import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import UserForm from './UserForm';
import * as userActions from '../../actions/userActions';

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

  render() {
    return (
      <UserForm formInfo={ this.state } />
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
