import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserFormContainer from './UserFormContainer';
import UserProject from './UserProject'

class DashBoardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-8 page-content">
              <UserFormContainer />
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

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(DashBoardPage);
