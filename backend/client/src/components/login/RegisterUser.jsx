import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Home from "../Home";
import { Button, Form, Header, Message } from "semantic-ui-react";

class RegisterUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      message: ""
    };
  }

  inputOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitRegisterForm = e => {
    e.preventDefault();

    const {
      firstname,
      lastname,
      email,
      password,
      confirm_password
    } = this.state;

    if (password !== confirm_password) {
      this.setState({
        message: "* Passwords do not match"
      });
      return;
    } else if (password === confirm_password) {
      this.setState({
        message: "Passwords match"
      });
    }

    axios
      .post("/users/create_account", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      })
      .then(res => {
        var user = res.data.user;
        this.props.handleRegisterChange(user);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: "an error has occurred"
        });
      });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      confirm_password
    } = this.state;

    const { inputOnChange, submitRegisterForm } = this;

    return (
      <div id="register-home-page" className="row full-width">
        <Home />
        <div className="register-container full-height fifty-width orange">
          <Form onSubmit={submitRegisterForm} className="column green">
            <Header as="h2" className="center">
              {" "}
              Register Here{" "}
            </Header>
            <Form.Input
              type="text"
              name="firstname"
              placeholder="First name"
              onChange={inputOnChange}
              fluid
              icon="user"
              iconPosition="left"
            />
            <Form.Input
              type="text"
              name="lastname"
              placeholder="Last name"
              onChange={inputOnChange}
              fluid
              icon="user"
              iconPosition="left"
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={inputOnChange}
              fluid
              icon="at"
              iconPosition="left"
            />
            <Form.Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={inputOnChange}
              fluid
              icon="lock"
              iconPosition="left"
            />
            <Form.Input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={inputOnChange}
              fluid
              icon="lock"
              iconPosition="left"
            />
            <Button type="submit" value="Submit">
              {" "}
              Create Account{" "}
            </Button>
          </Form>
          <br />
          <div>
            <Message className="center">
              Already have an account? <Link to="/login">Log in here.</Link>
            </Message>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
