import React, { Component } from 'react';
import Menu from './menu/Menu';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "io" };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Menu app={this} newNote={() => console.log("sisi")} />
          <div className="Credits">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Share" target="_blank" rel="noopener noreferrer">Share</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
