import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import { Accordion, Form, Menu, Header, Button } from "semantic-ui-react";

class JourneyTrack extends Component {
  constructor() {
    super();

    this.state = {
      client: {},
      life_skills: [],
      life_skills_id: {},
      category_id: {},
      objectives: [],
      activeIndex: 0
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

  getAllObjectivesList = () => {
    // get all objectives of under life skills categories depending on current client (id) page
    const { client_id } = this.props;

    axios
      .get(`/users/client_goals/${client_id}`)
      .then(res => {
        console.log("objectives, but unicorns tho ==>", res);
        this.setState({
          objectives: res.data.objectives
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: "There is an error in fetching all client's objectives"
        });
      });
  };

  componentDidMount() {
    this.getClient();
    this.getAllLifeSkillCategories();
    this.getAllObjectivesList();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { client, life_skills, category, objectives,activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    //current category tab opened
    if (newIndex === -1) {
      //when open
      this.setState({ 
        activeIndex: newIndex, 
        category_id: life_skills[index]
      });
    } else {
      // when closed
      this.setState({
        activeIndex: 0,
        category_id: {}
      })
    }
  };

  render() {
    const { client, 
      life_skills, 
      life_skills_id,
      category_id,
      objectives, 
      activeIndex 
    } = this.state;
    const { client_id } = this.props;
    
    console.log("state journey: ",this.state)

    return (
      <div id="journey-track" className="margin-top">
        <Header as="h1">
          {`${client.firstname} ${client.lastname}'s Journey`}
        </Header>
        <div id="journey-container">
          {life_skills.map((skill, idx) => {
            return (
              <Accordion as={Menu} key={skill.id} vertical fluid>
                <Menu.Item>
                  <Accordion.Title
                    content={skill.categories}
                    active={activeIndex === idx}
                    index={idx}
                    onClick={this.handleClick}
                  />
                  <Accordion.Content 
                  active={activeIndex === idx}
                  >
                    {objectives.map((objective, ind) => {
                      <Form>
                        <Form.Group grouped>
                          <Form.Checkbox
                            label={objective[ind]}
                            name="objectives"
                            value={objective[ind]}
                            key={objective[ind]}
                          />
                        </Form.Group>
                      </Form>;
                    })}
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



