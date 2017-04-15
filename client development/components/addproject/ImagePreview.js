import React, { PropTypes } from 'react';

const ImagePreview = ({ imageUrl }) => {
  return (
    <div>
      <img className="img-responsive image" src={ imageUrl } alt="image" />
    </div>
  )
}

ImagePreview.propTypes = {
  imageUrl: PropTypes.string.isRequired
}

export default ImagePreview;
