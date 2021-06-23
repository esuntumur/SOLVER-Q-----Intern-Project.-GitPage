// 'use strict';
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import { connect } from "react-redux";

import "./style.scss";
import {
  createQuestion,
  getQuestionsByPageNumber,
} from "../../../redux/actions/question";
import { setHtmlString, reqImageUrl } from "../../../redux/actions/commentAction";
MdEditor.use(HandleFullScreen);

// * ---------------- CLASS -----------------
export class QuestionEditor extends React.Component {
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
    //  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  }
  async submitHandler(event) {
    event.preventDefault();
    const payload = {
      questions: {
        title: event.target.title.value,
        question: this.props.htmlString,
      },
    };
    await this.props.createQuestion(payload);
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);

    console.log(`Logged Output ~ this.props`, this.props);
  }

  render() {
    console.log(this.props);
    return (
      <div id="createQuestion">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <div className="form-group">
              <label className="sr-only">Title</label>{" "}
              <input
                type="text"
                className="form-control"
                required
                placeholder="Title"
                name="title"
              />
            </div>
            <div className="form-group">
              <label className="sr-only">Question details</label>
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
            </div>
            <button type="submit" className="btn text-center btn-blue">
              Post Question
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

const mapDispatchToProps = {
  setHtmlString,
  reqImageUrl,
  createQuestion,
  getQuestionsByPageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditor);
