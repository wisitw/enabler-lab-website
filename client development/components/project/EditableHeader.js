import React, {Component, PropTypes} from 'react';

class EditableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // value: this.props.project.projectName,
      isEditing: false,
      formClass: "",
      error: "",
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEditing: false
    });
  }

  componentWillMount() {
    // TODO: call action here to load project, check if user can edit or not
    setTimeout(() => {
      this.setState({
        value: "Project Title"
      })
    }, 1000);
  }

  handleClick(event) {
    //if (this.props.hasPermission) {
      this.setState({
        isEditing: true
      });
    //}
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const willDisplay = this.state.isEditing ? (
      <form className="form-horizontal">
        <div className={ "form-group " + this.state.formClass }>
          <div className="col-sm-10">
            <input type="text" name="projectName" className="form-control" placeholder="Project Name" value={ this.state.value } onChange={ this.handleChange } required={ true }/>
            <span className="help-block">{ this.state.error }</span>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error } >Save</button>
          </div>
        </div>
      </form>
    ) : (
      <h1 className="auto-heading" onClick={ this.handleClick }>
        <span className="auto-title left">{ this.state.value }</span>
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
  projectUrl: PropTypes.string.isRequired,
  // project: PropTypes.object.isRequired,
  hasPermission: PropTypes.bool.isRequired

}

//TODO: get project object from store

export default EditableHeader;
