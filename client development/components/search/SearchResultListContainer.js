import React, { Component, PropTypes } from 'react';
import SearchResult from './SearchResult';

class SearchResultListContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  }

  render() {
    return (
      <div>
        <div className="adds-wrapper jobs-list">
          {
            Object.keys(this.props.results).map((key, index) => {
              return (
                <div key={ index }>
                  <SearchResult result={ this.props.results[key] } />
                </div>
              )
            })
          }
        </div>
        <div className="tab-box  save-search-bar text-center">
          {
            this.props.hasNext ? (
              <div onClick={ this.handleClick }>
                Load More..
              </div>
            ) : ""
          }
        </div>
      </div>
    )
  }
}

SearchResultListContainer.propTypes = {
  results: PropTypes.object.isRequired,
  hasNext: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SearchResultListContainer;
