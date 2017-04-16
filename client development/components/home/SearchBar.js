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
                Enabler ปลดพันธนาการในชีวิตคุณ
              </h1>
              <p className="sub animateme fittext3 animated fadeIn">
                รับชมโปรเจกต์ของเราที่จะมอบความสุขให้กับทุกคน
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
