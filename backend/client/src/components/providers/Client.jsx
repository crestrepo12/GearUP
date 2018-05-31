import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import ClientCard  from "./ClientCard";

class Client extends Component {
  constructor() {
    super();
  }
// make an axios request to getClientsById
  render() {
    const { clients } = this.props;
    console.log("client ++: ", clients)
    return (
      <div id="client">
        <h1>Client</h1>
        {clients.map(client => {
          return (
            <div key={client.id}>
              <h2>
                {client.firstname}
                {client.lastname}
              </h2>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Client;
