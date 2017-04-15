import React, { Component, PropTypes } from 'react';
import * as projectApi from '../../api/projectApi'

class TextFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: this.props.value,
      formClass: "",
      error: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      [this.props.name]: nextProps.value
    });
  }

  handleChange(event) {
    const {
      isRequired = false
    } = this.props;

    if (isRequired && event.target.value == "") {
      let error = "required";
      this.setState({
        [this.props.name]: event.target.value,
        error: error,
        formClass: "has-error"
      });
      this.props.onUpdate(this.props.name, event.target.value, error);
    } else {
      this.setState({
        [this.props.name]: event.target.value,
        error: "",
        formClass: "has-success"
      });
      this.props.onUpdate(this.props.name, event.target.value);
    }
  }

  handleBlur(event) {
    if (this.props.isUrl) {
      projectApi.isUrlAvailable(event.target.value).then(response => {
        if (response.available) {
          this.setState({
            error: "",
            formClass: "has-success"
          });
        } else {
          let error = "This url is already in use";
          this.setState({
            error: error,
            formClass: "has-error"
          });
          this.props.onUrlError(this.props.name, error);
        }
      })
    }
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
          <input type={ types } name={ this.props.name } className="form-control" placeholder={ this.props.label } value={ this.state[this.props.name] } onChange={ this.handleChange } onBlur= { this.handleBlur } required={ isRequired }/>
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
  onUrlError: PropTypes.func
}

export default TextFieldGroup;
