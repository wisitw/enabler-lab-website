import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import TextFieldGroup from './TextFieldGroup';
import * as userActions from '../../actions/userActions';

class ResetPasswordFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      password: "",
      error: {

      },
      code: this.props.code
    };
    this.updateTextField = this.updateTextField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillMount() {
    this.props.actions.checkResetPasswordCode(this.props.code);
  }

  updateTextField(key, value) {
    let newState = Object.assign({}, this.state);
    newState[key] = value;
    this.setState(newState);
  }

  handleError(key, error) {
    let newState = Object.assign({}, this.state);
    newState.error[key] = error;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.resetPassword(this.state.password, this.state.code);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-intro text-center">
          <h2 className="logo-title">
            <span className="logo-icon"><i className="icon icon-search-1 ln-shadow-logo shape-0"></i> </span> ENABLER<span>LAB </span>
          </h2>
        </div>
        <div className="panel-body">
          <form role="form">
            <TextFieldGroup name="password" icon="icon-user fa" types="password" label="New Password" onUpdate={ this.updateTextField } setError={ this.handleError } value={ this.state.password } isRequired={ true } />
            <div className="form-group">
              <label className="col-md-4 control-label"></label>
              <div className="col-md-8">
                <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error.password }>Reset my password</button>
              </div>
            </div>
          </form>
        </div>
        <div className="panel-footer">
          <p className="text-center"><Link to="/signin">Back to Login</Link></p>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    );
  }
}

ResetPasswordFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordFormContainer);
