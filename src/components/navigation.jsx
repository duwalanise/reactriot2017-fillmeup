import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import NavDropDown from './nav_dropdown.jsx';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userDetail, signOut } = this.props;
    return (
      <nav className="navbar navbar-fixed-top navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="sr-only">Toggle</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <IndexLink to="/" className="navbar-brand">
              <img src="../../images/fmu-icon.png" alt="fmu-icon" className="app-icon" />
            </IndexLink>
          </div>
          <div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                {
                  userDetail ?
                  (
                    <li><Link to={`pumps/${userDetail.uid}`} activeClassName="activeNav">My Pump</Link></li>
                  ) :
                  null
                }
              </ul>
              <NavDropDown userDetail={userDetail} signOut={signOut} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;

Navigation.defaultProps = {
  navStyle: {},
  navContent: {},
  navType: 'default',
};

Navigation.propTypes = {
  navType: PropTypes.string,
  navStyle: PropTypes.objectOf(PropTypes.any),
  navContent: PropTypes.objectOf(PropTypes.any),
};
