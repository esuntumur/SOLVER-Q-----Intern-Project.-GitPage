import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateComment from "./UpdateComment";
import {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
  updateCommentToggle,
} from "../../../redux/actions/commentAction";

export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
    console.log(
      `Logged Output ~ this.props.selectedQuestion`,
      this.props.selectedQuestion
    );
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async componentDidMount() {
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }

  async sendCommentAsync(event) {
    event.preventDefault();
    await this.props.sendComment(this.props.selectedQuestion, event.target.answer.value);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async voteCommentAsync(comment) {
    await this.props.voteComment(
      comment,
      this.props.user_id,
      this.props.getCommentsByPageNumber
    );
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async deleteCommentAsync(comment) {
    await this.props.deleteComment(comment);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async updateCommentAsync(comment) {
    await this.props.updateComment(comment);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  render() {
    const { getCommentsByPageNumber, comments, updateCommentToggle } = this.props;
    let {
      currentPageComment,
      maxPageComment,
      selectedQuestion,
      user_id,
      renderUpdateCommentForm,
    } = this.props;
    user_id *= 1;
    return (
      <div>
        {/* //* Create COMMENT */}
        <form onSubmit={this.sendCommentAsync.bind(this)} className="row mt-5">
          <div className="col-2"> Comment: </div>
          <div className="col-9">
            <input type="text" name="answer" className="w-100 " />
          </div>
          <div className="col-1">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </form>

        {/* //* Comment LIST */}
        <h3>Comment list</h3>
        {comments.map((comment, idx) => (
          <div className="card mb-4" key={idx}>
            <div className="row">
              {/* //* Comment -> VOTE, count && user name, profile */}
              <div className="col-2">
                <div className="row">
                  <img src="..." alt="..." />
                  {comment.user.username} 
                </div>

                {/* //* VOTE Comment */}
                <div className="row">
                  {!comment.votes.includes(user_id) ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.voteCommentAsync.bind(this)(comment);
                      }}
                    >
                      Vote
                    </button>
                  ) : (
                    <button className="btn btn-primary" disabled>
                      Voted
                    </button>
                  )}
                </div>
                <div className="row">Votes: {comment.votes.length}</div>
              </div>

              {/* //* Comment -> Answer TEXT */}
              <div className="col">
                <div className="card-body">
                  <h5 className="card-title">{comment.answer}</h5>

                  <br />
                  <br />
                </div>
              </div>

              {/* //* Comment -> Delete, Update -> buttons */}
              {comment.user.id === user_id && (
                <div className="col-2">
                  <div className="row">
                    <button
                      onClick={() => {
                        this.deleteCommentAsync.bind(this)(comment);
                      }}
                    >
                      Delete
                    </button>{" "}
                  </div>
                  <div className="row ">
                    {" "}
                    <button
                      onClick={() => {
                        updateCommentToggle();
                      }}
                    >
                      Update
                    </button>{" "}
                    <div className="d-flex">
                      {renderUpdateCommentForm ? <UpdateComment /> : null}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* //* comment PAGINATION - prev, next buttons  */}
        <div className="d-flex justify-content-center">
          {currentPageComment >= 2 ? (
            <button
              onClick={() => {
                getCommentsByPageNumber(selectedQuestion, --currentPageComment);
                console.log("previous clicked comment");
              }}
            >
              previous
            </button>
          ) : null}
             
          {currentPageComment}  
          {currentPageComment >= maxPageComment ? null : (
            <button
              onClick={() => {
                getCommentsByPageNumber(
                  this.props.selectedQuestion,
                  ++currentPageComment
                );
                console.log("next clicked comment");
              }}
            >
              next
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(`Logged Output ~ state`, state);

  return {
    comments: state.question.comments,
    maxPageComment: state.question.maxPageComment,
    currentPageComment: state.question.currentPageComment,
    renderUpdateCommentForm: state.question.renderUpdateCommentForm,
  };
};

let mapDispatchToProps = {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
  updateCommentToggle,
};
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
