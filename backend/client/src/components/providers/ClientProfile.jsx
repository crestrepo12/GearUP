import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import {
  Header,
  Icon,
  Image,
  List,
  Button,
  Item,
  Label
} from "semantic-ui-react";

class ClientProfile extends Component {
  constructor() {
    super();

    this.state = {
      client: {},
      message: ""
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
    const { client_id } = this.props;
    const { client } = this.state;

    /* 
   Style as a LinkedIn profile/ Instagram, give it a young crowd feel that people are use to.

        *profile header:
        picture
        full name
        age
        gender
        occupation

        *contact info:
        email
        phone
        residential address

        *bio:
        bio paragraph

        */

    return (
      <div id="client-profile" className="margin-top">
        <div key={client.id} id="profile-header">
          <Item.Group divided>
            <Item>
              <Image
                src={client.imgurl}
                alt={`${client.firstname} ${client.lastname}`}
                rounded
                className="adjust-image-profile"
              />
              <Item.Content>
                <Item.Header>
                  {`${client.firstname} ${client.lastname}`}
                </Item.Header>

                <List>
                  <List.Item>
                    <List.Header>Age:</List.Header>
                    {client.age}
                  </List.Item>
                  <List.Item>
                    <List.Header>Gender:</List.Header>
                    {client.gender}
                  </List.Item>
                  <List.Item>
                    <List.Header>Occupation:</List.Header>
                    {client.occupation}
                  </List.Item>
                </List>
                <Link to={`/client/${client.id}/journey`}>
                <Button content="Journey Goals" color="teal" />
                </Link>
              </Item.Content>
            </Item>

            <Item>
              <Item.Content id="profile-contact-info">
                <Item.Header>Contact Info:</Item.Header>

                <Item.Description>
                  <Label>Email</Label>
                  {" " + client.email}
                </Item.Description>

                <Item.Description>
                  <Label>Phone</Label>
                  {" " + client.phone_number}
                </Item.Description>

                <Item.Description>
                  <Label> Residential Address</Label>
                  {` ${client.residential_address} ${client.zipcode}`}
                </Item.Description>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <div id="profile-bio">
                  <h3>Bio:</h3>
                  <p>{client.bio}</p>
                </div>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <div id="profile-medical-info">
                  <h3>Medical Info:</h3>
                  <p>{client.disability}</p>
                  <p>Have medicaid? :{client.medicaid ? true : false}</p>
                </div>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
      </div>
    );
  }
}

export default ClientProfile;
