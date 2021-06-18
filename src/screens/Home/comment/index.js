import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAllComments,
  voteComment,
  sendComment,
} from "../../../redux/actions/commentAction";

export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getAllComments(this.props.selectedQuestion);
  }
  componentDidMount() {
    this.props.getAllComments(this.props.selectedQuestion);
  }
  getsendComment(event) {
    event.preventDefault();
    this.props.sendComment(this.props.selectedQuestion, event.target.answer.value);
  }
  render() {
    const { comments, voteComment, selectedQuestion, sendComment, user_id } = this.props;
    console.log(`Logged Output ~ comments`, comments);
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
                  {/* // TODO BACK comment.votes=[]  */}
                  {!comment.votes.includes(user_id) ? (
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
                  )}
                </div>
                <div className="row">Votes: {comment.votes.length}</div>
              </div>

              <div className="col-11">
                <div className="card-body">
                  <h5 className="card-title">{comment.answer}</h5>
                  comment id: {comment.id}      comment user: {comment.user.id} 
                  {comment.user.username} <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { comments: state.question.comments };
};

const mapDispatchToProps = { getAllComments, voteComment, sendComment };
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
