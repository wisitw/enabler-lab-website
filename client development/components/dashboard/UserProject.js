import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectItem from './ProjectItem';
import Slider from 'react-slick';
import * as projectActions from '../../actions/projectActions';

class UserProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: this.props.projects.projects
    }
  }

  componentWillMount() {
    this.props.actions.getMyProjects();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      projects: nextProps.projects.projects
    });
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
        <h2 className="title-2"><i className="icon-docs"></i> โปรเจกต์ของคุณ </h2>
        <div className="row">
          <div className="col-sm-12">
            <div className="side-padding-36">
              {
                (Object.keys(this.state.projects).length > 0) ? (
                  <Slider {...settings}>
                    {
                      Object.keys(this.state.projects).map((key, index) => {
                        return (
                            <div>
                              {
                                (Object.keys(this.state.projects[key].projectImages).length > 0) ? (
                                  <ProjectItem key={ key } projectName={ this.state.projects[key].projectName } author={ this.state.projects[key].projectOwner.firstName + " " + this.state.projects[key].projectOwner.lastName } image={ this.state.projects[key].projectImages[Object.keys(this.state.projects[key].projectImages)[0]] } url={ this.state.projects[key].projectUrl } />
                                ) : (
                                  <ProjectItem key={ key } projectName={ this.state.projects[key].projectName } author={ this.state.projects[key].projectOwner.firstName + " " + this.state.projects[key].projectOwner.lastName } url={ this.state.projects[key].projectUrl } />
                                )
                              }
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
    );
  }
}

UserProject.propTypes = {
  actions: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProject);
