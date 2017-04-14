import React, { Component, PropTypes } from 'react'

class HighlightItem extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      image = '/images/auto/2012-mercedes-benz-sls-amg.jpg',
      projectName = 'Project',
      author = 'Unknown'
    } = this.props;

    return (
      <div className="highlight-item">
        <div>
          <img className="img-responsive image" src={ image } alt="img" />
        </div>
        <div className="project-name">{ projectName }</div>
        <div className="author">by { author }</div>
      </div>
      );
  }
}

HighlightItem.propTypes = {
  image: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
};

export default HighlightItem;
