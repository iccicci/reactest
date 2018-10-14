import React, { Component } from 'react';
import Login from './login/Login';
import Menu from './menu/Menu';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { connected: false, username: "" };
  }

  componentDidMount() {
    this.socket = window.io();

    this.socket.on("connect", () => {
      this.socket.emit("data", {42: 23 });
    });

    this.socket.on("connect",    () => { this.setState({ connected: true  }) });
    this.socket.on("disconnect", () => { this.setState({ connected: false }) });
  }

  render() {
    const { connected, username } = this.state;

    return (
      <div className="App">
        { connected ?
          username ?
            <header className="App-header">
              <Menu app={this} newNote={username ? () => console.log("sisi") : () => console.log("nono")} />
              <img src={logo} className="App-logo" alt="logo" />
              <img src={logo} className="App-logo" alt="logo" />
              <img src={logo} className="App-logo" alt="logo" />
              <div className="Credits">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Share" target="_blank" rel="noopener noreferrer">Share</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
            </header>
          :
          <header className="App-header">
            <Login app={this} />
          </header>
        :
          <header className="App-header">
            Error connecting to server; still retrying...
          </header>
        }
      </div>
    );
  }
}

export default App;
