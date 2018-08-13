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
      confirm_password,
      message
    } = this.state;

    if(firstname.length < 3 || firstname === undefined) {
      this.setState({
        message: "First name is required"
      })
      return;
    }

    if(lastname.length < 3 || lastname === undefined) {
      this.setState({
        message: "Last name is required"
      })
      return;
    }

    if (password.length < 8 || password === undefined) {
      this.setState({
        message: "Password should be longer than 8 characters"
      })
      return;
    } else if (password !== confirm_password) {
      this.setState({
        message: "Passwords do not match"
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
      confirm_password,
      message
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
            {message ? <Message color="yellow" content={message} /> : ""}
            <Form.Input
              type="text"
              name="firstname"
              label="First name"
              aria-label="First name"
              onChange={inputOnChange}
              fluid
            />
            <Form.Input
              type="text"
              name="lastname"
              label="Last name"
              aria-label="Last name"
              onChange={inputOnChange}
              fluid
            />
            <Form.Input
              type="email"
              name="email"
              label="Email address"
              aria-label="Email address"
              onChange={inputOnChange}
              fluid
            />
            <Form.Input
              type="password"
              name="password"
              label="Password"
              aria-label="Password"
              onChange={inputOnChange}
              fluid
            />
            <Form.Input
              type="password"
              name="confirm_password"
              label="Confirm Password"
              aria-label="Confirm Password"
              onChange={inputOnChange}
              fluid
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
