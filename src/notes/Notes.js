import React, { Component } from "react";
import Menu from "../menu/Menu";
import "./Notes.css";
import logo from "../logo.svg";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header className="AppHeader">
        <Menu app={this.props.app} />
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Credits">
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Share"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC 3.0 BY
          </a>
        </div>
      </header>
    );
  }
}

export default Notes;
