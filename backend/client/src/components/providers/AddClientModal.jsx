import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
  Form,
  Message
} from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

class AddClientModal extends Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      age: "",
      occupation: "",
      gender: "",
      residential_address: "",
      zipcode: "",
      phone_number: "",
      imgurl: "",
      bio: "",
      disability: "",
      medicaid: "",
      submitted: false,
      message: ""
    };
  }

  addNewClientSubmitForm = e => {
    // e.preventDefault();
    console.log("im trying to submit new client");
    axios
      .post(`/users/add_client`, {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        age: this.state.age,
        occupation: this.state.occupation,
        gender: this.state.gender,
        residential_address: this.state.residential_address,
        zipcode: this.state.zipcode,
        phone_number: this.state.phone_number,
        imgurl: this.state.imgurl,
        bio: this.state.bio,
        disability: this.state.disability,
        medicaid: this.state.medicaid
      })
      .then(res => {
        console.log(res);
        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          age: "",
          occupation: "",
          gender: "",
          residential_address: "",
          zipcode: "",
          phone_number: "",
          imgurl: "",
          bio: "",
          disability: "",
          medicaid: "",
          submitted: true,
          message: "Congratulations on your new client!"
        });
      })
      .catch(err => {
        console.log("err sending post when adding client", err);
      });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = (e, { value }) => this.setState({ gender: value });

  handleRadioChange = (e, { value }) => this.setState({ medicaid: value });

  render() {
    const {
      firstname,
      lastname,
      email,
      age,
      occupation,
      gender,
      residential_address,
      zipcode,
      phone_number,
      imgurl,
      bio,
      disability,
      medicaid,
      submitted,
      value,
      message
    } = this.state;

    const { handleInput, handleRadioChange, addNewClientSubmitForm } = this;
    const { loggedInUser } = this.props;
    console.log(this.state);

    return (
      <Modal trigger={<Button color="teal"> Add Client </Button>} closeIcon>
        <Modal.Header>Client Form</Modal.Header>
        <Modal.Content image scrolling>
          <Image
            size="medium"
            src="User-Profile.png"
            alt="placeholder profile image"
            wrapped
          />

          <Modal.Description>
            <Form className="form-container" onSubmit={addNewClientSubmitForm}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="First name"
                  aria-label="First name"
                  placeholder="First name"
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={handleInput}
                  required
                />
                <Form.Input
                  fluid
                  label="Last name"
                  aria-label="Last name"
                  placeholder="Last name"
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={handleInput}
                  required
                />

                <Form.Select
                  fluid
                  label="Gender"
                  aria-label="Gender"
                  placeholder="Gender"
                  name="gender"
                  selection
                  options={options}
                  onChange={this.handleChange}
                  value={gender}
                  required
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Email"
                  aria-label="Email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInput}
                  required
                />
                <Form.Input
                  width={4}
                  label="Age"
                  aria-label="Age"
                  placeholder="Age"
                  type="text"
                  name="age"
                  value={age}
                  onChange={handleInput}
                  required
                />
                <Form.Input
                  fluid
                  label="Occupation"
                  aria-label="Occupation"
                  placeholder="Occupation"
                  type="text"
                  name="occupation"
                  value={occupation}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Residential Address"
                  aria-label="Residential Address"
                  placeholder="Residential Address"
                  type="text"
                  name="residential_address"
                  value={residential_address}
                  onChange={handleInput}
                  required
                />
                <Form.Input
                  width={6}
                  label="Zipcode"
                  aria-label="Zipcode"
                  placeholder="Zipcode"
                  type="text"
                  name="zipcode"
                  value={zipcode}
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Phone Number"
                  aria-label="Phone Number"
                  placeholder="XXX-XXX-XXXX"
                  type="text"
                  name="phone_number"
                  value={phone_number}
                  onChange={handleInput}
                  required
                />
                <Form.Input
                  fluid
                  label="Image URL"
                  aria-label="Image URL"
                  placeholder="Image URL"
                  type="text"
                  name="imgurl"
                  value={imgurl}
                  onChange={handleInput}
                />
              </Form.Group>

              <Form.Input
                width={8}
                label="Disability"
                aria-label="Disability"
                placeholder="Disability"
                type="text"
                name="disability"
                value={disability}
                onChange={handleInput}
                required
              />

              <Form.Group inline>
                <label>Medicaid</label>
                <Form.Radio
                  label="Yes"
                  aria-label="Yes"
                  name="medicaid"
                  value="true"
                  checked={medicaid === "true"}
                  onChange={handleRadioChange}
                  selection="true"
                />
                <Form.Radio
                  name="medicaid"
                  label="No"
                  aria-label="No"
                  value="false"
                  checked={medicaid === "false"}
                  onChange={handleRadioChange}
                  selection="false"
                />
              </Form.Group>
              <Form.TextArea
                label="Bio"
                aria-label="Bio"
                name="bio"
                value={bio}
                placeholder="Tell us more about your new client..."
                onChange={handleInput}
                required
              />

              <Form.Button>Submit</Form.Button>

              <div>
                {submitted ? <Message color="teal" content={message} /> : ""}
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddClientModal;
