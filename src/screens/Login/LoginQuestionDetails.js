import React from "react";
import UpdateQuestion from "../Home/UpdateQuestion";
import CommentList from "../Home/CommentList";
import LoginCommentList from "./LoginCommentList";

export default function QuestionDetails(props) {
  const {
    selectedQuestion,
    deleteSelectedQuestion,
    updateQuestionToggle,
    renderUpdateQuestion,
    asyncVoteSelectedQuestion,
  } = props;
  return (
    <div className="container-fluid">
      <div className="card mt-5 ms-5 me-5">
        <div className="card-body">
          <h3 className="card-title">
            <b>{selectedQuestion.title}</b>
          </h3>
          <div className="card-text row align-items-center">
            <div className="col-auto">
              <span className="text-secondary">{selectedQuestion.votes.length} </span>
              <span className="text-secondary">
                {selectedQuestion.votes.length >= 2 ? "votes" : "vote"}
              </span>
            </div>
          </div>
          <hr />
        </div>
      </div>
      {/* //* Question Detail Body */}
      <div className="card ms-5 me-5">
        <div
          className="comment card-body"
          dangerouslySetInnerHTML={{ __html: selectedQuestion.question }}
        ></div>
      </div>
      {/*  aa */}
      <div className="ms-5 me-5 mt-5">
        <div className="mt-3">
          <LoginCommentList selectedQuestion={selectedQuestion} />
        </div>
      </div>
    </div>
  );
}
