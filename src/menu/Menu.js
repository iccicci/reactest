import React, { Component } from 'react';
import add from './Add.svg';
import './Menu.css';

class Add extends Component {
  render() {
    return (
      <img src={add} className="Add" alt="add note" onClick={() => this.props.newNote()} />
    );
  }
}

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <Add newNote={this.props.newNote} />
        <Welcome app={this.props.app} />
      </div>
    );
  }
}

class Welcome extends Component {
  render() {
    let username = this.props.app.state.username;
    let usernameJSX = username ? <span> - <span className="Action" onClick={() => {this.props.app.setState({ username: ""}); return true; }}>Logout</span></span> : null;

    return (
      <div className="Welcome">
        Welcome <b className="Username">{username ? username : "Guest"}</b>
        {usernameJSX}
      </div>
    );
  }
}

export default Menu;
