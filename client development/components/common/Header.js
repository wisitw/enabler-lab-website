import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import * as userActions from '../../actions/userActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout(event) {
    event.preventDefault();
    this.props.actions.signout();
  }

  render() {
    const rightNav = (localStorage.getItem("enablerT") !== null) ? (
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/project/add" activeClassName="active">เพิ่มโปรเจกต์ใหม่</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link to="/dashboard" activeClassName="active">{ this.props.user.firstName + ' ' + this.props.user.lastName }</Link>
        </NavItem>
        <li role="presentation" className="">
          <a role="button" href="#">
            <a href="#" className="active" onClick={ this.signout }>ออกจากระบบ</a>
          </a>
        </li>
      </Nav>
    ) : (
      <Nav pullRight>
        <NavItem eventKey={1}>
          <Link to="/signin" activeClassName="active">เข้าสู่ระบบ</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link to="/signup" activeClassName="active">สมัครสมาชิก</Link>
        </NavItem>
      </Nav>
    );
    return (
      <div id="wrapper">
        <header className="header">
          <Navbar collapseOnSelect className="navbar-site">
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" activeClassName="active" className="logo logo-title">
                  <span className="logo-icon"><i className="icon icon-search-1 ln-shadow-logo shape-0"></i> </span>ENABLER<span> LAB</span>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              { rightNav }
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
