import React, { PropTypes } from 'react';

const ProjectItem = ({projectName, author, image = "/images/auto/2012-mercedes-benz-sls-amg.jpg"}) => {
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

ProjectItem.propTypes = {
  projectName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string
}

export default ProjectItem;