import React, { Component, PropTypes } from 'react';
import * as MessageSource from '../../resources/MessageSource';
import * as projectApi from '../../api/projectApi';

class TextFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      formClass: "",
      error: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleEmptyValue = this.handleEmptyValue.bind(this);
    this.handleUrlValue = this.handleUrlValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  handleChange(event) {
    this.props.onUpdate(this.props.name, event.target.value);
  }

  handleBlur(event) {
    if (event.target.value == "") {
      this.handleEmptyValue();
    } else {
      if (this.props.isUrl) {
        this.handleUrlValue(event.target.value);
      } else {
        this.props.setError(this.props.name, false);
        this.setState({
          error: "",
          formClass: "has-success"
        });
      }
    }
  }
  
  handleEmptyValue() {
    const {
      isRequired = false
    } = this.props;

    if (isRequired) {
      this.props.setError(this.props.name, true);
      this.setState({
        error: "required",
        formClass: "has-error"
      })
    } else {
      this.props.setError(this.props.name, false);
      this.setState({
        error: "",
        formClass: "has-success"
      });
    }
  }

  handleUrlValue(url) {
    projectApi.isUrlAvailable(url).then(response => {
      if (response.available) {
        this.props.setError(this.props.name, false);
        this.setState({
          error: "",
          formClass: "has-success"
        });
      } else {
        this.props.setError(this.props.name, true);
        this.setState({
          error: MessageSource.getNotAvailableError("ลิงก์"),
          formClass: "has-error"
        });
      }
    });
  }

  render() {
    const {
      types = "text",
      isRequired = false
    } = this.props;

    return (
      <div className={ "form-group " + this.state.formClass }>
        <label className="col-sm-4 control-label">{ this.props.label }</label>
        <div className="col-sm-6">
          <input type={ types } name={ this.props.name } className="form-control" placeholder={ this.props.label } value={ this.statevalue } onChange={ this.handleChange } onBlur= { this.handleBlur } required={ isRequired }/>
          <span className="help-block">{ this.state.error }</span>
        </div>
      </div>
    );
  }
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  types: PropTypes.string,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  isUrl: PropTypes.bool,
  setError: PropTypes.func
}

export default TextFieldGroup;
