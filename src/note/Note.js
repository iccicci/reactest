import React, { Component } from "react";
import "./Note.css";
import del from "./del.svg";
import edit from "./edit.svg";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { note: props.note };
  }

  del() {
    this.props.app.socket.emit("del", { id: this.props.note.id });
  }

  render() {
    return (
      <div className="Note">
        {this.state.note.note}
        <br />
        <img className="Icon" src={edit} alt="edit" />
        <img
          className="Icon"
          src={del}
          onClick={() => {
            this.del();
          }}
          alt="del"
        />
      </div>
    );
  }
}

export default Note;
