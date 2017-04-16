import React, { Component, PropTypes } from 'react';
import ListFilterGroup from './ListFilterGroup';

class SidebarContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOption: {
        order: this.props.order,
        orderBy: this.props.orderBy
      }
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchOption: {
        order: nextProps.order,
        orderBy: nextProps.orderBy
      }
    });
  }

  handleChange(name, order, orderBy) {
    this.setState({
      [name]: {
        order: order,
        orderBy: orderBy
      }
    });

    this.props.onChange(order, orderBy);
  }

  render() {
    return (
      <div className="col-sm-3 page-sidebar mobile-filter-sidebar">
        <aside>
          <div className="inner-box">
            <ListFilterGroup name="searchOption" label="เรียงตาม.." order={ this.props.order } orderBy={ this.props.orderBy } onChange={ this.handleChange } />
            <div style={{clear: 'both'}}></div>
          </div>
        </aside>
      </div>
    );
  }
}

SidebarContainer.propTypes = {
  name: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SidebarContainer;
