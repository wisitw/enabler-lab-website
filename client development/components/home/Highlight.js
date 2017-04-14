import React, { Component, Proptypes } from 'react';
import Slider from 'react-slick'
import HighlightItem from './HighlightItem'

class HighLight extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 5,
      slidesToScroll: 1,
    };

    return (
      <div className="main-container">
        <div className="container">
          <div className="col-lg-12 content-box hightlight-box">
            <div className="row row-featured">
              <div className="col-lg-12  box-title ">
                <div className="inner">
                  <h2><span>Highlight </span>Projects</h2>
                </div>
              </div>
              <div style={{clear: 'both'}}>
              </div>
              <div className="relative content featured-list-row clearfix">
                <Slider {...settings}>
                  <div>
                    <HighlightItem key="1" projectName="Test1" author="Kiki" />
                  </div>
                  <div>
                    <HighlightItem key="2" projectName="Test2" author="Kiki" />
                  </div>
                  <div>
                    <HighlightItem key="3" projectName="Test3" author="Kiki" />
                  </div>
                  <div>
                    <HighlightItem key="4" projectName="Test4" author="Kiki" />
                  </div>
                  <div>
                    <HighlightItem key="5" projectName="Test5" author="Kiki" />
                  </div>
                  <div>
                    <HighlightItem key="6" projectName="Test6" author="Kiki" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default HighLight;
