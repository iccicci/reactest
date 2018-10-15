import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import "./Edit.css";
import cancel from "./cancel.svg";
import save from "./save.svg";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.note instanceof Object ? this.props.note : {};
  }

  handleChange = event => {
    this.setState({ note: event.target.value });
  };

  render() {
    const { note } = this.state;
    console.log(note);

    return (
      <div className="Note NoteEdit">
        <div className="EditMenuContainer">
          <div className="EditMenu">
            <img className="Icon" src={save} alt="edit" />
            <img
              className="Icon"
              src={cancel}
              onClick={() => {
                this.del();
              }}
              alt="del"
            />
          </div>
        </div>
        <br />
        <ContentEditable
          className="Editor"
          html={note} // innerHTML of the editable div
          disabled={false} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          onBlur={this.sanitize}
        />
      </div>
    );
  }

  sanitize = () => {
    this.setState({
      note: sanitizeHtml(this.state.note, {
        allowedTags: ["b", "br", "div", "em", "i", "p", "strong"]
      })
    });
  };
}

export default Edit;
