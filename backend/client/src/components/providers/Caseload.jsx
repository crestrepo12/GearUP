import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";

class Caseload extends Component {
  constructor() {
    super();
    this.state = {
      clients: []
    };
  }

  getClients = () => {
    //have to grab employee id from current logged in user state
    // const user = this.props.loggedInUser;
    // console.log("prop user: ", user);
    const { employee_id } = this.state.match.params;
    axios
      .get(`/users/clients/${employee_id}`)
      .then(res => {
        console.log("clients caseload res", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // componentDidMount() {
  //   this.getClients();
  // }

  render() {
    return (
      <div id="caseload">
        <h1>Caseload</h1>
      </div>
    );
  }
}

export default Caseload;
