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
    if(! this.props.app.state.username)
      return (
        <div className="Welcome">
          Welcome <b className="Username">Guest</b>
        </div>
      );

    return (
      <div className="Welcome">
        Welcome <b className="Username">{this.props.app.state.username}</b> -&nbsp;
        <span className="Action" onClick={() => {this.props.app.setState({ username: ""}); return true; }}>Logout</span>
      </div>
    );
  }
}

export default Menu;
