import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import QueryContainer from './QueryContainer';
import SearchResultListContainer from './SearchResultListContainer';

class SearchResultSectionContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClearOne = this
      .handleClearOne
      .bind(this);
    this.handleClearAll = this
      .handleClearAll
      .bind(this);
    this.handleLoadMore = this
      .handleLoadMore
      .bind(this);
  }

  handleClearOne(value) {
    this
      .props
      .onClearOne(value);
  }

  handleClearAll() {
    this
      .props
      .onClearAll();
  }

  handleLoadMore() {
    this
      .props
      .onLoadMore();
  }

  render() {
    return (
      <div className="col-sm-9 page-content col-thin-left">
        <div className="category-list">
          <div className="tab-box clearfix ">
            <div className="col-lg-12  box-title no-border">
              <div className="inner">
                <h2>
                  ผลการค้นหา 
                  <small> จาก Enabler Lab</small>
                </h2>
              </div>
            </div>
          </div>

          <QueryContainer
            onClearOne={this.handleClearOne}
            onClearAll={this.handleClearAll}/>

          <SearchResultListContainer
            results={this.props.advanceSearch.result}
            hasNext={this.props.advanceSearch.hasNext}
            onClick={this.handleLoadMore}/>

        </div>
        <div className="post-promo text-center">
          <h2>
            ไม่เจอโปรเจกต์ที่คุณต้องการ?
          </h2>
          <h5>
            คุณสามารถเพิ่มโปรเจกต์ใหม่ได้นะ!
          </h5>
          <Link to="/project/add" className="btn btn-lg btn-border btn-post btn-danger">
            เพิ่มโปรเจกต์ใหม่!
          </Link>
        </div>
      </div>
    );
  }
}

SearchResultSectionContainer.propTypes = {
  advanceSearch: PropTypes.object.isRequired,
  onClearOne: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired
}

export default SearchResultSectionContainer;
