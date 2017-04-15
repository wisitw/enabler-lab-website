import React, { Component, PropTypes } from 'react';
import EditableProjectSection from './EditableProjectSection';

class ProjectPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testState: ""
    }
  }

  componentWillMount() {
    // TODO: call action here to load project, check if user can edit or not
    setTimeout(() => {
      this.setState({
        testState: "aaa"
      })
    }, 1000);
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
  params: PropTypes.object.isRequired
}

export default ProjectPage;
