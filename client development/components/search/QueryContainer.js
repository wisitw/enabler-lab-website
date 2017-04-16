import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import QueryItem from './QueryItem';

class QueryContainer extends Component {
  constructor(props) {
    super(props);

    this.handleClear = this.handleClear.bind(this);
    this.handleClearAll = this.handleClearAll.bind(this);
  }

  handleClear(value) {
    this.props.onClearOne(value);
  }

  handleClearAll() {
    this.props.onClearAll();
  }

  render() {
    let filter = "";
    if (this.props.projectName != "") {
      if (this.props.ownerFirstName != "") {
        if (this.props.ownerLastName != "") {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              <QueryItem name="projectName" value={ this.props.projectName } onClick={ this.handleClear } />
              from
              <QueryItem name="ownerFirstName" value={ this.props.ownerFirstName } onClick={ this.handleClear } />
              <QueryItem name="ownerLastName" value={ this.props.ownerLastName } onClick={ this.handleClear } /> 
            </div>
          );
        } else {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              <QueryItem name="projectName" value={ this.props.projectName } onClick={ this.handleClear } />
              from
              <QueryItem name="ownerFirstName" value={ this.props.ownerFirstName } onClick={ this.handleClear } />
            </div>
          );
        }
      } else {
        if (this.props.ownerLastName != "") {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              <QueryItem name="projectName" value={ this.props.projectName } onClick={ this.handleClear } />
              from
              <QueryItem name="ownerLastName" value={ this.props.ownerLastName } onClick={ this.handleClear } /> 
            </div>
          );
        } else {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              <QueryItem name="projectName" value={ this.props.projectName } onClick={ this.handleClear } />
            </div>
          );
        }
      }
    } else {
      if (this.props.ownerFirstName != "") {
        if (this.props.ownerLastName != "") {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              All Project from
              <QueryItem name="ownerFirstName" value={ this.props.ownerFirstName } onClick={ this.handleClear } />
              <QueryItem name="ownerLastName" value={ this.props.ownerLastName } onClick={ this.handleClear } /> 
            </div>
          );
        } else {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              All Project from
              <QueryItem name="ownerFirstName" value={ this.props.ownerFirstName } onClick={ this.handleClear } />
            </div>
          );
        }
      } else {
        if (this.props.ownerLastName != "") {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              All Project from
              <QueryItem name="ownerLastName" value={ this.props.ownerLastName } onClick={ this.handleClear } /> 
            </div>
          );
        } else {
          filter = (
            <div className="breadcrumb-list text-center-xs">
              
            </div>
          );
        }
      }
    }

    return (
      <div className="listing-filter hidden-xs">
        <div className="pull-left col-sm-6 col-xs-12">
          { filter }
        </div>
        <div
          className="pull-right col-sm-6 col-xs-12 text-right text-center-xs listing-view-action">
          <span className="clear-all-button text-muted" onClick={ this.handleClearAll }>Clear all</span>
        </div>
        <div style={{ clear: "both" }}>
        </div>
      </div>
    );
  }
}

QueryContainer.propTypes = {
  projectName: PropTypes.string.isRequired,
  ownerFirstName: PropTypes.string.isRequired,
  ownerLastName: PropTypes.string.isRequired,
  onClearOne: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  return {
    projectName: state.advanceSearch.projectName,
    ownerFirstName: state.advanceSearch.ownerFirstName,
    ownerLastName: state.advanceSearch.ownerLastName
  };
}

export default connect(mapStateToProps)(QueryContainer);
