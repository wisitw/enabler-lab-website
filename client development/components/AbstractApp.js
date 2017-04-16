import React, { Component, PropTypes } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class AbstractApp extends Component {
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

AbstractApp.propTypes = {
  children: PropTypes.object.isRequired
};

export default AbstractApp;
