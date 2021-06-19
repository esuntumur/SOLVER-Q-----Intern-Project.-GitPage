import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
} from "../../../redux/actions/commentAction";

export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    console.log(
      `Logged Output ~ this.props.selectedQuestion`,
      this.props.selectedQuestion
    );
    this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  componentDidMount() {
    this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }

  async getsendComment(event) {
    event.preventDefault();
    await this.props.sendComment(this.props.selectedQuestion, event.target.answer.value);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async voteCommentAsync(
    comment,
    user_id,
    getCommentsByPageNumber,
    selectedQuestion,
    currentPageComment
  ) {
    await this.props.voteComment(comment, user_id, getCommentsByPageNumber);
    await getCommentsByPageNumber(selectedQuestion, currentPageComment);
  }
  render() {
    const {
      getCommentsByPageNumber,
      comments,
      deleteComment,
      updateComment,
      voteComment,
    } = this.props;
    let { currentPageComment, maxPageComment, selectedQuestion, user_id } = this.props;
    user_id *= 1;
    return (
      <div>
        {/* //* Create COMMENT */}
        <form onSubmit={this.getsendComment.bind(this)} className="row mt-5">
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
                        this.voteCommentAsync.bind(this)(
                          comment,
                          user_id,
                          getCommentsByPageNumber,
                          selectedQuestion,
                          currentPageComment
                        );
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
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{comment.answer}</h5>

                  <br />
                  <br />
                </div>
              </div>
              <div className="col-2">
                <div className="row">
                  <button onClick={deleteComment}>Delete</button>{" "}
                </div>
                <div className="row">
                  {" "}
                  <button onClick={updateComment}>Update</button>{" "}
                </div>
              </div>
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
  };
};

let mapDispatchToProps = {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
};
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
