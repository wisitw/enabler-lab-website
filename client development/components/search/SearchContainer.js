import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBarContainer from './SearchBarContainer';
import SidebarContainer from './SidebarContainer';
import SearchResultSectionContainer from './SearchResultSectionContainer';
import * as projectActions from '../../actions/projectActions';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advanceSearch: this.props.advanceSearch
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);

    this.handleClearOne = this.handleClearOne.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      advanceSearch: nextProps.advanceSearch
    });
  }

  handleTextChange(key, value) {
    let newState = Object.assign({}, this.state);
    newState.advanceSearch[key] = value;
    this.setState(newState);
  }

  handleOrderChange(order, orderBy) {
    let newState = Object.assign({}, this.state);
    newState.advanceSearch.order = order;
    newState.advanceSearch.orderBy = orderBy;
    this.setState(newState);

    this.props.actions.fetchNewAdvanceSearchResult(this.state.advanceSearch.projectName, this.state.advanceSearch.ownerFirstName, this.state.advanceSearch.ownerLastName, order, orderBy, 0, 12);
  }

  handleSubmit() {
    this.props.actions.fetchNewAdvanceSearchResult(this.state.advanceSearch.projectName, this.state.advanceSearch.ownerFirstName, this.state.advanceSearch.ownerLastName, this.state.advanceSearch.order, this.state.advanceSearch.orderBy, 0, 12);
  }

  handleClearOne(key) {
    let newState = Object.assign({}, this.state);
    newState.advanceSearch[key] = "";
    this.setState(newState);

    switch (key) {
      case "projectName":
        this.props.actions.fetchNewAdvanceSearchResult("", this.state.advanceSearch.ownerFirstName, this.state.advanceSearch.ownerLastName, this.state.advanceSearch.order, this.state.advanceSearch.orderBy, 0, 12);
        break;
      case "ownerFirstName":
        this.props.actions.fetchNewAdvanceSearchResult(this.state.advanceSearch.projectName, "", this.state.advanceSearch.ownerLastName, this.state.advanceSearch.order, this.state.advanceSearch.orderBy, 0, 12);
        break;
      case "ownerLastName":
        this.props.actions.fetchNewAdvanceSearchResult(this.state.advanceSearch.projectName, this.state.advanceSearch.ownerFirstName, "", this.state.advanceSearchorder, this.state.advanceSearch.orderBy, 0, 12);
        break;
      default:
        break;
    }
  }

  handleClearAll() {
    let newState = Object.assign({}, this.state);
    newState.advanceSearch.projectName = "";
    newState.advanceSearch.ownerFirstName = "";
    newState.advanceSearch.ownerLastName = "";
    this.setState(newState);

    this.props.actions.fetchNewAdvanceSearchResult("", "", "", this.state.advanceSearch.order, this.state.advanceSearch.orderBy, 0, 12);
  }

  handleLoadMore() {
    this.props.actions.fetchMoreAdvanceSearchResult(this.state.advanceSearch.result, this.state.advanceSearch.projectName, this.state.advanceSearch.ownerFirstName, this.state.advanceSearch.ownerLastName, this.state.advanceSearch.order, this.state.advanceSearch.orderBy, this.state.advanceSearch.start, 12);
  }

  render() {
    return (
      <div>
        <SearchBarContainer projectName={ this.state.advanceSearch.projectName } ownerFirstName={ this.state.advanceSearch.ownerFirstName } ownerLastName={ this.state.advanceSearch.ownerLastName} onChange={ this.handleTextChange } onSubmit={ this.handleSubmit } />

        <div className="main-container">
          <div className="container">
            <div className="row">
              <SidebarContainer order={ this.state.advanceSearch.order } orderBy={ this.state.advanceSearch.orderBy } onChange={ this.handleOrderChange } />
              <SearchResultSectionContainer advanceSearch={ this.state.advanceSearch } onClearOne={ this.handleClearOne } onClearAll={ this.handleClearAll } onLoadMore={ this.handleLoadMore } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  advanceSearch: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    advanceSearch: state.advanceSearch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
