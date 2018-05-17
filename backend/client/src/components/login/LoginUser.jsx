import React, { Component } from "react";

class LoginUser extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  inputOnChange = e => {
    console.log("input: ", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password, message } = this.state;

    const { inputOnChange } = this;
    return (
      <div className="login-page">
        <h1> Login Here </h1>
        <form>
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default LoginUser;
