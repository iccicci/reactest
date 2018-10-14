import React, { Component } from "react";
import add from "./Add.svg";
import "./Menu.css";

class Add extends Component {
  render() {
    return (
      <img
        src={add}
        className="Add"
        alt="add note"
        onClick={() => this.props.newNote()}
      />
    );
  }
}

class Menu extends Component {
  render() {
    const { app, newNote } = this.props;

    return (
      <div className="Menu">
        <Add newNote={newNote} />
        <Welcome app={app} />
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    const app = this.props.app;
    const username = app.state.username;

    return (
      <div className="Welcome">
        Welcome <b className="Username">{username ? username : "Guest"}</b>
        {username ? (
          <span>
            {" "}
            -{" "}
            <span
              className="Action"
              onClick={() => {
                app.setState({ username: "" });
              }}
            >
              Logout
            </span>
          </span>
        ) : null}
      </div>
    );
  }
}

export default Menu;
