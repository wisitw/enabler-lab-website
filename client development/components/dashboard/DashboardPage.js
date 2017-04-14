import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import UserForm from './UserForm';
import UserProject from './UserProject'

class DashBoardPage extends Component {
  componentWillMount() {
    if (!this.props.user.isSignedIn) {
      browserHistory.push('/signin');
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-8 page-content">
              <UserForm />
            </div>
            <div className="col-md-4 page-content">
              <UserProject />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashBoardPage.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DashBoardPage);
