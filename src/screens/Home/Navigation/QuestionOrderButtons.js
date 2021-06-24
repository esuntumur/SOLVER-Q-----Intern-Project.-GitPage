import React from "react";

function QuestionOrderButtons(props) {
  const { searchOrderHandler } = props;
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      <button
        className="btn btn-primary"
        onClick={() => {
          searchOrderHandler(1);
        }}
      >
        Votes
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          searchOrderHandler(2);
        }}
      >
        Solved
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          searchOrderHandler(3);
        }}
      >
        Answers
      </button>
    </div>
  );
}

QuestionOrderButtons.propTypes = {};

export default QuestionOrderButtons;
