import React, { Component, PropTypes } from 'react';

class TextFieldGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: this.props.value,
      formClass: "",
      error: "",
    }

    this.handleChange = this.handleChange.bind(this);
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
      this.setState({
        [this.props.name]: event.target.value,
        error: "required",
        formClass: "has-error"
      });
    } else {
      this.setState({
        [this.props.name]: event.target.value,
        error: "",
        formClass: "has-success"
      });
      this.props.onUpdate(this.props.name, event.target.value);
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
          <input type={ types } name={ this.props.name } className="form-control" placeholder={ this.props.label } value={ this.state[this.props.name] } onChange={ this.handleChange } required={ isRequired }/>
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
  validate: PropTypes.func
}

export default TextFieldGroup;
