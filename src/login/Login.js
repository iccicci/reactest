import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: 2, username: "" };
  }

  keyPressed(event) {
    if (event.key === "Enter") this.login();
  }

  login() {
    const app = this.props.app;
    const { error, username } = this.state;

    if (error) return;

    app.setState({ username: username }, () => app.login());
  }

  render() {
    const { error, username } = this.state;
    const style = error ? { backgroundColor: "gray" } : {};

    return (
      <div className="Login">
        Username:{" "}
        <input
          autoFocus
          onChange={event => this.updateUsername(event)}
          onKeyPress={event => this.keyPressed(event)}
          placeholder="your username"
          type="text"
          value={username}
        />
        <br />
        <br />
        <div>
          <span className="Button LoginButton" onClick={() => this.login()} style={style}>
            Login
          </span>
        </div>
        <br />
        <div className="Error">
          &nbsp;
          {error ? (error === 1 ? "Allowed caracters: 0-9,A-Z,a-z" : "Minimum 3 characters") : ""}
        </div>
      </div>
    );
  }

  updateUsername(event) {
    var error = 0;
    const username = event.target.value;

    if (username.length < 3) error = 2;
    else if (!username.match(/^[0-9a-z]*$/i)) error = 1;

    this.setState({ error: error, username: username });
  }
}

export default Login;
