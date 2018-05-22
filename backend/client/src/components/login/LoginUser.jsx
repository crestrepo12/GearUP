import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';

class LoginUser extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      message: "",
      loggedIn: false
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

    const {
      email,
      password,
      message,
      loggedIn
    } = this.state;

    axios
      .get("/users/login", {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res);
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        console.log(err);
        if(email === '' && password === '') {
          this.setState({
            message: '* Fill out required fields'
          });
        } else {
          this.setState({
            email: '',
            password: '',
            message: '* Email / Password Incorrect'
          });
        }
      })
  }

  render() {
    const { email, password, message, loggedIn } = this.state;
    const { inputOnChange, submitLoginForm } = this;

    if(loggedIn) {
      return ( <Redirect to={Home} />)
    }
    return (
      <div className="login-page">
        <h1> Login Here </h1>
        <form>
          <input
            type="email"
            name="email"
            value="email"
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

          <p> {message} </p>
        </form>
      </div>
    );
  }
}

export default LoginUser;
