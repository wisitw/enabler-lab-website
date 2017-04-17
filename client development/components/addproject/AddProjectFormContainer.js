import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextFieldGroup from './TextFieldGroup';
import DescriptionContainer from './DescriptionContainer';
import ImagesContainer from './ImagesContainer';
import * as projectActions from '../../actions/projectActions';
import * as initialState from '../../reducers/initialState';

class AddProjectFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: initialState.getNewProject(),
      error: {

      },
      notTyped: true
    };

    this.updateTextField = this.updateTextField.bind(this);
    this.updateTextDescription = this.updateTextDescription.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillMount() {
    this.props.actions.clearProject();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      project: initialState.getNewProject(),
      notTyped: true
    });
  }

  updateTextField(key, value) {
    let newState = Object.assign({}, this.state);
    newState.project[key] = value;
    newState.notTyped = false;
    this.setState(newState);
  }

  handleError(key, error) {
    let newState = Object.assign({}, this.state);
    newState.error[key] = error;
    this.setState(newState);
  }

  updateTextDescription(htmlText) {
    let newState = Object.assign({}, this.state);
    newState.project.projectDescription = htmlText;
    newState.notTyped = false;
    this.setState(newState);
  }

  updateImages(images) {
    let newState = Object.assign({}, this.state);
    newState.project.projectImages = images;
    newState.notTyped = false;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.addProject(this.state.project);
  }

  render() {
    return (
      <div className="inner-box category-content">
        <h2 className="title-2 uppercase"><strong> <i className="icon-docs"></i> Add a new Project</strong></h2>
        <div className="row">
          <div className="col-sm-12">
            <form className="form-horizontal">
              <TextFieldGroup name="projectName" label="ชื่อโปรเจกต์" value={ this.state.project.projectName } isRequired={ true } onUpdate={ this.updateTextField } setError={ this.handleError } />
              <TextFieldGroup name="projectUrl" label="ลิงก์สำหรับโปรเจกต์" value={ this.state.project.projectUrl } isRequired={ true } onUpdate={ this.updateTextField } isUrl={ true } setError={ this.handleError } />
              <DescriptionContainer onUpdate={ this.updateTextDescription } value={ this.state.project.projectDescription } />
              <ImagesContainer onUpdate={ this.updateImages } value={ this.state.project.projectImages } />
              <div className="form-group">
                <label className="col-sm-4 control-label"></label>
                <div className="col-sm-6">
                  <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.notTyped || this.state.error.projectName || this.state.error.projectUrl } >Add Project</button>
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
  project: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectFormContainer);
