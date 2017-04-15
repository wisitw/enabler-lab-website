import React, {Component, PropTypes} from 'react';

class EditableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.project.projectName,
      isEditing: false,
      formClass: "",
      error: "",
    }
  }

  componentWillMount() {
    // TODO: call action here to load project, check if user can edit or not
    setTimeout(() => {
      this.setState({
        value: ""

      })
    }, 1000);
  }

  render() {
    const willDisplay = this.state.isEditing ? (
      <form className="form-horizontal">
        <div className={ "form-group " + this.state.formClass }>
          <div className="col-sm-8">
            <input type="text" name="projectName" className="form-control" placeholder="Project Name" value={ this.state.value } onChange={ this.handleChange } required={ true }/>
            <span className="help-block">{ this.state.error }</span>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error } >Save</button>
          </div>
        </div>
      </form>
    ) : (
      <h1 className="auto-heading">
        <span className="auto-title left">2011 Mercedes-Benz SLS AMG
        </span>
        <span className="auto-price pull-right">
          $204,990</span>
      </h1>
    );

    return (
      <div onClick={ this.handleClick }>
        { willDisplay }
      </div>
    );
  }
}

EditableHeader.propTypes = {
  projectId: PropTypes.number.isRequired,
  project: PropTypes.object.isRequired,

}

//TODO: get project object from store