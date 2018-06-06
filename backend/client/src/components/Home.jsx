import React, { Component } from "react";
import Navbar from "./Navbar";
import { Header } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home-page yellow full-height fifty-width">
        {/* <Header as="h2" className="center">
          Gear UP
        </Header> */}
        <div className="tagline">
          <Header as="h1" >
            Modernizing Special Needs
          </Header>
          <Header as="h1" >
            Case Management
          </Header>
        </div>
      </div>
    );
  }
}

export default Home;
