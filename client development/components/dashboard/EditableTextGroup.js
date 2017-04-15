import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class EditableTextGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: this.props.user[this.props.name],
      isEditing: false,
      formClass: "",
      error: "",
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEditing: false
    });
  }

  handleClick() {
    this.setState({
      isEditing: true
    });
  }

  handleChange(event) {
    const {
      isRequired = false
    } = this.props;

    if (isRequired && event.target.value == "") {
      return this.setState({
        [this.props.name]: event.target.value,
        error: "required",
        formClass: "has-error"
      });
    } else {
      return this.setState({
        [this.props.name]: event.target.value,
        error: "",
        formClass: "has-success"
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.updateUser(this.props.name, this.state[this.props.name], this.props.user.token);
  }

  render() {
    const {
      types = "text",
      isRequired = false
    } = this.props;

    const willDisplay = this.state.isEditing ? (
      <div>
        <div className="col-sm-6">
          <input type={ types } name={ this.props.name } className="form-control" placeholder={ this.props.label } value={ this.state[this.props.name] } onChange={ this.handleChange } required={ isRequired }/>
          <span className="help-block">{ this.state.error }</span>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error } >Save</button>
        </div>
      </div>
    ) : (
      <div className="col-sm-6">
        <label className="control-label editable-text">{ this.state[this.props.name] }</label>
      </div>
    );

    return (
      <form className="form-horizontal" onClick={ this.handleClick }>
        <div className={ "form-group " + this.state.formClass }>
          <label className="col-sm-4 control-label">{ this.props.label }</label>
          { willDisplay }
        </div>
      </form>
    );
  }
}

EditableTextGroup.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  types: PropTypes.string,
  isRequired: PropTypes.bool
}

function mapStateToProps(state, props) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableTextGroup);
