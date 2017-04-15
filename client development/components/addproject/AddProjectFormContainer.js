import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextFieldGroup from './TextFieldGroup';
import DescriptionContainer from './DescriptionContainer';
import ImagesContainer from './ImagesContainer';
import * as projectActions from '../../actions/projectActions'

class AddProjectFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: this.props.project.projectName,
      projectUrl: this.props.project.projectUrl,
      projectDescription: this.props.project.projectDescription,
      projectImages: this.props.project.projectImages
    };

    this.updateTextField = this.updateTextField.bind(this);
    this.updateTextDescription = this.updateTextDescription.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTextField(key, value) {
    this.setState({
      [key]: value
    });
  }

  updateTextDescription(htmlText) {
    this.setState({
      projectDescription: htmlText
    });
  }

  updateImages(images) {
    this.setState({
      projectImages: images
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.addProject(this.state, this.props.user.token);
  }

  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2 uppercase"><strong> <i className="icon-docs"></i> Add a new Project</strong></h2>
        <div className="row">
          <div className="col-sm-12">
            <form className="form-horizontal">
              <TextFieldGroup name="projectName" label="Project Name" value={ this.state.projectName } isRequired={true} onUpdate={ this.updateTextField } />
              <TextFieldGroup name="projectUrl" label="Project URL" isRequired={true} onUpdate={ this.updateTextField }/>
              <DescriptionContainer onUpdate={ this.updateTextDescription } />
              <ImagesContainer onUpdate={ this.updateImages } />
              <div className="form-group">
                <label className="col-sm-4 control-label"></label>
                <div className="col-sm-6">
                  <button className="btn btn-primary" onClick={ this.handleSubmit } >Add Project</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddProjectFormContainer.propTypes = {
  actions: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
    project: state.project
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectFormContainer);
