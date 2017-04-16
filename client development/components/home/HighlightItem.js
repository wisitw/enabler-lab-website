import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class HighlightItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={ "/project/" + this.props.result.url }>
        <div className="highlight-item">
          <div>
            <img className="img-responsive image" src={ this.props.result.projectImage ? this.props.result.projectImage : "images/no_image_available.svg.png" } alt="img" />
          </div>
          <div className="project-name">{ this.props.result.projectName }</div>
          <div className="author">โดย { + this.props.result.projectOwner.firstName + " " + this.props.result.projectOwner.lastName }</div>
        </div>
      </Link>
      );
  }
}

HighlightItem.propTypes = {
  result: PropTypes.object.isRequired
};

export default HighlightItem;

