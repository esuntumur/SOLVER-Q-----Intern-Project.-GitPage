import React from "react";

export default function QuestionList(props) {
  const { questions, asyncVoteSelectedQuestion, setSelectedQuestion } = props;
  return questions.map((i, idx) => (
    <div key={idx}>
      <div className="row card-group shadow p-5 m-5 border rounded">
        <div className="col-sm-2">
          <div className="card text-center">
            <div className="card-body">
              <div className="card-text">
                <span>{i.votes.length} </span>
                {i.votes.length >= 2 ? "votes" : "vote"}
              </div>
              <hr />
              <p className="card-text">
                <span>{i.comments} </span>
                {i.comments >= 2 ? "answers" : "answer"}
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-10">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" onClick={() => setSelectedQuestion(i)}>
                <b>{i.title}</b>
              </h5>
              {i.question.length > 300 ? (
                <div>
                  <div
                    className="questionStyle card-text"
                    dangerouslySetInnerHTML={{
                      __html: i.question.substring(0, 300) + "...",
                    }}
                  ></div>
                </div>
              ): (
                <div>
                  <div
                    className="questionStyle card-text"
                    dangerouslySetInnerHTML={{
                      __html: i.question.substring(0, 300),
                    }}
                  ></div>
                </div>
              )}
              <p className="card-text text-end">
                <i>by </i>
                <b> {i.user.username}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}
