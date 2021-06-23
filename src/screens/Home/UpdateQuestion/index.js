import React, { Component } from "react";
import "./style.scss";
import { updateQuestion } from "../../../redux/actions/question";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";

import { setHtmlString, reqImageUrl } from "../../../redux/actions/commentAction";
MdEditor.use(HandleFullScreen);

class UpdateQuestion extends Component {
  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt(/* Markdown-it options */);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  async onImageUpload(e, callback) {
    await this.props.reqImageUrl(e);
    await callback(this.props.imageUrl);
  }

  handleEditorChange({ html }) {
    console.log("html: ", typeof html);
    this.props.setHtmlString(html);
  }
  submitHandler(event) {
    event.preventDefault();
    const { selectedQuestion } = this.props;
    const payload = {
      id: selectedQuestion.id,
      params: {
        questions: {
          title: event.target.title.value,
          question: this.props.htmlString,
        },
      },
      backFromSelectedQuestion: this.props.backFromSelectedQuestion,
    };
    this.props.updateQuestion(payload);
    // this.props.backFromSelectedQuestion();
  }
  render() {
    return (
      <div id="updateQuestion">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <h4>UPDATE YOUR QUESTION HERE!!!</h4>
            <div className="form-group">
              {" "}
              <label className="sr-only">Update your Title!!!</label>{" "}
              <input
                type="text"
                className="form-control"
                required
                placeholder="Title"
                name="title"
              />{" "}
            </div>
            <div className="form-group">
              {" "}
              <label className="sr-only">Update your Question details!!!</label>{" "}
              <div style={{ height: "22.5rem", width: "58.5rem" }} className="mdEditor">
                <MdEditor
                  onImageUpload={this.onImageUpload}
                  renderHTML={(text) => this.mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  style={{
                    height: "22.5rem",
                  }}
                  ref={this.mdEditor}
                />
              </div>
            </div>{" "}
            <button type="submit" className="btn text-center btn-blue">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(`redux state`, state);
  return {
    imageUrl: state.question.imageUrl,
    htmlString: state.question.htmlString,
    selectedQuestion: state.question.selectedQuestion,
    currentPageQuestion: state.question.currentPageQuestion,
  };
};
export default connect(mapStateToProps, {
  updateQuestion,
  setHtmlString,
  reqImageUrl,
})(UpdateQuestion);
