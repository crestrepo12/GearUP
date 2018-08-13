import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Header,
  Message
} from "semantic-ui-react";

class LoginUser extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      message: "",
      guestLogin: null
    };
  }

  inputOnChange = e => {
    console.log("input: ", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitLoginForm = e => {
    e.preventDefault();

    const { email, password, message } = this.state;

    axios
      .post("/users/login", {
        email: email,
        password: password
      })
      .then(res => {
        var user = res.data.user;
        this.props.handleLoginChange(user);
      })
      .catch(err => {
        console.log(err);
        if ((email === "" || email === undefined) 
            && (password === "" || email === undefined)) {
          this.setState({
            message: "Fill out required fields"
          });
        } else {
          this.setState({
            email: "",
            password: "",
            message: "Email / Password Incorrect"
          });
        }
      });
  };

  handleGuestLogin = e => {
    e.preventDefault();

    const { email, password, message } = this.state;

    axios
      .post("/users/login", {
        email: "ca@mail.com",
        password: "testpass"
      })
      .then(res => {
        var user = res.data.user;
        this.props.handleLoginChange(user);
      })
      .catch(err => {
        console.log(err);
        if (email === ""  && password === "") {
          this.setState({
            message: "Fill out required fields"
          });
        } else {
          this.setState({
            email: "",
            password: "",
            message: "Email / Password Incorrect"
          });
        }
      });
  };

  render() {
    const { email, password, message } = this.state;
    const { inputOnChange, submitLoginForm, handleGuestLogin } = this;

    return (
      <div id="login-page" className="full-width full-height margin-top">
        <div className="login-container">
          <Header as="h1" className="center">
            {" "}
            Log in to your account{" "}
          </Header>
          {message ? <Message color="yellow" content={message} /> : ""}
          <Form size="large" onSubmit={submitLoginForm} className="column form">
            <Form.Input
              type="email"
              name="email"
              value={email}
              label="Email address"
              aria-label="Email address"
              onChange={inputOnChange}
              fluid
            />
            <Form.Input
              type="password"
              name="password"
              value={password}
              label="Password"
              aria-label="Password"
              onChange={inputOnChange}
              fluid
            />
            <Button type="submit"> Login </Button>
            <br />
            <Button
              type="button"
              value="Guest Login"
              onClick={handleGuestLogin}
            >  Demo Login
            </Button>
          </Form>
          <br />
          <div>
            <Message className="center">
              New to GearUp? {" "}
              <Link to="/register">Register here.</Link>
            </Message>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUser;
