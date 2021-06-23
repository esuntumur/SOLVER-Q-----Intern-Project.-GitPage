// 'use strict';
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import {
  reqImageUrl,
  createComment,
  setHtmlString,
  getCommentsByPageNumber,
} from "../../../redux/actions/commentAction";
import { connect } from "react-redux";
import "./commentList.scss";
// MdEditor.use(HandleFullScreen);

// * ---------------- CLASS
export class CommentEditor extends React.Component {
  mdParser = null;

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
    this.props.setHtmlString(html);
  }
  async postComment(e) {
    e.preventDefault();

    await this.props.createComment(this.props.htmlString, this.props.selectedQuestion);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }

  render() {
    return (
      <div id="createComment">
        <div className="form-bg">
          <form className="form" onSubmit={this.postComment.bind(this)}>
            <div className="form-group">
              {/* <label className="sr-only">Question details</label> */}
              <div style={{ height: "400px" }}>
                <MdEditor
                  onImageUpload={this.onImageUpload}
                  renderHTML={(text) => this.mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  style={{
                    height: "400px",
                  }}
                  ref={this.mdEditor}
                />

              </div>
            </div>
            <button className="btn btn-lg mt-3 comment-post-btn" type="submit">
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imageUrl: state.question.imageUrl,
    htmlString: state.question.htmlString,
    selectedQuestion: state.question.selectedQuestion,
    currentPageComment: state.question.currentPageComment,
  };
};
// selectedQuestion, ;

const mapDispatchToProps = {
  reqImageUrl,
  setHtmlString,
  createComment,
  getCommentsByPageNumber,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);
