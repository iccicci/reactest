import React, { Component } from "react";
import ReactDOM from "react-dom";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import "./Edit.css";
import cancel from "./cancel.svg";
import save from "./save.svg";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.note instanceof Object ? this.props.note : { note: "" };
  }

  handleChange = event => {
    this.setState({ note: event.target.value });
  };

  componentDidMount() {
    this.setState();
  }

  render() {
    const { note } = this.state;

    return (
      <div className="Note NoteEdit">
        <div className="EditMenuContainer">
          <div className="EditMenu">
            <EditButton cmd="bold" />
            <EditButton cmd="italic" />
            <select className="Colors" style={{ backgroundColor: this.state.color }} value={this.state.color}>
              {["white", "yellow", "green", "red", "purple"].map(color => {
                return (
                  <option key={color} style={{ backgroundColor: color }}>
                    {color}
                  </option>
                );
              })}
            </select>
            <img className="Icon" src={save} alt="edit" />
            <img
              className="Icon"
              src={cancel}
              onClick={() => {
                this.props.notes.setState({ edit: null });
              }}
              alt="del"
            />
          </div>
        </div>
        <br />
        <ContentEditable
          className="Editor"
          html={note}
          disabled={false}
          onChange={this.handleChange}
          onBlur={this.sanitize}
          ref="editor"
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

  setState(state, callback) {
    super.setState(state, () => {
      if (callback) callback();
      ReactDOM.findDOMNode(this.refs.editor).focus();
    });
  }
}

class EditButton extends Component {
  render() {
    const { cmd } = this.props;

    return (
      <span
        className="Button EditButton"
        key={cmd}
        onMouseDown={event => {
          event.preventDefault();
          document.execCommand(cmd);
        }}>
        {cmd === "bold" ? <b>Bold</b> : <i>Italic</i>}
      </span>
    );
  }
}

export default Edit;
