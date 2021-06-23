import React, { Component } from "react";
import { connect } from "react-redux";
import HandleFullScreen from "./plugins/HandleFullScreen";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import MyCounterA from "./plugins/MyCounterA";
import MyCounterB from "./plugins/MyCounterB";
import "react-markdown-editor-lite/lib/index.css";
import {
  updateCommentToggle,
  reqImageUrl,
  setHtmlString,
  updateComment,
} from "../../../../redux/actions/commentAction";
import "./updateComment.scss";
// MdEditor.use(MyCounterA, {
//   start: 2,
// });
// MdEditor.use(MyCounterB, {
//   start: 3,
// });
// MdEditor.use(HandleFullScreen);

export class UpdateComment extends Component {
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
  async submitHandler(event) {
    event.preventDefault();
    const payload = {
      answer: this.props.htmlString,
      commentId: this.props.selectedCommentId,
    };
    await this.props.updateComment(payload);
    await this.props.updateCommentToggle(this.props.selectedCommentId);
  }
  render() {
    return (
      <div id="updateComment">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <div className="form-group">
              <label className="sr-only">Question details</label>
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
            <button type="submit" className="btn text-center btn-blue">
              Update
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
const mapDispatchToProps = {
  updateCommentToggle,
  updateComment,
  reqImageUrl,
  setHtmlString,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComment);
