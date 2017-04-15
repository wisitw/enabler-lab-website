import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <ul className="pull-left navbar-link footer-nav">
          <li>
            <Link to="/" activeClassName="active">Home</Link>
            <Link to="/aboutus" activeClassName="active">About Us</Link>
            <Link to="/founder" activeClassName="active">Founder Team</Link>
          </li>
        </ul>
        <ul className="pull-right navbar-link footer-nav">
          <li> &copy; 2017 EnablerLab.com</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
