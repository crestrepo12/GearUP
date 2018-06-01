import react from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class ClientCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { clients } = this.props;

    return (
      <div>
        {clients.map(client => {
          return (
            <Link to={`/client/${client.id}`} key={client.id}>
              <img src={client.imgurl} alt={client.firstname} />
              <h3>{`${client.firstname} ${client.lastname}`}</h3>

            </Link>
          );
        })}
      </div>
    );
  }
}

export default ClientCard;
