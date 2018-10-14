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
        onClick={() => console.log(this.props.app)}
      />
    );
  }
}

class Menu extends Component {
  render() {
    const { app } = this.props;

    return (
      <div className="Menu">
        <Add app={app} />
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
        <br />
        <br />
        <span
          className="Button MenuButton"
          onClick={() => {
            app.logout();
          }}
        >
          Logout
        </span>
      </div>
    );
  }
}

export default Menu;
