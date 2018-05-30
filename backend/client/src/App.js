import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Caseload from "./components/providers/Caseload";
import Client from "./components/providers/Client";
import LoginUser from "./components/login/LoginUser";
import RegisterUser from "./components/login/RegisterUser";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null, //if you have the user then you are logged in, this will contain a user objects
      message: "",
    };
  }

  renderRegisterUser = () => {
    return <RegisterUser handleRegisterChange={this.handleRegisterChange} />;
  };

  handleRegisterChange = loggedInUser => {
    this.setState({
      loggedInUser: loggedInUser
    });
  };

  renderLoginUser = () => {
    return <LoginUser handleLoginChange={this.handleLoginChange} />;
  };

  handleLoginChange = loggedInUser => {
    this.setState({
      loggedInUser: loggedInUser
    });
  };

  logOutUser = () => {
    this.setState({
      loggedInUser: null
    });
  };

  render() {
    const { loggedInUser } = this.state;
    const { renderRegisterUser, renderLoginUser, logOutUser } = this;

    console.log("current logged in user ====> ", loggedInUser);
  
    return (
      <div className="App">
        <Navbar loggedInUser={loggedInUser} logOutUser={logOutUser} />

        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedInUser ? <Redirect to="/caseload" /> : <Home />
            }
          />
          <Route
            path="/caseload"
            render={() => (loggedInUser ? <Caseload /> : <Redirect to="/" />)}
          />
          <Route
            path="/client/:id"
            render={() => (loggedInUser ? <Client /> : <Redirect to="/" />)}
          />
          <Route
            path="/register"
            render={() => (loggedInUser ? <Caseload /> : renderRegisterUser())}
          />
          <Route
            path="/login"
            render={() => (loggedInUser ? <Caseload /> : renderLoginUser())}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
