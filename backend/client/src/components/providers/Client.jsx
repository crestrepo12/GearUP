import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";

class Client extends Component {
  constructor() {
    super();

    this.state = {
      client: {},
      message: ""
    };
  }

  componentDidMount() {
    //fetches one client
    const { client_id } = this.props;
    axios
      .get(`/users/client/${client_id}`)
      .then(res => {
        console.log("unicorns are real", res);

        this.setState({
          client: res.data.client[0]
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: "There is an error in fetching one client"
        });
      });
  }

  render() {
    const { client_id } = this.props;
    const { client } = this.state;

    /* 
   Style as a LinkedIn profile/ Instagram, give it a young crowd feel that people are use to.

        *profile header:
        picture
        full name
        age
        gender
        occupation

        *contact info:
        email
        phone
        residential address

        *bio:
        bio paragraph


        */

    return (
      <div id="client">
        <h1>Client</h1>

        <div key={client.id}>
          <div id="profile-header">
            <img
              src={client.imgurl}
              alt={`${client.firstname} ${client.lastname}`}
            />

            <h2>{`${client.firstname} ${client.lastname}`}</h2>
            <p>{client.age}</p>
            <p>{client.gender}</p>
            <p>{client.occupation}</p>
          </div>

          <div id="profile-contact-info">
          <h3>Contact Info:</h3>
            <p>{client.email}</p>
            <p>{client.phone_number}</p>
            <p>{`${client.residential_address} ${client.zipcode}`}</p>
          </div>

        <div id="profile-bio">
        <h3>Bio:</h3>
        <p>{client.bio}</p>
        </div>

        <div id="profile-medical-info">
        <h3>Medical Info:</h3>
        <p>{client.disability}</p>
        <p>Have medicaid? :{client.medicaid ? true : false}</p>
        </div>

        </div>
      </div>
    );
  }
}

export default Client;
