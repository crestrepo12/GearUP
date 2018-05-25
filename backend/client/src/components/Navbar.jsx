import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  navbarUserLoggedIn = () => {
    const { logOutUser } = this.props;
    return (
      <nav id="navigation-bar">
        <Link to="/">
          {" "}
          <h2>GearUP</h2>{" "}
        </Link>
        <Link to="/dashboard"> Clients </Link>
        <input type="button" value="Log Out" onClick={logOutUser}/>
      </nav>
    );
  };

  navbarUserLoggedOut = () => {
    return (
      <nav id="navigation-bar">
        <Link to="/">
          {" "}
          <h2>GearUP</h2>{" "}
        </Link>
        <Link to="/dashboard"> Clients </Link>
        <Link to="/register"> Register </Link>
        <Link to="/login"> Log In </Link>
      </nav>
    );
  };

  render() {
    const { loggedInUser } = this.props;
    const { navbarUserLoggedIn, navbarUserLoggedOut } = this;

    if (loggedInUser !== null) {
      return navbarUserLoggedIn();
    } else if (loggedInUser === null) {
      return navbarUserLoggedOut();
    }
  }
}

export default Navbar;
