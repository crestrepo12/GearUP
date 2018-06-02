import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import ClientCard from "./ClientCard";
// import Client from "./Client";

class Caseload extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      message: ""
    };
  }

  componentDidMount() {
    //whoever is logged in fetches their list of clients
    const user = this.props.loggedInUser;
    const provider_id = this.props.loggedInUser.id;
    axios
      .get(`/users/clients/${provider_id}`)
      .then(res => {
        this.setState({
          clients: res.data.clients
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: "There is an error in fetching a list of clients"
        });
      });
  }

  render() {
    const { loggedInUser } = this.props;
    const { clients } = this.state;
    return (
      <div id="caseload" className="center">
        <h1>Caseload</h1>

        <ClientCard loggedInUser={loggedInUser} clients={clients} />
      </div>
    );
  }
}

export default Caseload;
