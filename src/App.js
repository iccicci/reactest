import React, { Component } from "react";
import Login from "./login/Login";
import Notes from "./notes/Notes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { connected: false, username: "" };
  }

  componentDidMount() {
    this.socket = window.io();

    this.socket.on("connect", () => {
      if (this.state.username) this.login();
      this.setState({ connected: true });
    });

    this.socket.on("disconnect", () => {
      this.setState({ connected: false });
    });
  }

  login() {
    this.socket.emit("login", { username: this.state.username });
  }

  logout() {
    this.socket.emit("logout", {});
    this.setState({ username: "" });
  }

  render() {
    const { connected, username } = this.state;

    return (
      <div className="App">
        <header className="AppHeader">
          {connected ? (
            username ? (
              <Notes app={this} />
            ) : (
              <Login app={this} />
            )
          ) : (
            "Error connecting to server; still retrying..."
          )}
        </header>
      </div>
    );
  }
}

export default App;
