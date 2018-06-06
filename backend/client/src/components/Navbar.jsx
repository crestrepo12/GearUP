import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Button } from "semantic-ui-react";
import AddClientModal from "./providers/AddClientModal";
import { Image } from "semantic-ui-react";
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
            <Image src="GearUpIcon.png" alt="logo" />
            <h2> GearUP </h2>
          </Link>
        </div>
        <div id="navbar-right">
          <AddClientModal loggedInUser={this.props.loggedInUser}/>
          <Button content="Log Out" onClick={this.signOutUser} color="orange" />
        </div>
      </nav>
    );
  };

  navbarUserLoggedOut = () => {
    return (
      <nav id="navigation-bar">
        <div id="navbar-left">
          <Link to="/">
          <Image src="GearUpIcon.png" alt="logo" />
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
