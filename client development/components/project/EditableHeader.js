import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../actions/projectActions';

class EditableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.project.projectName,
      hasEditPermission: this.props.project.hasEditPermission,
      isEditing: false,
      formClass: "",
      error: "",
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmptyValue = this.handleEmptyValue.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.project.projectName,
      hasEditPermission: nextProps.project.hasEditPermission,
      isEditing: false
    });
  }

  handleClick(event) {
    if (this.state.hasEditPermission) {
      this.setState({
        isEditing: true
      });
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleBlur(event) {
    if (event.target.value == "") {
      this.handleEmptyValue();
    }
  }

  handleEmptyValue() {
    const {
      isRequired = false
    } = this.props;

    if (isRequired) {
      this.setState({
        error: "required",
        formClass: "has-error"
      })
    } else {
      this.setState({
        error: "",
        formClass: "has-success"
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.updateProject(this.props.project.id, "projectName", this.state.value, this.props.projectUrl);
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      isEditing: false
    });
  }

  handleDelete(event) {
    event.preventDefault();
    if (window.confirm("Are you sure?")) {
      this.props.actions.deleteProject(this.props.project.id);
    }
  }

  render() {
    const willDisplay = this.state.isEditing ? (
      <form className="form-horizontal">
        <div className={ "form-group " + this.state.formClass }>
          <div className="col-sm-10">
            <input type="text" name="projectName" className="form-control" placeholder="Project Name" value={ this.state.value } onChange={ this.handleChange } onBlur={ this.handleBlur } required={ true }/>
            <span className="help-block">{ this.state.error }</span>
          </div>
          <div className="col-sm-2">
            <div className="btn-toolbar">
              <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error } >Save</button>
              <button className="btn btn-danger" onClick={ this.handleCancel } >Cancel</button>
            </div>
          </div>
        </div>
      </form>
    ) : (
      <h1 className="auto-heading">
        <span className="auto-title left" onClick={ this.handleClick }>{ this.state.value }</span>
        {
          (this.state.hasEditPermission) ? (
            <span className="auto-price pull-right" onClick={ this.handleDelete }>Delete Project</span>
          ) : ""
        }
      </h1>
    );

    return (
      <div>
        { willDisplay }
      </div>
    );
  }
}

EditableHeader.propTypes = {
  actions: PropTypes.object.isRequired,
  projectUrl: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableHeader);
