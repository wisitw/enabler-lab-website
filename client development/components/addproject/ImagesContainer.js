import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import ImageContainer from './ImageContainer';
import ImagePreview from './ImagePreview';

class ImagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: props.value,
      imageIndexCounter: (Object.keys(props.value).length + 1)
    };

    this.handleClick = this.handleClick.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    let newState = Object.assign({}, this.state);
    newState.images[this.state.imageIndexCounter] = "";
    newState.imageIndexCounter += 1;
    this.setState(newState);
  }

  removeImage(imageIndex) {
    let newState = Object.assign({}, this.state);
    delete newState.images[imageIndex];
    this.setState(newState);
    this.props.onUpdate(this.state.images);
  }

  handleImageUrlChange(imageIndex, imageUrl) {
    let newState = Object.assign({}, this.state);
    newState.images[imageIndex] = imageUrl;
    this.setState(newState);
    this.props.onUpdate(this.state.images);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Project Images</label>
          <div className="col-sm-7">
            {
              Object.keys(this.state.images).map((key, index) => {
                return (
                  <ImageContainer imageIndex={ key } key={ key } imageUrl={ this.state.images[key] } removeHandler={ this.removeImage } updateHandler={ this.handleImageUrlChange } />
                )
              })
            }
            <button className="btn btn-primary" onClick={ this.handleClick } >Add Image</button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <div className="project-image-preview">
              { (Object.keys(this.state.images).length > 0) ? (
              <Slider {...settings}>
                {
                  Object.keys(this.state.images).map((key, index) => {
                    return (
                      <div>
                        <ImagePreview key={ key } imageUrl={ this.state.images[key] } />
                      </div>
                    )
                  })
                }
              </Slider>
              ) : "" }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImagesContainer.propTypes = {
  value: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ImagesContainer;
