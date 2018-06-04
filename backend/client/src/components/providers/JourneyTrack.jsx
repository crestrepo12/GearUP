import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Accordion, Form, Menu } from "semantic-ui-react";

class JourneyTrack extends Component {
  constructor() {
    super();

    this.state = {
      lifeSkillsCategory: [],
      client: {}
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

    const { client } = this.state;

    return (
      <div>
        <h1>Journey Track for {`${client.firstname} ${client.lastname}`}</h1>
        <Form>
            <Form.Group grouped>
                <Form.Checkbox label="hi" name="career path" />
                <Form.Checkbox label="hello" name="career path" />
            </Form.Group>
            </Form>
      </div>
    );
  }
}

export default JourneyTrack;
