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
  getsendComment(event) {
    event.preventDefault();
    this.props.sendComment(this.props.selectedQuestion, event.target.answer.value);
  }
  render() {
    const { comments, deleteComment, updateComment } = this.props;
    let { currentPageComment, maxPageComment } = this.props;
    return (
      <div>
        {/* EDITOR */}
        <form onSubmit={this.getsendComment.bind(this)} className="row mt-5">
          <div className="col-2"> Comment: </div>
          <div className="col-9">
            <input type="text" name="answer" className="w-100 " />
          </div>
          <div className="col-1">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
            
        </form>
        <h3>Comment list</h3>
        {comments.map((comment, idx) => (
          <div className="card mb-4" key={idx}>
            <div className="row">
              <div className="col-1">
                <div className="row">
                  <img src="..." alt="..." />
                </div>
                <div className="row">
                  {/* // TODO BACK comment.votes=[] bhgv */}
                  {/* {!comment.votes.includes(user_id) ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => voteComment(selectedQuestion, comment, user_id)}
                    >
                      Vote
                    </button>
                  ) : (
                    <button className="btn btn-primary" disabled>
                      Voted
                    </button>
                  )} */}
                </div>
                {/* //TODO => BACK comments deer votes[] nemeheer */}
                <div className="row">Votes: {comment.votes.length}</div>
              </div>

              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{comment.answer}</h5>
                  comment id: {comment.id}      comment user: {comment.user.id} 
                  {comment.user.username} <br />
                  <br />
                </div>
              </div>
              <div className="col-3">
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
        <div className="d-flex justify-content-center">
          {currentPageComment >= 2 ? (
            <button onClick={() => getCommentsByPageNumber(--currentPageComment)}>
              previous
            </button>
          ) : null}
             
          {currentPageComment}  
          {currentPageComment >= maxPageComment ? null : (
            <button onClick={() => getCommentsByPageNumber(++currentPageComment)}>
              next
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.question.comments,
    maxPageComment: state.question.maxPageComment,
    currentPageComment: state.question.maxPageComment,
  };
};

const mapDispatchToProps = {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
};
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
