import { getAllComments, voteComment } from "../../../redux/actions/commentAction";

import React, { Component } from "react";
import { connect } from "react-redux";

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
  render() {
    const { comments, voteComment, selectedQuestion } = this.props;
    // console.log(`Logged Output ~ comments`, comments);
    return (
      <div>
        <h3>Comment list</h3>
        {comments.map((comment, idx) => (
          <div className="card" key={idx}>
            <div className="card-header">{comment.answer}</div>
            <div className="card-body">
              comment id: {comment.id} <br /> comment author: {comment.author.username}{" "}
              <br />
              user_id : {comment.user_id} <br />
              votes : {comment.votes}
              <br />
              {/* // ! duusaagui -- back boloogv bga */}
              <button
                className="btn btn-primary"
                onClick={() => voteComment(selectedQuestion, comment)}
              >
                Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.comment.comments);

  return { comments: state.comment.comments };
};

const mapDispatchToProps = { getAllComments, voteComment };
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
