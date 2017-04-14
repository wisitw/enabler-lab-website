import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import EditableTextGroup from './EditableTextGroup';

class UserForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2"><i className="icon-user"></i> Edit your account </h2>
        <div className="row">
          <div className="col-sm-12">
            <EditableTextGroup name="firstName" label="First Name" isRequired={true} />
            <EditableTextGroup name="lastName" label="Last Name" isRequired={true} />

            <form className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">Email</label>
                <div className="col-sm-6">
                  <label className="control-label editable-text">{ this.props.user.email }</label>
                </div>
              </div>
            </form>

            <EditableTextGroup name="password" label="Password" type="password" isRequired={true} />
          </div>
        </div>
      </div>
    );
  }
}

UserForm.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserForm);
