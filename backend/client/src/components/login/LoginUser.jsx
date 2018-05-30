import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Home from "../Home";

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
        console.log("res loginpage: => ", res)
        var user = res.data.user;
        console.log("loginpage user:", user)
        this.props.handleLoginChange(user);
      })
      .catch(err => {
        console.log(err);
        if (email === "" && password === "") {
          this.setState({
            message: "* Fill out required fields"
          });
        } else {
          this.setState({
            email: "",
            password: "",
            message: "* Email / Password Incorrect"
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
        if (email === "" && password === "") {
          this.setState({
            message: "* Fill out required fields"
          });
        } else {
          this.setState({
            email: "",
            password: "",
            message: "* Email / Password Incorrect"
          });
        }
      });
  }

  render() {
    const { email, password, message } = this.state;
    const { inputOnChange, submitLoginForm, handleGuestLogin } = this;

    return (
      <div className="login-page">
        <h1> Login Here </h1>
        <form onSubmit={submitLoginForm}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={inputOnChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={inputOnChange}
          />
          <input type="submit" value="Submit" />
        </form>
          <input type="button" value="Guest Login" onClick={handleGuestLogin}/>
        <p> {message} </p>
      </div>
    );
  }
}

export default LoginUser;
