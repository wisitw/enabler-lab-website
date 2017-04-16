import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import ImageContainer from './ImageContainer';
import ImagePreview from '../addproject/ImagePreview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../../actions/projectActions';

class EditableImagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.project.projectImages,
      imageIndexCounter: (Object.keys(this.props.project.projectImages).length + 1),
      hasEditPermission: this.props.project.hasEditPermission,
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
      images: nextProps.project.projectImages,
      imageIndexCounter: (Object.keys(nextProps.project.projectImages).length + 1),
      hasEditPermission: nextProps.project.hasEditPermission,
      isEditing: false
    });
  }

  handleClick(event) {
    if (this.state.hasEditPermission) {
      this.setState({
        isEditing: true
      });
    }
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
    this.props.actions.updateProject(this.props.project.id, "projectImages", this.state.images, this.props.projectUrl);
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
            <label className="col-sm-4 control-label">รูปประกอบโปรเจกต์</label>
            <div className="col-sm-7">
              {
                Object.keys(this.state.images).map((key, index) => {
                  return (
                    <ImageContainer imageIndex={ key } key={ key } imageUrl={ this.state.images[key] } removeHandler={ this.removeImage } updateHandler={ this.handleImageUrlChange } />
                  )
                })
              }
              <div className="btn-toolbar">
                <button className="btn btn-primary" onClick={ this.handleAddClick } >เพิ่มรูป</button>
                <button className="btn btn-primary" onClick={ this.handleSubmit } >บันทึก</button>
                <button className="btn btn-danger" onClick={ this.handleCancel } >ยกเลิก</button>
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
        <div className="row">
          { willDisplay }
        </div>
      </div>
    );
  }
}

EditableImagesContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  projectUrl: PropTypes.string.isRequired,
  project: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableImagesContainer);
