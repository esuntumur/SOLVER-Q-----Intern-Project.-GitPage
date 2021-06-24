import React, { Component } from "react";
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
    let pageNum = [];
    for (let i = 1; i <= this.props.maxPageComment; i++) {
      pageNum.push(i);
    }
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
        <div>
          {comments.length > 0 ? (
            <div className="ms-3 me-3">
              <div>
                <hr />
              </div>
              <h4 className="mt-5">
                <b>Comments:</b>
              </h4>
            </div>
          ) : (
            <div className="ms-3 me-3">
              <div>
                <hr />
              </div>
              <div className="align-items-center">
                <h4 className="mt-5">
                  <b>Comments:</b>
                </h4>
                <div className="card mt-3 rounded">
                  <div className="card-body text-secondary">
                    Nothing to show. Please check back for updates.
                  </div>
                </div>
              </div>
            </div>
          )}
          {comments &&
            comments.length > 0 &&
            comments.map((comment, idx) => (
              <div className="card mb-4 ms-3 me-3" key={idx}>
                <div className="card-group shadow p-5 m-3 border rounded">
                  {/* //* Comment -> VOTE, count && user name, profile */}
                  <div className="col-sm-1">
                    <div className="card text-center">
                      <div className="card-body">
                        <div className="card-text">
                          <span>{comment.votes.length} </span>
                          {comment.votes.length >= 2 ? "votes" : "vote"}
                          <div>
                            {/* //* VOTE Comment */}
                            {!comment.votes.includes(user_id) ? (
                              <div>
                                <button
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
        {/* //* comment PAGINATION - prev, next buttons  222222222222222 */}
        {comments.length > 0 ? (
          <nav aria-label="Page navigation example">
            <div>
              <ul className="pagination justify-content-center">
                {currentPageComment >= 2 ? (
                  <li className="page-item">
                    <button
                      type="button"
                      className="btn pg-btn"
                      onClick={() =>
                        getCommentsByPageNumber(
                          this.props.selectedQuestion,
                          --currentPageComment
                        )
                      }
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>{" "}
                  </li>
                ) : (
                  <button className="btn btn-dark pg-btn" disabled>
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                )}

                {pageNum &&
                  pageNum.length > 0 &&
                  pageNum.map((number, idx) => (
                    <li key={idx} className="page-item">
                      <button
                        className="page-link pg-btn"
                        onClick={() => {
                          getCommentsByPageNumber(this.props.selectedQuestion, number);
                        }}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                {currentPageComment >= maxPageComment ? null : (
                  <li className="page-item">
                    <button
                      type="button"
                      className="btn pg-btn"
                      onClick={() =>
                        getCommentsByPageNumber(
                          this.props.selectedQuestion,
                          ++currentPageComment
                        )
                      }
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        ) : null}
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
