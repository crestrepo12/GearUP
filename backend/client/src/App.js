import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
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
      loggedInUser: ""
    }
  }

  renderRegisterUser = () => {
    return (
    <RegisterUser
      handleRegisterChange={this.handleRegisterChange}
    />
    );
  }
// res.data.data = user
  handleRegisterChange = (loggedInUser) => {
    this.setState({
      loggedInUser: loggedInUser
    });
  } 

  render() {
    const { renderRegisterUser } = this;
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/employee/" component={Caseload} />
          <Route path="/client/:id" component={Client} />
          <Route path="/register" render={renderRegisterUser} />
          <Route path="/login" component={LoginUser} />
        </Switch>
      </div>
    );
  }
}

export default App;
