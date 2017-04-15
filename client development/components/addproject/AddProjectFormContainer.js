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
      project: this.props.project,
      error: {

      }
    };

    this.updateTextField = this.updateTextField.bind(this);
    this.updateTextDescription = this.updateTextDescription.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUrlError = this.handleUrlError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.project
    });
  }

  updateTextField(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleUrlError(key, error) {
    let newState = Object.assign({}, this.state);
    newState.error[key] = error;
    this.setState({
      newState
    });
  }

  updateTextDescription(htmlText) {
    let newState = Object.assign({}, this.state);
    newState.project.projectDescription = htmlText;
    this.setState({
      newState
    });
  }

  updateImages(images) {
    let newState = Object.assign({}, this.state);
    newState.project.projectImages = images;
    this.setState({
      newState
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.addProject(this.state.project, this.props.user.token);
  }

  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2 uppercase"><strong> <i className="icon-docs"></i> Add a new Project</strong></h2>
        <div className="row">
          <div className="col-sm-12">
            <form className="form-horizontal">
              <TextFieldGroup name="projectName" label="Project Name" value={ this.state.project.projectName } isRequired={ true } onUpdate={ this.updateTextField } setError={ this.handleUrlError }  />
              <TextFieldGroup name="projectUrl" label="Project URL" value={ this.state.project.projectUrl } isRequired={ true } onUpdate={ this.updateTextField } isUrl={ true } setError={ this.handleUrlError } />
              <DescriptionContainer onUpdate={ this.updateTextDescription } value={ this.state.project.projectDescription } />
              <ImagesContainer onUpdate={ this.updateImages } value={ this.state.project.projectImages } />
              <div className="form-group">
                <label className="col-sm-4 control-label"></label>
                <div className="col-sm-6">
                  <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error.projectName || this.state.error.projectUrl } >Add Project</button>
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

function mapStateToProps(state) {
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
