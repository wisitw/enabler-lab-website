import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextFieldGroup from './TextFieldGroup';
import * as userActions from '../../actions/userActions';

class ForgotPasswordFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      email: this.props.user.email,
      error: {

      },
      sent: false
    };
    this.updateTextField = this.updateTextField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
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
    userActions.forgotPassword(this.state.email);
    this.setState({
      sent: true
    });
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
          {
            this.state.sent ? (
              <p>We've sent you an instruction email. Please check your inbox and follow the instruction listed.</p>
            ) : (
              <form role="form">
                <TextFieldGroup name="email" icon="icon-user fa" types="email" label="Email" onUpdate={ this.updateTextField } setError={ this.handleError } value={ this.state.email } isRequired={ true } />
                <div className="form-group">
                  <label className="col-md-4 control-label"></label>
                  <div className="col-md-8">
                    <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error.email }>Send me my password</button>
                  </div>
                </div>
              </form>
            )
          }
        </div>
        <div className="panel-footer">
          <p className="text-center"><Link to="/signin">Back to Login</Link></p>
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    );
  }
}

ForgotPasswordFormContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email
    }
  };
}

export default connect(mapStateToProps)(ForgotPasswordFormContainer);
