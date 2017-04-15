import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const ProjectItem = ({ projectName, author, image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png", url }) => {
  return (
    <div className="highlight-item">
      <Link to={ "project/" + url }>
        <div>
          <img className="img-responsive image" src={ image } alt="img" />
        </div>
        <div className="project-name">{ projectName }</div>
        <div className="author">by { author }</div>
      </Link>
    </div>
  );
}

ProjectItem.propTypes = {
  projectName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string,
  url: PropTypes.string.isRequired
}

export default ProjectItem;