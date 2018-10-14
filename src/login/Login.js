import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { error: 2, username: "" };
  }

  login() {
    const app = this.props.app;
    const { error, username } = this.state;
    const data = { username: username };

    if(error)
      return;

    app.socket.emit("login", data);
    app.setState(data);
  }

  render() {
    const { error, username } = this.state;

    return (
      <div className="Login">
        Username: <input type="text" placeholder="your username" value={username} onChange={event => this.updateUsername(event)} /><br /><br />
        <div><span className="Button" onClick={() => this.login()}>Login</span></div><br />
        <div className="Error">&nbsp;
          {
            error ?
              error === 1 ?
                "Allowed caracters: 0-9,A-Z,a-z" :
                "Minimum 3 characters" :
              ""
          }
        </div>
      </div>
    );
  }

  updateUsername(event) {
    var error = 0;
    const username = event.target.value;

    if(username.length < 3)
      error = 2;
    else
      if(! username.match(/^[0-9a-z]*$/i))
        error = 1;

    this.setState({ error: error, username: username });
  }
}

export default Login;
