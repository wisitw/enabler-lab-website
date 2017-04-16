import React, { Component, PropTypes } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <div>
        { 
          (this.props.location.pathname == '404' || this.props.location.pathname == '405' || this.props.location.pathname == '500') ? (
            <div>
              { this.props.children }
            </div>
          ) : (
            <div>
              <Header />
              { this.props.children }
              <Footer />
            </div>
          )
        }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default App;
