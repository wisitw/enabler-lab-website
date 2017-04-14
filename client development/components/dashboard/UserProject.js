import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProjectItem from './ProjectItem';
import Slider from 'react-slick';

class UserProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="inner-box category-content">
        <h2 className="title-2"><i className="icon-docs"></i> Your Project </h2>
        <div className="row">
          <div className="col-sm-12">
            <div className="side-padding-36">
              <Slider {...settings}>
                <div>
                  <ProjectItem key="1" projectName="Test1" author="Kiki" />
                </div>
                <div>
                  <ProjectItem key="2" projectName="Test2" author="Kiki" />
                </div>
                <div>
                  <ProjectItem key="3" projectName="Test3" author="Kiki" />
                </div>
                <div>
                  <ProjectItem key="4" projectName="Test4" author="Kiki" />
                </div>
                <div>
                  <ProjectItem key="5" projectName="Test5" author="Kiki" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProject.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserProject);
