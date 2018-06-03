import react from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from 'semantic-ui-react'

class ClientCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { clients } = this.props;

    return (
      <div className="client-card">
      {clients.map(client => {
        return (
          <Link to={`/client/${client.id}`} key={client.id}>
          <Card
              image={client.imgurl} 
              alt={client.firstname}
              header={`${client.firstname} ${client.lastname}`}
              meta={client.gender}
              description="Loves to go to the movies"
          />
            </Link>
          );
        })}
        </div>
    );
  }
}

export default ClientCard;
