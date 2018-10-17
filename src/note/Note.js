import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import "./Note.css";
import del from "./del.svg";
import edit from "./edit.svg";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = props.note;
  }

  del() {
    this.props.app.socket.emit("del", { id: this.props.note.id });
  }

  render() {
    const { color, note } = this.state;

    return (
      <div className="Note NoteView" style={{ backgroundColor: color }}>
        <ContentEditable html={note} disabled={true} />
        <br />
        <img
          className="Icon"
          alt="edit"
          onClick={() => {
            this.props.edit(note);
          }}
          src={edit}
        />
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
