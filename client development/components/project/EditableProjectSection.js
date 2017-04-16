import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import EditableHeader from './EditableHeader';
import EditableImagesContainer from './EditableImagesContainer';
import EditableDescription from './EditableDescription';

class EditableProjectSection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="inner inner-box ads-details-wrapper">
        <EditableHeader projectUrl={this.props.projectUrl}/>
        <div style={{
          clear: 'both'
        }}></div>
        <span className="info-row">
          { "by " + this.props.project.projectOwner.firstName + " " + this.props.project.projectOwner.lastName }
          <span className="pull-right">
            { (parseInt(this.props.project.view) + 1) + " views" }
          </span>
        </span>

        <div className="row">
          <div className="col-md-12">
            <EditableImagesContainer projectUrl={this.props.projectUrl}/>
          </div>
        </div>
        <h5 className="list-title"><strong></strong></h5>

        <div className="Ads-Details">
          <div className="row">
            <div className="ads-details-info col-md-12" style={{paddingBottom: '16px'}} >
              <EditableDescription projectUrl={this.props.projectUrl}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditableProjectSection.propTypes = {
  projectUrl: PropTypes.number.isRequired,
  project: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    project: state.project
  }
}

export default connect(mapStateToProps)(EditableProjectSection);
