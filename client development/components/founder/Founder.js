import React, { PropTypes } from 'react'

const Founder = ({ name="Steve Jobs", descriptions=["A sample description."], image="images/no_image_available.svg.png", left=false }) => {
  return (
    <div className="col-sm-4">
      <h1 className="text-center title-1"> { name } </h1>
      <hr className="center-block small text-hr" />
      {
        left ? (
          <div>
            <div className="col-sm-6">
              <img src={ image } alt="imfo" className="img-responsive" />
            </div>
            <div className="col-sm-6">
              <div className="text-content has-lead-para text-left">
                {
                  descriptions.map((value, index) => {
                    return (
                      <p className="lead" key={ index }>
                        { value }
                      </p>
                    );
                  })
                }
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="col-sm-6">
              <div className="text-content has-lead-para text-left">
                {
                  descriptions.map((value, index) => {
                    return (
                      <p className="lead" key={ index }>
                        { value }
                      </p>
                    );
                  })
                }
              </div>
            </div>
            <div className="col-sm-6">
              <img src={ image } alt="imfo" className="img-responsive" />
            </div>
          </div>
        )
      }
      
    </div>
  );
};

Founder.propTypes = {
  name: PropTypes.string,
  descriptions: PropTypes.array,
  image: PropTypes.string,
  left: PropTypes.bool
}

export default Founder;
