import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <nav id="navigation-bar">
          <Link to="/"> <h2>GearUP</h2> </Link>
          <Link to="/caseload"> Clients </Link>
          <Link to="/register"> Register </Link>
          <Link to="/login"> Log In </Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
