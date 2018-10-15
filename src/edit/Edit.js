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

    this.state = this.props.note instanceof Object ? this.props.note : {};
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

export default Edit;
