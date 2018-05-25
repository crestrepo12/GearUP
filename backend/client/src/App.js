import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Caseload from "./components/employees/Caseload";
import Client from "./components/employees/Client";
import LoginUser from "./components/login/LoginUser";
import RegisterUser from "./components/login/RegisterUser";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null, //if you have the user then you are logged in, this will contain a user objects
      message: ''
    };
  }

  renderRegisterUser = () => {
    return <RegisterUser handleRegisterChange={this.handleRegisterChange} />;
  };

  handleRegisterChange = loggedInUser => {
    if (loggedInUser !== null) {
      this.setState({
        loggedInUser: loggedInUser
      });
    }
  };

  renderLoginUser = () => {
    return <LoginUser handleLoginChange={this.handleLoginChange} />;
  };

  handleLoginChange = loggedInUser => {
    if (loggedInUser !== null) {
      this.setState({
        loggedInUser: loggedInUser
      });
    }
  };

  logOutUser = () => {
    axios
      .get("/users/logout")
      .then(res => {
        console.log("logout res:", res);
        this.setState({
          loggedInUser: null
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: err
        })
      });
  };

  render() {
    const { loggedInUser, logOutUser } = this.state;
    const { renderRegisterUser, renderLoginUser } = this;
    return (
      <div className="App">
        <Navbar loggedInUser={loggedInUser} logOutUser={logOutUser} />

        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedInUser ? <Redirect to="/dashboard" /> : <Home />
            }
          />
          <Route
            path="/dashboard"
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
