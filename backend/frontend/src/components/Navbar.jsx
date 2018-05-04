import react, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <nav>
          <Link to="/"> Home </Link>
        </nav>
      </Fragment>
    );
  }
}

export default Navbar;
