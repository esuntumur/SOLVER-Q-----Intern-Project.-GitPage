/* eslint-disable eqeqeq */
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentication";
import {
  getQuestionsByPageNumber,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  deleteSelectedQuestion,
  updateQuestionToggle,
  voteSelectedQuestion,
  searchQuestion,
} from "../../redux/actions/question";
import QuestionEditor from "./CreateQuestion/QuestionEditor";
import UpdateQuestion from "./UpdateQuestion/index";
import CommentList from "./CommentList";
import "./home.scss";
import "./logo192.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.asyncVoteSelectedQuestion = this.asyncVoteSelectedQuestion.bind(this);
  }
  componentWillMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  componentDidMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  async searchSubmitHandler(event) {
    event.preventDefault();
    await this.props.searchQuestion(event.target.search.value);
    // await this.props.setSelectedQuestion(i);
  }
  async asyncVoteSelectedQuestion(i, user_id) {
    await this.props.voteSelectedQuestion(i, user_id);
    // await this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }

  render() {
    const {
      questions,
      logoutUser,
      backFromSelectedQuestion,
      createQuestionToggle,
      deleteSelectedQuestion,
      updateQuestionToggle,
      renderUpdateQuestion,
      getQuestionsByPageNumber,
      voteSelectedQuestion,
    } = this.props;
    let { selectedQuestion, maxPageQuestion, currentPageQuestion } = this.props;

    const user_id = localStorage.getItem("user_id");
    const pageNum = [];

    for (let i = 1; i <= maxPageQuestion; i++) {
      pageNum.push(i);
    }
    // selectedQuestion.votes.includes(user_id);
    return (
      <div>
        <link
          rel="stylesheet"
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          type="text/css"
        />   

        {/* CREATE QUESTION -> BUTTON*/}    
        <div>
          <ReactTooltip id="createQtip" place="top" effect="solid">
            Create Question
          </ReactTooltip>
          <button
            data-tip
            data-for="createQtip"
            type="button"
            className="btn btn-lg btn-floating plus-btn rounded-circle shadow"
            onClick={() => {
              createQuestionToggle();
            }}
          >
            <i className="fa fa-plus plus-icon"></i>
          </button>
          {/* CREATE QUESTION -> FORM */}
          {this.props.renderCreateQuestion && (
            <CreateQuestion createQuestionToggle={createQuestionToggle} />
          )}
        </div>  

        <div className="container-fluid">
          <div className="row d-flex">
            {/*//*------------------NAVIGATION BAR------------------- */}
            <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
              <div className="container-fluid">
                {/* LOGO */}
                <a
                  className="navbar-brand link-dark"
                  href="/"
                  onClick={backFromSelectedQuestion}
                >
                  <img src="./logo192.png" alt="Logo" width="50" height="50" />
                </a>
                {/* NAVBAR TOGGLER IN MOBILE -> BUTTON */}
                <button
                  className="navbar-toggler toggler-btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <br />
                  {/*//*-----Search BAR------ */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <form className="d-flex form-horizontal">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search..."
                          aria-label="Search"
                        />
                        <button className="btn btn-sm search-btn" type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </form>
                    </li>
                  </ul>
                  <br />
                  {/* PROFILE -> DROPDOWN BUTTON */}
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item dropdown">
                      <button
                        className="navbar-brand btn dropdown-toggle profile rounded"
                        id="navbarDropdownMenu"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Profile
                      </button>
                      <div
                        className="dropdown-menu dropdown-menu-lg-end"
                        aria-labelledby="navbarDropdownMenu"
                      >
                        <p className="dropdown-item">User ID: {user_id}</p>
                        <div className="dropdown-divider"></div>
                        <button
                          className="btn dropdown-item"
                          onClick={() => {
                            logoutUser();
                          }}
                        >
                          Log Out
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>              

            {/*//*------------------BODY------------------- */}
            <div>
              {/* //! ---------------QUESTION Detail ХЭСЭГ--------------- */}
              {selectedQuestion.user ? (
                <div className="container-fluid">
                  <div className="card mt-5 ms-5 me-5">
                    <div className="card-body">
                      <h3 className="card-title"><b>{selectedQuestion.title}</b></h3>
                      <div className="card-text row align-items-center">
                        <div className="col-auto">
                          <span className="text-secondary">
                            {selectedQuestion.votes.length}{" "}
                          </span>
                          <span className="text-secondary">
                            {selectedQuestion.votes.length >= 2 ? "votes" : "vote"}
                          </span>
                        </div>
                        <span className="col-auto">
                          {selectedQuestion &&
                          selectedQuestion.votes &&
                          !selectedQuestion.votes.includes(user_id) ? (
                            <div>
                              <ReactTooltip id="heart-o-tip" place="right" effect="solid">
                                Vote
                              </ReactTooltip>
                              <button
                                data-tip
                                data-for="heart-o-tip"
                                className="btn q-vote-btn"
                                onClick={(e) => {
                                  this.asyncVoteSelectedQuestion(
                                    selectedQuestion,
                                    user_id
                                  );
                                }}
                              >
                                <i className="fa fa-heart-o"></i>
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button
                                data-tip
                                data-for="heart-tip"
                                className="btn q-vote-btn"
                                onClick={(e) => {
                                  this.asyncVoteSelectedQuestion(
                                    selectedQuestion,
                                    user_id
                                  );
                                }}
                              >
                                <i className="fa fa-heart"></i>
                              </button>
                            </div>
                          )}
                        </span>
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div className="card ms-5 me-5">
                    <div className="card-body">
                      {selectedQuestion.question}
                    </div>
                    <hr />
                    <div
                      className="comment"
                      dangerouslySetInnerHTML={{ __html: selectedQuestion.question }}
                    ></div>
                  </div>
                  {/*  aa */}
                  <div className="card-group shadow p-5 m-5 border"></div>
                </div>
              ) : (
                ""
              )}

              {selectedQuestion.user ? (
                <div className="container-fluid m-5">
                  <div className="d-flex align-items-center">
                    <h3 className="q-header">
                      <b>{selectedQuestion.title}</b>
                    </h3>
                  </div>
                  <div className="ms-5 me-5">
                    <h5 className="ms-3 mt-3">Add a comment:</h5>
                    <div className="ms-3 mt-3">
                      <CommentList selectedQuestion={selectedQuestion}
                                  user_id ={user_id}/>
                    </div>
                  </div>
                </div>
              ):(
                // ! ----АСУУЛТУУДЫН ЖАГСААЛТ--------------
                questions.map((i, idx) => (
                  <div key={idx}>
                    <div className="card-group shadow p-5 m-5 border rounded">
                      <div className="col-sm-2">
                        <div className="card text-center">
                          <div className="card-body">
                            <div className="card-text">
                              <span>{i.votes.length} </span>
                              {i.votes.length >= 2 ? "votes" : "vote"}
                              {i && i.votes && !i.votes.includes(user_id) ? (
                                <div>
                                  <ReactTooltip
                                    id="heart-o-tip"
                                    place="bottom"
                                    effect="solid"
                                  >
                                    Vote
                                  </ReactTooltip>
                                  <button
                                    data-tip
                                    data-for="heart-o-tip"
                                    className="btn q-vote-btn"
                                    onClick={(e) => {
                                      this.asyncVoteSelectedQuestion(i, user_id);
                                    }}
                                  >
                                    <i className="fa fa-heart-o"></i>
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <button
                                    data-tip
                                    data-for="heart-tip"
                                    className="btn q-vote-btn"
                                    onClick={(e) => {
                                      this.asyncVoteSelectedQuestion(i, user_id);
                                    }}
                                  >
                                    <i className="fa fa-heart"></i>
                                  </button>
                                </div>
                              )}
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
                            <h5
                              className="card-title"
                              onClick={() => this.props.setSelectedQuestion(i)}
                            >
                              <b>{i.title}</b>
                            </h5>
                            <p className="card-text">
                              {i.question.substring(0, 300)}
                              {i.question.length >= 300 ? " ..." : ""}
                            </p>
                            <p className="card-text text-end">
                              <i>by </i>
                              <b> {i.user.username}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {/*  ----------Pagination---------------- */}
              {!selectedQuestion.user ? (
                <div className="text-center">
                  <div
                    className="flex btn-group btn-group-toggle pg-buttons"
                    data-toggle="buttons"
                  >
                    {currentPageQuestion >= 2 ? (
                      <button
                        className="btn btn-dark pg-btn"
                        onClick={() => getQuestionsByPageNumber(--currentPageQuestion)}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    ) : null}
                       
                    <button type="button" className="btn btn-secondary" disabled>
                      {currentPageQuestion}
                    </button>
                    {currentPageQuestion >= maxPageQuestion ? null : (
                      <button
                        className="btn btn-dark"
                        onClick={() => getQuestionsByPageNumber(++currentPageQuestion)}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              <nav>
                <div>
                  <ul className="pagination justify-content-center">
                    <li>
                      <button
                        type="button"
                        className="btn pg-btn"
                        onClick={() => getQuestionsByPageNumber(--currentPageQuestion)}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    {pageNum.map((number) => (
                      <li key={number} className="page-item">
                        <button className="page-link pg-btn">{number}</button>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        className="btn pg-btn"
                        onClick={() => getQuestionsByPageNumber(++currentPageQuestion)}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    questions: state.question.questions,
    selectedQuestion: state.question.selectedQuestion,
    renderCreateQuestion: state.question.renderCreateQuestion,
    user: state.auth.user,
    renderUpdateQuestion: state.question.renderUpdateQuestion,
    maxPageQuestion: state.question.maxPageQuestion,
    currentPageQuestion: state.question.currentPageQuestion,
  };
};

const Container = connect(mapStateToProps, {
  logoutUser,
  getQuestionsByPageNumber,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  deleteSelectedQuestion,
  updateQuestionToggle,
  voteSelectedQuestion,
  searchQuestion,
})(Home);

export default Container;
