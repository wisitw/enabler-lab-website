import React, {Component, PropTypes} from 'react';
import SearchBar from './SearchBar';
import Highlight from './Highlight';

class HomePage extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <Highlight/>
      </div>
    );
  }
}

export default HomePage;
