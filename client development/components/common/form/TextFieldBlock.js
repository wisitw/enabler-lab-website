import React, { PropTypes } from 'react';

const TextFieldBlock = ({ name, label="", icon="icon-user fa", type="text", onChange, onBlur, value="", error, isRequired=false }) => {
  let formClass = "";
  if (error !== undefined ) {
    if (error == "") formClass = "has-success";
    else formClass = "has-error";
  }
  return (
    <div className={ "form-group " + formClass }>
      <label className="control-label">{ label }</label>
      <div className="input-icon">
        <i className={icon}></i>
        <input type={ type } name={ name } className="form-control" placeholder={ label } value={ value } onChange={ onChange } onBlur={ onBlur } required={ isRequired }/>
        <span className="help-block">{ error }</span>
      </div>
    </div>
  );
}

TextFieldBlock.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool
}

export default TextFieldBlock;
