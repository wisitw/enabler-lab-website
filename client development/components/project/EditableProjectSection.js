import React, {Component, PropTypes} from 'react';
import EditableHeader from './EditableHeader';
import EditableImagesContainer from './EditableImagesContainer';
import EditableDescription from './EditableDescription';

class EditableProjectSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    return (
      <div className="inner inner-box ads-details-wrapper">
        <EditableHeader projectId={this.props.projectId}/>
        <div style={{
          clear: 'both'
        }}></div>
        <span className="info-row">
          by Kiki S.
        </span>

        <div className="row">
          <div className="col-md-12">
            <EditableImagesContainer projectId={this.props.projectId}/>
          </div>
        </div>

        <div className="Ads-Details">
          <div className="row">
            <div className="ads-details-info col-md-12" style={{paddingBottom: '16px'}} >
              <EditableDescription projectId={this.props.projectId}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditableProjectSection.propTypes = {
  projectId: PropTypes.number.isRequired
};

export default EditableProjectSection;
