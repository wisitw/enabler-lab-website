import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditableHeader from './EditableHeader';
import EditableImagesContainer from './EditableImagesContainer';
import EditableDescription from './EditableDescription';
import * as projectActions from '../../actions/projectActions';

class EditableProjectSection extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.actions.fetchNewAdvanceSearchResult("", this.props.project.projectOwner.firstName, this.props.project.projectOwner.lastName, "VIEW", "DSC", 0, 12);
  }

  render() {
    return (
      <div className="inner inner-box ads-details-wrapper">
        <EditableHeader projectUrl={this.props.projectUrl}/>
        <div style={{
          clear: 'both'
        }}></div>
        <span className="info-row" onClick={ this.handleClick }>
          { "by " + this.props.project.projectOwner.firstName + " " + this.props.project.projectOwner.lastName }
          <span className="pull-right">
            { (parseInt(this.props.project.view) + 1) + " การเข้าชม" }
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
  actions: PropTypes.object.isRequired,
  projectUrl: PropTypes.number.isRequired,
  project: PropTypes.object.isRequired
};

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


export default connect(mapStateToProps, mapDispatchToProps)(EditableProjectSection);
