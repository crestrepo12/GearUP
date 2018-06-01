import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from 'axios';


class Client extends Component {
  constructor() {
    super();
    
    this.state = {
      client: {}
    }
  }

componentDidMount() {
  //fetches one client
  const {client_id} = this.props;
  axios
  .get(`users/client/${client_id}`)
  .then(res => {
    console.log("unicorns are real", res)
    
    // this.setState({
    //   client: res.data.client
    // });
  })
  .catch(err => {
    console.log(err)
  })
}

  render() {
    console.log("client_id: WTF", this.props.client_id)
    console.log(this.props)
    const {client_id} = this.props;
    const { client } = this.state;
    return (
      <div id="client">
        <h1>Client</h1>
        
            <div key={client.id}>
              <h2>
                {client.imgurl}
                {client.firstname}
                {client.lastname}
              </h2>
            </div>
        
      </div>
    );
  }
}

export default Client;
