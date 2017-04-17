import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class EditableTextGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.user[this.props.name],
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEditing: false,
      value: nextProps.user[this.props.name]
    });
  }

  handleClick() {
    this.setState({
      isEditing: true
    });
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

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      isEditing: false
    });
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
    this.props.actions.updateUser(this.props.name, this.state.value);
  }

  render() {
    const {
      types = "text",
      isRequired = false,
      isPassword = false
    } = this.props;

    const willDisplay = this.state.isEditing ? (
      <div>
        <div className="col-sm-4">
          <input type={ types } name={ this.props.name } className="form-control" placeholder={ this.props.label } value={ this.state.value } onChange={ this.handleChange } onBlur={ this.handleBlur } required={ isRequired }/>
          <span className="help-block">{ this.state.error }</span>
        </div>
        <div className="col-sm-4">
          <div className="btn-toolbar">
              <button className="btn btn-primary" onClick={ this.handleSubmit } disabled={ this.state.error } >บันทึก</button>
              <button className="btn btn-danger" onClick={ this.handleCancel } >ยกเลิก</button>
            </div>
        </div>
      </div>
    ) : (
      <div className="col-sm-6" onClick={ this.handleClick }>
        <label className="control-label editable-text">{ isPassword ? "***" : this.state.value } </label>
      </div>
    );

    return (
      <form className="form-horizontal">
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
  isRequired: PropTypes.bool,
  isPassword: PropTypes.bool
}

function mapStateToProps(state) {
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
