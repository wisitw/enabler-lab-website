import React, { Component, PropTypes } from 'react';

class ImageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {

      imageIndex: this.props.imageIndex,
      imageUrl: this.props.imageUrl,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      imageUrl: event.target.value
    });
    this.props.updateHandler(this.state.imageIndex, event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.removeHandler(this.state.imageIndex);
  }

  render() {
    return (
      <div className="form-group">
        <div className="col-sm-10">
          <input type="url" name="imageUrl" className="form-control" placeholder="ลิงก์รูป" value={ this.state.imageUrl } onChange={ this.handleChange } required={ true }/>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-danger" onClick={ this.handleSubmit } disabled={ this.state.error } >ลบรูป</button>
        </div>
      </div>
    );
  }
}

ImageContainer.propTypes = {
  imageIndex: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  removeHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired
}

export default ImageContainer;
