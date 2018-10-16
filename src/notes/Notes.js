import React, { Component } from "react";
import Edit from "../edit/Edit";
import Menu from "../menu/Menu";
import Note from "../note/Note";
import "./Notes.css";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: null };
  }

  edit(note) {
    this.setState({ edit: note ? note : true });
  }

  render() {
    const { app } = this.props;
    const { edit } = this.state;
    const { notes } = app.state;

    return (
      <header className="AppHeader">
        <Menu
          app={app}
          edit={() => {
            this.edit();
          }}
          notes={this}
        />
        {notes.map(note => {
          return (
            <Note
              app={app}
              edit={() => {
                this.edit(note);
              }}
              key={note.id}
              note={note}
            />
          );
        })}
        {edit ? <Edit note={edit} notes={this} /> : null}
        <div className="Credits">
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/smashicons" title="Share" target="_blank" rel="noopener noreferrer">
            Share
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
            target="_blank"
            rel="noopener noreferrer">
            CC 3.0 BY
          </a>
        </div>
      </header>
    );
  }
}

export default Notes;
