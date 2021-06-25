import React from "react";

export default function QuestionPagination(props) {
  let { currentPageQuestion, getQuestionsByPageNumber, maxPageQuestion } = props;
  let pageNum = [];

  for (let i = 1; i <= maxPageQuestion; i++) {
    pageNum.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <div>
        <ul className="pagination justify-content-center">
          {currentPageQuestion >= 2 ? (
            <li className="page-item">
              <button
                type="button"
                className="btn pg-button"
                onClick={() => getQuestionsByPageNumber(--currentPageQuestion)}
              >
                <span aria-hidden="true"><b>&laquo;</b></span>
              </button>{" "}
            </li>
          ) : (
            <li className="page-item">
              <button
                type="button"
                className="btn"
                disabled
              >
                <span aria-hidden="true">&laquo;</span>
              </button>{" "}
            </li>
          )}

          {pageNum &&
            pageNum.length > 0 &&
            pageNum.map((number, idx) => (
              <li key={idx} className="page-item">
                <button
                  className="page-link pg-button rounded"
                  onClick={() => {
                    getQuestionsByPageNumber(number);
                  }}
                  id={number}
                >
                  {number}
                </button>
              </li>
            ))}
          {currentPageQuestion >= maxPageQuestion ? (
            <button type="button" className="btn" disabled>
              <span aria-hidden="true">&raquo;</span>
            </button>
          ) : (
            <li className="page-item">
              <button
                type="button"
                className="btn pg-button"
                onClick={() => getQuestionsByPageNumber(++currentPageQuestion)}
              >
                <span aria-hidden="true"><b>&raquo;</b></span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
