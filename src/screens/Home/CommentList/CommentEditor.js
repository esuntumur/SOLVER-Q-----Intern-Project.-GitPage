// 'use strict';
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import MyCounterA from "./plugins/MyCounterA";
import MyCounterB from "./plugins/MyCounterB";
import {
  reqImageUrl,
  createComment,
  setHtmlString,
} from "../../../redux/actions/commentAction";
import { connect } from "react-redux";
import "./commentList.scss";
MdEditor.use(MyCounterA, {
  start: 2,
});
MdEditor.use(MyCounterB, {
  start: 3,
});
MdEditor.use(HandleFullScreen);

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
  // handleEditorChange({ html, md }) {
  //   console.log("handleEditorChange", html, md);
  // }
  handleEditorChange({ html, md, text }) {
    console.log("html: ", typeof html);
    this.props.setHtmlString(html);

    //  return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  }
  postComment() {
    this.props.createComment(this.props.htmlString, this.props.selectedQuestion);
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ height: "350px" }}>
        <MdEditor
          onImageUpload={this.onImageUpload}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
          style={{
            height: "300px",
          }}
          ref={this.mdEditor}
        />
        <button className="btn btn-lg mt-3 comment-post-btn"
          onClick={this.postComment.bind(this)}>
          Post
        </button>
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
  };
};

const mapDispatchToProps = {
  reqImageUrl,
  setHtmlString,
  createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);
