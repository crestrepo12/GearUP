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
    //have to grab provider id from current logged in user state
    // const user = this.props.loggedInUser;
    // console.log("prop user: ", user);
    const { provider_id } = this.state.match.params;
    axios
      .get(`/users/clients/${provider_id}`)
      .then(res => {
        console.log("clients caseload res", res);
        this.setState({
          clients: res.data.user
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  // componentDidMount() {
  //   this.getClients();
  // }

  render() {
    const { clients } = this.state;
    return (
      <div id="caseload">
        <h1>Caseload</h1>
        <div>{clients.map( client => {
          return <h3>{`Client ${client.id}: ${client.firstname} ${client.lastname}`}</h3>
        })}</div>
      </div>
    );
  }
}

export default Caseload;
