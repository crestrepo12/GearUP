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

  componentDidMount() {
    
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
      });
  }

  // componentDidMount() {
  //   this.getClients();
  // }

  render() {
    const { clients } = this.state;
    return (
      <div id="caseload">

        <h1>Caseload</h1>

        <div>

          {clients.map(client => {
            return (
              <div key={client.id}> 

              <img src={client.imgurl} alt={client.firstname} /> 
              <h3>{`${client.firstname} ${client.lastname}`}</h3>
              
              </div>
            );
          })}
          
        </div>

      </div>
    );
  }
}

export default Caseload;
