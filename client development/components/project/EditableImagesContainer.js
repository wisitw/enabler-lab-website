import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import ImageContainer from './ImageContainer';
import ImagePreview from '../addproject/ImagePreview';

class EditableImagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //images: props.value,
      images: {

      },
      //imageIndexCounter: (Object.keys(props.value).length + 1),
      imageIndexCounter: 3,
      isEditing: false,
      formClass: "",
      error: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isEditing: false
    });
  }

  componentWillMount() {
    // TODO: call action here to load project, check if user can edit or not
    setTimeout(() => {
      this.setState({
        images: {
          1: "https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
          2: "https://vignette2.wikia.nocookie.net/starwars/images/d/df/Masterobiwan.jpg/revision/latest/scale-to-width-down/220?cb=20080719000305"
        }
      })
    }, 1000);
  }

  handleClick(event) {
    //if (this.props.hasPermission) {
      this.setState({
        isEditing: true
      });
    //}
  }

  handleAddClick(event) {
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
  }

  handleImageUrlChange(imageIndex, imageUrl) {
    let newState = Object.assign({}, this.state);
    newState.images[imageIndex] = imageUrl;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({
      isEditing: false
    });
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

    const willDisplay = this.state.isEditing ? (
      <div>
        <form className="form-horizontal">
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
              <div className="btn-toolbar">
                <button className="btn btn-primary" onClick={ this.handleAddClick } >Add Image</button>
                <button className="btn btn-primary" onClick={ this.handleSubmit } >Save</button>
                <button className="btn btn-danger" onClick={ this.handleCancel } >Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    ) : "";

    return (
      <div>
        <div className="row">
          <div className="project-image-preview" onClick={ this.handleClick }>
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
            ) : "no image.." }
          </div>
        </div>
        <div class="row">
          { willDisplay }
        </div>
      </div>
    );
  }
}

EditableImagesContainer.propTypes = {
  projectUrl: PropTypes.string.isRequired,
  // project: PropTypes.object.isRequired,
  hasPermission: PropTypes.bool.isRequired
}

export default EditableImagesContainer;
