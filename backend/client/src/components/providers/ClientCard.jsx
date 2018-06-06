import react from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

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
              <Card>
                <Image
                  src={client.imgurl}
                  alt={client.imgurl}
                  className="adjust-image"
                />
                <Card.Content>
                  <Card.Header>{`${client.firstname} ${
                    client.lastname
                  }`}</Card.Header>
                  <Card.Meta>{`${client.gender}, ${client.age}`}</Card.Meta>
                  <Card.Description>
                    "Loves going to the movies"
                  </Card.Description>
                </Card.Content>
                
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ClientCard;
