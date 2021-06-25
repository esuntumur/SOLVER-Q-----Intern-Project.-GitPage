import React from "react";
import UpdateQuestion from "../UpdateQuestion";
import CommentList from "../CommentList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default function QuestionDetails(props) {
  const {
    selectedQuestion,
    user_id,
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
            {selectedQuestion.user.id == user_id ? (
              <div className="col-auto">
                {/* //* DELETE, UPDATE QUESTION BUTTON */}
                <button
                  className="btn q-del-up"
                  onClick={() => {
                    deleteSelectedQuestion(selectedQuestion);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn q-del-up"
                  onClick={() => {
                    updateQuestionToggle();
                  }}
                >
                  Update
                </button>
                {renderUpdateQuestion ? <UpdateQuestion /> : null}
              </div>
            ) : (
              <span className="col-auto">
                {selectedQuestion &&
                selectedQuestion.votes &&
                !selectedQuestion.votes.includes(user_id) ? (
                  <div>
                    <button
                      className="btn q-vote-btn"
                      onClick={(e) => {
                        asyncVoteSelectedQuestion(selectedQuestion, user_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faHeartBroken} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn q-vote-btn"
                      onClick={(e) => {
                        asyncVoteSelectedQuestion(selectedQuestion, user_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>
                )}
              </span>
            )}
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
        <div className="ms-3">
          <hr />
        </div>
        <h5 className="mt-5 ms-3">Add a comment:</h5>
        <div className="mt-3">
          <CommentList selectedQuestion={selectedQuestion} user_id={user_id} />
        </div>
      </div>
    </div>
  );
}
