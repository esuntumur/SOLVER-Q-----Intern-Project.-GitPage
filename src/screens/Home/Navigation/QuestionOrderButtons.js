import React from "react";

function QuestionOrderButtons(props) {
  const { searchOrderHandler } = props;
  return (
    <div
      className="btn-group mt-4 ms-5"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      <button className="btn"
              disabled>
        <i>sort by</i>
      </button>
      <button
        className="btn me-4 rounded shadow-sm border"
        onClick={() => {
          searchOrderHandler(1);
        }}
      >
        Votes
      </button>
      <button
        className="btn me-4 rounded shadow-sm border"
        onClick={() => {
          searchOrderHandler(2);
        }}
      >
        Solved
      </button>
      <button
        className="btn rounded shadow-sm border"
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
