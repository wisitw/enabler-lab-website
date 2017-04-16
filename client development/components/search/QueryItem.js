import React, { Component, PropTypes } from 'react';

class QueryItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <div className="jobs-s-tag" onClick={ this.handleClick } >
        { this.props.value }
      </div>
    )
  }
}

QueryItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default QueryItem;
