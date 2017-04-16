import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as projectActions from '../../actions/projectActions';

class SearchBarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      targetUrl: "",
      autoComplete: this.props.autoComplete
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchSearchAutoComplete("");
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      autoComplete: nextProps.autoComplete
    });
  }

  handleChange(event) {
    let value = event.target.value;
    let spliterIndex = value.indexOf(" @");

    if (spliterIndex >= 0) {
      let keyword = value.substring(0, spliterIndex);
      let targetUrl = value.substring(spliterIndex + 2);

      this.setState({
        keyword: keyword,
        targetUrl: targetUrl
      });

      browserHistory.push('project/' + targetUrl);

      this.props.actions.fetchSearchAutoComplete(keyword);
    } else {
      this.setState({
        keyword: value,
        targetUrl: ""
      });

      this.props.actions.fetchSearchAutoComplete(value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.fetchNewAdvanceSearchResult(this.state.keyword, "", "", "NAME", "ASC", 0, 12);
  }

  render() {
    return (
      <div className="row search-row animated fadeInUp">
        <div className="col-lg-8 col-sm-8 search-col relative">
          <i className="icon-docs icon-append"></i>
          <input
            type="text"
            list="searchList"
            name="ads"
            className="form-control has-icon"
            placeholder="I'm looking for a ..."
            value={ this.state.keyword }
            onChange={ this.handleChange } />

          <datalist id="searchList">
            {
              Object.keys(this.state.autoComplete).map((key, index) => {
                return <option value={ this.state.autoComplete[key].name + " @" + this.state.autoComplete[key].url } />
              })
            }
          </datalist>

        </div>
        <div className="col-lg-4 col-sm-4 search-col">
          <button className="btn btn-primary btn-search btn-block" onClick={ this.handleSubmit } >
            <i className="icon-search"></i>
            <strong>Search</strong>
          </button>
        </div>
      </div>
    );
  }
}

SearchBarContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  autoComplete: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    autoComplete: state.searchAutoComplete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
