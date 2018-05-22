import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

class RegisterUser extends Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      newEmployeeLogin: false,
      message: ""
    };
  }

  inputOnChange = e => {
    console.log("input: ", e.target.value);
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
      .post("/users/create_account",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        })
      .then(res => {
        this.setState({
          message: "account created",
        })

        axios
          .post("/users/login", {
            email: email,
            password: password
          })
          .then(res => {
            // redirect to user's profile
            this.setState({
              newEmployeeLogin: true
            });
          })
      .catch(err => {
            console.log(err);
            this.setState({
              message: "an error has occurred"
            });
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
      newEmployeeLogin
    } = this.state;

    const { 
      inputOnChange,
      submitRegisterForm
    } = this;

    // if(newEmployeeLogin) {
    //   console.log("new employee logged in");
    //   const { id } = match.params;
    //   return <Redirect to={`/employee/${id}`} />
    // }

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
