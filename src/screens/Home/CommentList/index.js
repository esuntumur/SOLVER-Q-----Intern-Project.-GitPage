import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import UpdateComment from "./UpdateComment/index";
import {
  getCommentsByPageNumber,
  voteComment,
  createComment,
  deleteComment,
  updateComment,
  updateCommentToggle,
} from "../../../redux/actions/commentAction";
import CommentEditor from "./CommentEditor";
import "./commentList.scss";

export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
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

  async createCommentAsync(event) {
    event.preventDefault();
    // event.target.myFile.value
    console.log(`Logged Output ~ event`, event);
    console.log(`Logged Output ~ event.target.myFile.value`, event.target.myFile.value);
    // await this.props.createComment(this.props.selectedQuestion, event.target.answer.value);
    // await this.props.getCommentsByPageNumber(
    //   this.props.selectedQuestion,
    //   this.props.currentPageComment
    // );
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
  async updateCommentAsync(event) {
    // await this.props.updateComment(comment);
    // await this.props.getCommentsByPageNumber(
    //   this.props.selectedQuestion,
    //   this.props.currentPageComment
    // );
  }
  render() {
    const { getCommentsByPageNumber, comments, updateCommentToggle } = this.props;
    let {
      currentPageComment,
      maxPageComment,
      selectedQuestion,
      user_id,
      selectedCommentId,
    } = this.props;

    user_id *= 1;

    return (
      <div>
        {/* //* Create COMMENT */}
        <link
          rel="stylesheet"
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          type="text/css"
        />
        {/* //* Create COMMENT */}
        <CommentEditor />
        {/* //* Comment LIST */}
        <div className="mt-5">
          <h4>
            <b>Comments:</b>
          </h4>
          {comments &&
            comments.length > 0 &&
            comments.map((comment, idx) => (
              <div className="card mb-4" key={idx}>
                <div className="card-group shadow p-5 m-3 border rounded">
                  {/* //* Comment -> VOTE, count && user name, profile */}
                  <div className="col-1">
                    <div className="card text-center">
                      <div className="card-body">
                        <div className="card-text">
                          <span>{comment.votes.length} </span>
                          {comment.votes.length >= 2 ? "votes" : "vote"}
                          <div>
                            {/* //* VOTE Comment */}
                            {!comment.votes.includes(user_id) ? (
                              <div>
                                <ReactTooltip
                                  id="heart-o-tip-comment"
                                  place="bottom"
                                  effect="solid"
                                >
                                  Vote this comment
                                </ReactTooltip>
                                <button
                                  data-tip
                                  data-for="heart-o-tip-comment"
                                  className="btn c-vote-btn"
                                  onClick={() => {
                                    this.voteCommentAsync.bind(this)(comment);
                                  }}
                                >
                                  <i className="fa fa-heart-o"></i>
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn c-vote-btn"
                                onClick={() => {
                                  this.voteCommentAsync.bind(this)(comment);
                                }}
                              >
                                <i className="fa fa-heart"></i>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    {/* //* Comment -> Answer TEXT */}
                    <div className="card">
                      <div className="card-body">
                        <div
                          className="comment"
                          dangerouslySetInnerHTML={{ __html: comment.answer }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="card align-items-end">
                      {/* //* Comment -> Delete, Update -> buttons */}
                      {comment.user.id === user_id && (
                        <div>
                          <div className="row">
                            <button
                              className="rounded btn shadow"
                              type="button"
                              onClick={() => {
                                this.deleteCommentAsync.bind(this)(comment);
                              }}
                            >
                              Delete
                            </button>{" "}
                          </div>
                          <br />
                          <div className="row">
                            {" "}
                            <button
                              className="rounded btn shadow"
                              type="button"
                              onClick={() => {
                                updateCommentToggle(comment.id);
                              }}
                            >
                              Update
                            </button>{" "}
                            <div className="d-flex">
                              {selectedCommentId === comment.id ? (
                                <UpdateComment selectedCommentId={selectedCommentId} />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* //* comment PAGINATION - prev, next buttons  */}
        <div className="text-center">
          <div className="flex btn-group btn-group-toggle pg-buttons">
            {currentPageComment >= 2 ? (
              <button
                className="btn btn-dark pg-btn-prev"
                onClick={() => {
                  getCommentsByPageNumber(selectedQuestion, --currentPageComment);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            ) : null}
               
            <button type="button" className="btn btn-secondary" disabled>
              {currentPageComment} 
            </button>
             
            {currentPageComment >= maxPageComment ? null : (
              <button
                className="btn btn-dark pg-btn-next"
                onClick={() => {
                  getCommentsByPageNumber(
                    this.props.selectedQuestion,
                    ++currentPageComment
                  );
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.question.comments,
    maxPageComment: state.question.maxPageComment,
    currentPageComment: state.question.currentPageComment,
    selectedCommentId: state.question.selectedCommentId,
  };
};

let mapDispatchToProps = {
  getCommentsByPageNumber,
  voteComment,
  createComment,
  deleteComment,
  updateComment,
  updateCommentToggle,
};
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
