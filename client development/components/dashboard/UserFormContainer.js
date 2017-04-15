import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditableTextGroup from './EditableTextGroup';
import * as userActions from '../../actions/userActions';

class UserFormContainer extends Component {
  constructor(porps, context) {
    super(porps, context);
    this.state = {
      user: this.props.user
    };
  }

  componentWillMount() {
    this.props.actions.fetchCurrentUser();
  }

  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2"><i className="icon-user"></i> Edit your account </h2>
        <div className="row">
          <div className="col-sm-12">
            <EditableTextGroup name="firstName" label="First Name" isRequired={ true } />
            <EditableTextGroup name="lastName" label="Last Name" isRequired={ true } />

            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">Email</label>
                <div className="col-sm-6">
                  <label className="control-label editable-text">{ this.props.user.email }</label>
                </div>
              </div>
            </form>

            <EditableTextGroup name="password" label="Password" types="password" isRequired={ true } isPassword={ true } />
          </div>
        </div>
      </div>
    );
  }
}

UserFormContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserFormContainer);
