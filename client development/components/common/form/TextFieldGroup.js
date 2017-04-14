import React, { PropTypes } from 'react';

const TextFieldGroup = ({ name, label="", type="text", onChange, onBlur, value="", error, isRequired=false }) => {
  let formClass = "";
  if (error !== undefined ) {
    if (error == "") formClass = "has-success";
    else formClass = "has-error";
  }
  return (
    <div className={ "form-group " + formClass }>
      <label className="col-md-4 control-label">{ label }</label>
      <div className="col-md-6">
        <input type={ type } name={ name } className="form-control" placeholder={ label } value={ value } onChange={ onChange } onBlur={ onBlur } required={ isRequired }/>
        <span className="help-block">{ error }</span>
      </div>
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool
}

export default TextFieldGroup;
