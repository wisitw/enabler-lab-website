import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditableProjectSection from './EditableProjectSection';
import * as projectActions from '../../actions/projectActions';

class ProjectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testState: ""
    }
  }

  componentWillMount() {
    this.props.actions.fetchProject(this.props.params.projectUrl);
  }

  render() {
    return (
      <div className="main-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12 page-content">
              <EditableProjectSection projectUrl={ this.props.params.projectUrl } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    project: state.project
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
