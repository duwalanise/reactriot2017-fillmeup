import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const NavDropdown = ({ userDetail }) =>
  (
    <ul className="nav navbar-nav navbar-right">
      {
        userDetail ?
        (
          <li className="dropdown user-info">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <div>Hello</div>
            </a>
            <ul className="dropdown-menu">
              <li>My Profile</li>
              <hr />
              <li>Sign Out</li>
            </ul>
          </li>
        ) :
        (
          <li className="user-info">
            <Link to="/login">Sign In</Link>
          </li>
        )
      }
    </ul>
  );

export default NavDropdown;

NavDropdown.defaultProps = {
  userDetail: null,
};
