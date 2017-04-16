import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-slick'
import HighlightItem from './HighlightItem'
import * as projectActions from '../../actions/projectActions';

class HighLight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: {

      }
    }
  }

  componentWillMount() {
    this.props.actions.fetchHighlight(0, 12);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      highlights: nextProps.highlights
    });
  }

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
                  <h2>โปรเจกต์ <span>ที่กำลังได้รับความนิยม </span></h2>
                </div>
              </div>
              <div style={{clear: 'both'}}>
              </div>
              <div className="relative content featured-list-row clearfix">
                { 
                  Object.keys(this.props.highlights).length > 0 ? (
                    <Slider {...settings}>
                      {
                        Object.keys(this.props.highlights).map((key, index) => {
                          return (
                            <div key={ index }>
                              <HighlightItem result={ this.props.highlights[key] } />
                            </div>
                          )
                        })
                      }
                    </Slider>
                  ) : ""
                }    
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

HighLight.propTypes = {
  actions: PropTypes.object.isRequired,
  highlights: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    highlights: state.advanceSearch.result
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HighLight);
