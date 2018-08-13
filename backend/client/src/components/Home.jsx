import React, { Component } from "react";
import Navbar from "./Navbar";
import { Header } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home-page full-height fifty-width">
        <div className="tagline circle-block" >
          <Header as="h1" color="white">
            Modernizing Special Needs Case Management
          </Header>
        </div>
      </div>
    );
  }
}

export default Home;
