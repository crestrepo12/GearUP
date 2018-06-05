import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Accordion, Form, Menu, Header } from "semantic-ui-react";

function Objectives(props) {
return (
    <Form>
      <Form.Group grouped>
        <Form.Checkbox label={props.client.firstname} name="color" value="red" />
        <Form.Checkbox label={props.client.lastname} name="color" value="orange" />
        <Form.Checkbox label={props.client.age} name="color" value="green" />
        <Form.Checkbox label={props.client.occupation} name="color" value="blue" />
      </Form.Group>
    </Form>
  )
}

class JourneyTrack extends Component {
  constructor() {
    super();

    this.state = {
      life_skills: [],
      client: {},
      activeIndex: 0
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  getClient = () => {
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
  };

  getAllLifeSkillCategories = () => {
    //fetches all categories of life skills
    axios
      .get(`/users/all_skill_categories`)
      .then(res => {
        console.log("life skills", res);
        this.setState({
          life_skills: res.data.life_skills
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: "There is an error in fetching all life skills categories"
        });
      });
  };

  getAllObjectivesList = () => {
    // get all objectives of under life skills categories depending on current client (id) page
  };

  componentDidMount() {
    this.getClient();
    this.getAllLifeSkillCategories();
    // this.getAllObjectivesList();
  }

  render() {
    const { life_skills, client, activeIndex } = this.state;

    return (
      <div id="journey-track" className="margin-top">
        <Header as="h1">
          {`${client.firstname} ${client.lastname}'s Journey`}
        </Header>
        <div id="journey-container">
          {life_skills.map((skill, idx) => {
            return (
              <Accordion as={Menu} vertical fluid>
                <Menu.Item>
                  <Accordion.Title
                    content={skill.categories}
                    active={activeIndex === idx}
                    index={idx}
                    onClick={this.handleClick}
                  />
                  <Accordion.Content active={activeIndex === idx} >
                    <Objectives client={client} />
                 </Accordion.Content>
                </Menu.Item>
              </Accordion>
            );
          })}
        </div>
      </div>
    );
  }
}

export default JourneyTrack;
