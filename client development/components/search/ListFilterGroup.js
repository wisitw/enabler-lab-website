import React, { Component, PropTypes } from 'react';
import ListFilterItem from './ListFilterItem';

class ListFilterGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.orderBy + this.props.order
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.orderBy + nextProps.order
    });
  }

  handleChange(value) {
    this.setState({
      value: value
    });

    let order = value.substring(4,7);
    let orderBy = value.substring(0,4);
    this.props.onChange(this.props.name, order, orderBy);
  }

  render() {
    return (
      <div className=" list-filter">
        <h5 className="list-title"><strong><a href="#">{ this.props.label }</a></strong></h5>
        <div className="filter-date filter-content">
          <ul>
            <li key="choice1">
              <ListFilterItem name="NAMEASC" label="ชื่อโปรเจกต์ (ก-ฮ)" value="NAMEASC" checked={ this.state.value == "NAMEASC" } onClick={ this.handleChange } />
            </li>
            <li key="choice2">
              <ListFilterItem name="NAMEDSC" label="ชื่อโปรเจกต์ (ฮ-ก)" value="NAMEDSC" checked={ this.state.value == "NAMEDSC" } onClick={ this.handleChange } />
            </li>
            <li key="choice3">
              <ListFilterItem name="DATEDSC" label="ใหม่ล่าสุด" value="DATEDSC" checked={ this.state.value == "DATEDSC" } onClick={ this.handleChange } />
            </li>
            <li key="choice4">
              <ListFilterItem name="DATEASC" label="เก่าที่สุด" value="DATEASC" checked={ this.state.value == "DATEASC" } onClick={ this.handleChange } />
            </li>
            <li key="choice5">
              <ListFilterItem name="VIEWDSC" label="ได้รับความนิยมมาก" value="VIEWDSC" checked={ this.state.value == "VIEWDSC" } onClick={ this.handleChange } />
            </li>
            <li key="choice6">
              <ListFilterItem name="VIEWASC" label="ได้รับความนิยมน้อย" value="VIEWASC" checked={ this.state.value == "VIEWASC" } onClick={ this.handleChange } />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ListFilterGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ListFilterGroup;
