import React, {Component} from 'react';
import SearchBarContainer from './SearchBarContainer';

const styles = {
  backgroundImage: 'url(images/bg3.jpg)'
};

class SearchBar extends Component {
  render() {
    return (
      <div className="intro" style={styles}>
        <div className="dtable hw100">
          <div className="dtable-cell hw100">
            <div className="container text-center">
              <h1 className="intro-title animated fadeInDown">
                Visit Enabler's Project
              </h1>
              <p className="sub animateme fittext3 animated fadeIn">
                Visit Enabler's Project on EnablerLab in Minutes
              </p>
              <SearchBarContainer/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
