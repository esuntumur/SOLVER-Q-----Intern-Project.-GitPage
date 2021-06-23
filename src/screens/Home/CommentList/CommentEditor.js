// 'use strict';
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import AudioPlugin from "./plugins/AudioPlugin";
import MyCounterB from "./plugins/MyCounterB";
import {
  reqImageUrl,
  createComment,
  setHtmlString,
  getCommentsByPageNumber,
} from "../../../redux/actions/commentAction";
import { connect } from "react-redux";
import "./commentList.scss";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
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
    this.handleAudioStop = this.handleAudioStop.bind(this);
    this.handleAudioUpload = this.handleAudioUpload.bind(this);
    this.handleRest = this.handleRest.bind(this);
    this.state = {
      audioDetails: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: null,
          m: null,
          s: null,
        },
      },
    };
  }
  handleAudioStop(data) {
    console.log(data);
    this.setState({ audioDetails: data });
  }
  handleAudioUpload(file) {
    console.log(file);
  }
  handleRest() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      },
    };
    this.setState({ audioDetails: reset });
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
              <label className="sr-only">Comment Editor</label>
              <div style={{ height: "400px" }}>
                <MdEditor
                  onImageUpload={this.onImageUpload}
                  renderHTML={(text) => this.mdParser.render(text)}
                  onChange={this.handleEditorChange}
                  style={{
                    height: "300px",
                  }}
                  ref={this.mdEditor}
                />

                <hr />
              </div>
            </div>
            <Recorder
              record={true}
              title={"New recording"}
              audioURL={this.state.audioDetails.url}
              showUIAudio
              handleAudioStop={(data) => this.handleAudioStop(data)}
              handleOnChange={(value) => this.handleOnChange(value, "firstname")}
              handleAudioUpload={(data) => this.handleAudioUpload(data)}
              handleRest={() => this.handleRest()}
            />
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
