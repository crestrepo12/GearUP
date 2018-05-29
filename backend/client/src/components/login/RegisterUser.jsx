import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Home from "../Home";

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
      <div className="register-page">
        <h1> Register Here </h1>
        <form onSubmit={submitRegisterForm}>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            onChange={inputOnChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            onChange={inputOnChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={inputOnChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={inputOnChange}
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={inputOnChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default RegisterUser;
