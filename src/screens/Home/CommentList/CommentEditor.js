// 'use strict';
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import AudioPlugin from "./plugins/AudioPlugin";
import {
  reqImageUrl,
  createComment,
  setHtmlString,
  getCommentsByPageNumber,
  reqAudioUrl,
  setRenderAudioRecorder,
} from "../../../redux/actions/commentAction";
import { connect } from "react-redux";
import "./commentList.scss";
import Recorder from "./Recorder/index";
import "react-voice-recorder/dist/index.css";
import { ToastContainer, toast } from "react-toastify";
MdEditor.use(AudioPlugin);
MdEditor.use(HandleFullScreen);

// * ---------------- CLASS
export class CommentEditor extends React.Component {
  mdParser = null;
  constructor(props) {
    super(props);
    this.mdParser = new MarkdownIt(/* Markdown-it options */);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.success = this.success.bind(this);
    this.fail = this.fail.bind(this);
  }

  async onImageUpload(e, callback) {
    await this.props.reqImageUrl(e);
    await callback(this.props.imageUrl);
  }

  handleEditorChange({ html }) {
    this.props.setHtmlString(html);
  }
  success = () => toast("Your answer is successfully posted!");
  fail = () => toast("Answer needed at least title :))");
  async postComment(e) {
    e.preventDefault();
    if (this.props.htmlString.length > 7) {
      await this.props.createComment(this.props.htmlString, this.props.selectedQuestion, this.props.audioId, this.props.audioUrl);
      await this.props.getCommentsByPageNumber(this.props.selectedQuestion, this.props.currentPageComment);
      this.success();
    } else {
      this.fail();
    }
  }

  render() {
    return (
      <div id="createComment">
        <ToastContainer />
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
            {this.props.renderAudioRecorder && (
              <Recorder reqAudioUrl={this.props.reqAudioUrl} setRenderAudioRecorder={this.props.setRenderAudioRecorder} />
            )}
            {this.props.audioUrl && (
              <audio controls>
                <source src={this.props.audioUrl} type="audio/ogg" />
                Your browser does not support the audio element.
              </audio>
            )}
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
    renderAudioRecorder: state.question.renderAudioRecorder,
    audioUrl: state.question.audioUrl,
    audioId: state.question.audioId,
  };
};
// selectedQuestion, ;

const mapDispatchToProps = {
  reqImageUrl,
  setHtmlString,
  createComment,
  getCommentsByPageNumber,
  reqAudioUrl,
  setRenderAudioRecorder,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);
