import React, { Component, PropTypes } from 'react'

class ListFilterItem extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.value);
  }

  render() {
    return (
      <div onClick={ this.handleClick } >
        <input type="radio" checked={ this.props.checked } value={ this.props.value } name={ this.props.name } />
        <label>{ this.props.label }</label>
      </div>
    );
  }
}

ListFilterItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ListFilterItem;
