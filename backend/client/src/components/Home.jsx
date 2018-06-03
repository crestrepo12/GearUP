import React, { Component } from "react";
import Navbar from "./Navbar";
import {
  Header
} from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home-page yellow full-height fifty-width">
        <Header as="h2">Gear UP</Header>
      </div>
    );
  }
}

export default Home;