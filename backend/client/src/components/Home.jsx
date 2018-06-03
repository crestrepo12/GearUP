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
        <Header as="h2" className="center">Gear UP</Header>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci eu
          lobortis elementum nibh. Pretium viverra suspendisse potenti nullam ac
          tortor vitae purus. Netus et malesuada fames ac turpis egestas.
        </p>
      </div>
    );
  }
}

export default Home;
