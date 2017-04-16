import React, { Component, PropTypes } from 'react';
import TextFieldGroup from './TextFieldGroup';

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);

    this.updateTextField = this.updateTextField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      projectName: nextProps.projectName,
      ownerFirstName: nextProps.ownerFirstName,
      ownerLastName: nextProps.ownerLastName
    });
  }

  updateTextField(key, value) {
    this.props.onChange(key, value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <div
          className="search-row-wrapper"
          style={{
          backgroundImage: 'url(images/jobs/ibg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}>
          <div className="container text-center">
            <TextFieldGroup name="projectName" placeholder="Project Name" value={ this.props.projectName } onUpdate={ this.updateTextField } />
            <TextFieldGroup name="ownerFirstName" placeholder="Owner First Name" value={ this.props.ownerFirstName } onUpdate={ this.updateTextField } />
            <TextFieldGroup name="ownerLastName" placeholder="Owner Last Name" value={ this.props.ownerLastName } onUpdate={ this.updateTextField } />
            <div className="col-sm-3">
              <button className="btn btn-block btn-primary" onClick={ this.handleSubmit } >
                Search <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
    );
  }
}

SearchBarContainer.propTypes = {
  projectName: PropTypes.string.isRequired,
  ownerFirstName: PropTypes.string.isRequired,
  ownerLastName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SearchBarContainer;
