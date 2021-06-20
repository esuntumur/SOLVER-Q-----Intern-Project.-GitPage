import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCommentToggle, updateComment } from "../../../redux/actions/commentAction";
import "./updateComment.scss";
export class UpdateComment extends Component {
  async submitHandler(event) {
    event.preventDefault();
    const payload = {
      comments: {
        // question_id: event.target.comment.value,
        comment: event.target.comment.value,
      },
    };
    await this.props.updateComment(payload);
    await this.props.updateCommentToggle();
  }
  render() {
    return (
      <div id="updateComment">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <div className="form-group">
              {" "}
              <label className="sr-only">comment details</label>{" "}
              <textarea
                className="form-control"
                required
                rows={7}
                placeholder="comment details here!"
                name="comment"
              />{" "}
            </div>{" "}
            <button type="submit" className="btn text-center btn-blue">
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { updateCommentToggle, updateComment };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateComment);
