import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import { Accordion, Form, Menu, Header } from "semantic-ui-react";

class JourneyTrack extends Component {
  constructor() {
    super();

    this.state = {
      life_skills: [],
      client: {}
    };
  }

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

  //   getAllObjectivesListFromLifeSkills = () => {

  //   }

  componentDidMount() {
    this.getClient();
    this.getAllLifeSkillCategories();
  }

  render() {
    const { life_skills, client } = this.state;

    return (
      <div id="journey-track" className="margin-top">
        <Header as="h1">
          {`${client.firstname} ${client.lastname}'s Journey`}
        </Header>
        <div id="journey-container">
        {life_skills.map(skill => {
          return (
            <Accordion as={Menu} vertical fluid
            >
              <Menu.Item>
                <Accordion.Title content={skill.categories} />
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
