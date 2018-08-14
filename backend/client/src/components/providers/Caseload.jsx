import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import ClientCard from "./ClientCard";
import { Header, Grid } from "semantic-ui-react";
import defaultImage from "../../assets/User-Profile.png"

class Caseload extends Component {
  constructor() {
    super();
    this.state = {
      clients: [],
      message: ""
    };
  }

  getClients = () => {
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
  };

  componentDidMount() {
    this.getClients();
  }

  render() {
    const { loggedInUser } = this.props;
    const { clients } = this.state;
    return (
      <div id="caseload" className="margin-top">
        <Header as="h1" className="center">
          Caseload
        </Header>

        {clients.length === 0 ? (
          <div>
          <Header as="h2" className="center">
            {" "}
            Welcome to GearUP{" "}
          </Header>
          <p className="center"> Begin adding clients by clicking the "Add Client" at the top right corner</p>
          </div>
        ) : (
          <ClientCard loggedInUser={loggedInUser} clients={clients} />
        )}
      </div>
    );
  }
}

export default Caseload;
