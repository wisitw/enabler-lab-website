import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="item-list job-item">
        <div className="col-sm-1 col-xs-2 no-padding photobox">
          <div className="add-image">
            <img
              className="thumbnail no-margin"
              src={ this.props.result.projectImage ? this.props.result.projectImage : "images/no_image_available.svg.png" }
              alt="project image"/>
          </div>
        </div>

        <div className="col-sm-10  col-xs-10  add-desc-box">
          <div className="add-details jobs-item">
            <h4 className="job-title">
                { this.props.result.projectName }
            </h4>
            <span className="info-row">
              <span className="item-location">
                { "by " + this.props.result.projectOwner.firstName + this.props.result.projectOwner.lastName }
              </span>
              <span className="salary pull-right">
                { this.props.result.view + " views" }
              </span>
            </span>
            <div className="jobs-desc">
              
            </div>
            <div className="job-actions">
              <Link to={ "/project/" + this.props.result.url }>
                <div className="save-job">
                  See More
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SearchResult.propTypes = {
  result: PropTypes.object.isRequired
}

export default SearchResult;
