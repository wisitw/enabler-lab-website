import React, { Component } from 'react';

const styles = {
  backgroundImage: 'url(images/bg3.jpg)'
};

class SearchBar extends Component {
  render() {
    return (
      <div className="intro" style={ styles }>
        <div className="dtable hw100">
          <div className="dtable-cell hw100">
            <div className="container text-center">
              <h1 className="intro-title animated fadeInDown"> Find Enabler's Project </h1>
              <p className="sub animateme fittext3 animated fadeIn"> Find Enabler's Project on EnablerLab in Minutes </p>
              <div className="row search-row animated fadeInUp">
                <div className="col-lg-8 col-sm-8 search-col relative"><i className="icon-docs icon-append"></i>
                  <input type="text" name="ads" className="form-control has-icon" placeholder="I'm looking for a ..." value="" />
                </div>
                <div className="col-lg-4 col-sm-4 search-col">
                <button className="btn btn-primary btn-search btn-block">
                  <i className="icon-search"></i><strong>Find</strong>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default SearchBar;
