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
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/employee/" component={Caseload} />
          <Route path="/client/:id" component={Client} />
          <Route path="/register" component={RegisterUser} />
          <Route path="/login" component={LoginUser} />
        </Switch>
      </div>
    );
  }
}

export default App;
