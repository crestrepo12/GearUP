import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Button } from "semantic-ui-react";
import ModalExampleScrollingContent from "./providers/AddClientModal";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  signOutUser = () => {
    axios
      .get("/users/logout")
      .then(res => {
        this.props.logOutUser();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: err
        });
      });
  };

  navbarUserLoggedIn = () => {
    const { logOutUser } = this.props;
    return (
      <nav id="navigation-bar">
        <div id="navbar-left">
          <Link to="/">
            <h2>GearUP</h2>
          </Link>
        </div>
        <div id="navbar-right">
          <Button content="Log Out" onClick={this.signOutUser} color="orange"/>
          <Button content="Add Client" color="teal"/>
        </div>
      </nav>
    );
  };

  navbarUserLoggedOut = () => {
    return (
      <nav id="navigation-bar">
        <div id="navbar-left">
          <Link to="/">
            <h2>GearUP</h2>
          </Link>
        </div>
        <div id="navbar-right">
          <Link to="/register"> Register </Link>
          <Link to="/login"> Log In </Link>
        </div>
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
