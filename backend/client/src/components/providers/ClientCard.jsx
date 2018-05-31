import react from 'react';
import React, { Component} from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import Client from "./Client";

class ClientCard extends Component {
    constructor() {
        super();
    }
    
    render() {
        const {clients} = this.props;
        console.log("client card: ++ ", clients)
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
        )
    }
}

export default ClientCard;