import React, { Component, PropTypes } from 'react';

class TextFieldGroup extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUpdate(this.props.name, event.target.value);
  }

  render() {
    return (
      <div className="col-sm-3">
        <input className="form-control keyword" type="text" name={ this.props.name } placeholder={ this.props.placeholder } onChange={ this.handleChange } value={ this.props.value } />
      </div>
    );
  }
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default TextFieldGroup;
