import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./css/Login&Register.css";
import "./css/Profile.css";
import Navbar from "./components/Navbar";
import Caseload from "./components/providers/Caseload";
import ClientProfile from "./components/providers/ClientProfile";
import LoginUser from "./components/login/LoginUser";
import RegisterUser from "./components/login/RegisterUser";
import JourneyTrack from "./components/providers/JourneyTrack"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: null,
      message: ""
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

  renderCaseload = () => {
    const { loggedInUser } = this.state;
    return <Caseload loggedInUser={loggedInUser} />;
  };

  renderClientProfile = routeProps => {
    return <ClientProfile client_id={routeProps.match.params.client_id} />;
  };

  renderJourneyTrack = routeProps => {
    return <JourneyTrack client_id={routeProps.match.params.client_id} />
  }

  render() {
    const { loggedInUser } = this.state;
    const {
      renderRegisterUser,
      renderLoginUser,
      logOutUser,
      renderCaseload,
      renderClientProfile,
      renderJourneyTrack
    } = this;

    console.log("current logged in user ====> ", loggedInUser);

    return (
      <div className="App">
        <Navbar loggedInUser={loggedInUser} logOutUser={logOutUser} />

        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedInUser ? <Redirect to="/caseload" /> : renderRegisterUser()
            }
          />
          <Route
            path="/caseload"
            render={() =>
              loggedInUser ? renderCaseload() : <Redirect to="/" />
            }
          />
          <Route
            path="/client/:client_id/journey"
            render={(routeProps) =>
              loggedInUser ? renderJourneyTrack(routeProps) : <Redirect to="/" />
            }
          />
          <Route
            path="/client/:client_id"
            render={(routeProps) =>
              loggedInUser ? renderClientProfile(routeProps) : <Redirect to="/" />
            }
          />
          <Route
            path="/register"
            render={() =>
              loggedInUser ? renderCaseload() : renderRegisterUser()
            }
          />
          <Route
            path="/login"
            render={() =>
              loggedInUser
                ? renderCaseload() && <Redirect to="/caseload" />
                : renderLoginUser()
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
