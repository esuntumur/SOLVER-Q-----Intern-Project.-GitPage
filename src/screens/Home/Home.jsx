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
  updateQuestion,
} from "../../redux/actions/question";
import ReactPaginate from "react-paginate";

import QuestionEditor from "./CreateQuestion/QuestionEditor";
import UpdateQuestion from "./UpdateQuestion/index";
import CommentList from "./CommentList";
import "./home.scss";
// import "./logo192.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.asyncVoteSelectedQuestion = this.asyncVoteSelectedQuestion.bind(this);
    this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
    this.searchOrderHandler = this.searchOrderHandler.bind(this);
  }
  componentWillMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  componentDidMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  async searchSubmitHandler(event) {
    event.preventDefault();
    await this.props.searchQuestion(
      event.target.searchValue.value,
      event.target.order.value
    );
    // await this.props.setSelectedQuestion(i);
  }

  async searchOrderHandler(orderType) {
    await this.props.searchQuestion(this.props.searchValue, orderType);
  }

  async asyncVoteSelectedQuestion(i, user_id) {
    await this.props.voteSelectedQuestion(i, user_id);
  }

  blurBackground() {
    const divTC = document.getElementById("blur")
    divTC.classList.toggle("big-container")
  }

  blurLogo() {
    const divATT = document.getElementById("blur").getAttribute("class")
    if (divATT == "container-fluid") {
      document.getElementById("blur").setAttribute("class", "container-fluid")
    } else {
      document.getElementById("blur").removeAttribute("class")
      document.getElementById("blur").setAttribute("class", "container-fluid")
    }
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
    const user_name = localStorage.getItem("user_name");
    let pageNum = [];

    for (let i = 1; i <= maxPageQuestion; i++) {
      pageNum.push(i);
    }
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
              this.blurBackground();
            }}
          >
            <i className="fa fa-plus plus-icon"></i>
          </button>
          {/* CREATE QUESTION -> FORM */}
          {this.props.renderCreateQuestion && <QuestionEditor />}
        </div>
        <div className="container-fluid" id="blur">
          <div className="row d-flex">
            {/*//*------------------NAVIGATION BAR------------------- */}
            <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
              <div className="container-fluid">
                {/* LOGO */}
                <button
                  className="navbar-brand btn"
                  onClick={() => {
                    backFromSelectedQuestion();
                    getQuestionsByPageNumber(1);
                    this.blurLogo();
                  }}
                  id="logo">
                  <img src="./logo192.png" alt="Logo" width="50" height="50" />
                </button>
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
                      <form
                        className="d-flex form-horizontal"
                        onSubmit={this.searchSubmitHandler}
                      >
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search..."
                          aria-label="Search"
                          name="searchValue"
                        />
                        <input type="hidden" name="order" value={1} />
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
                        <p className="dropdown-header text-dark"><b>{user_name}</b></p>
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
                      <h3 className="card-title">
                        <b>{selectedQuestion.title}</b>
                      </h3>
                      <div className="card-text row align-items-center">
                        <div className="col-auto">
                          <span className="text-secondary">
                            {selectedQuestion.votes.length}{" "}
                          </span>
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
                                console.log("deleteSelectedQuestion");
                                deleteSelectedQuestion(selectedQuestion);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn q-del-up"
                              onClick={() => {
                                console.log("updateQuestionToggle");
                                updateQuestionToggle();
                              }}
                            >
                              Update
                            </button>
                            {renderUpdateQuestion ? <UpdateQuestion /> : null}  
                          </div>  
                          ):(
                            <span className="col-auto">
                              {selectedQuestion &&
                              selectedQuestion.votes &&
                              !selectedQuestion.votes.includes(user_id) ? (
                                <div>
                                  <button
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
                  {/* //* DELETE, UPDATE QUESTION BUTTON */}
                  <button
                    onClick={() => {
                      deleteSelectedQuestion(selectedQuestion);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      updateQuestionToggle();
                    }}
                  >
                    Update
                  </button>
                  {renderUpdateQuestion ? <UpdateQuestion /> : null}

                  {/*  aa */}
                  <div className="ms-5 me-5 mt-5">
                    <div className="ms-3"><hr /></div>
                    <h5 className="mt-5 ms-3">Add a comment:</h5>
                    <div className="mt-3">
                      <CommentList
                        selectedQuestion={selectedQuestion}
                        user_id={user_id}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // ! ----АСУУЛТУУДЫН ЖАГСААЛТ--------------
                <div>
                  {/* //* --------Question Order-------- */}
                  {this.props.renderOrderButton && (
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Button group with nested dropdown"
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.searchOrderHandler(1);
                        }}
                      >
                        Votes
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.searchOrderHandler(3);
                        }}
                      >
                        Answers
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.searchOrderHandler(4);
                        }}
                      >
                        Dates
                      </button>
                    </div>
                  )}
                  {/* //*----------questions list------ */}
                  {questions &&
                    questions.length > 0 &&
                    questions.map((i, idx) => (
                      <div key={idx}>
                        <div className="card-group shadow p-5 m-5 border rounded">
                          <div className="col-sm-2">
                            <div className="card text-center">
                              <div className="card-body">
                                <div className="card-text">
                                  <span>{i.votes.length} </span>
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
                                      <ReactTooltip
                                        id="heart-tip"
                                        place="bottom"
                                        effect="solid"
                                      >
                                        Unvote
                                      </ReactTooltip>
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
                                <div
                                  className="questionStyle card-body"
                                  dangerouslySetInnerHTML={{
                                    __html: i.question,
                                  }}
                                ></div>
                                <p className="card-text">
                                  {/* {i.question.substring(0, 300)} */}
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
                    ))}
                </div>
              )}
              {/*  ----------Pagination---------------- */}
              {!selectedQuestion && (
                <nav aria-label="Page navigation example">
                  <div>
                    <ul className="pagination justify-content-center">
                      {currentPageQuestion >= 2 ? (
                        <li className="page-item">
                          <button
                            type="button"
                            className="btn pg-btn"
                            onClick={() =>
                              getQuestionsByPageNumber(--currentPageQuestion)
                            }
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>{" "}
                        </li>
                      ) : (
                        <button className="btn btn-dark pg-btn" disabled>
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      )}

                      {pageNum &&
                        pageNum.length > 0 &&
                        pageNum.map((number, idx) => (
                          <li key={idx} className="page-item">
                            <button
                              className="page-link pg-btn"
                              onClick={() => {
                                getQuestionsByPageNumber(number);
                              }}
                            >
                              {number}
                            </button>
                          </li>
                        ))}
                      {currentPageQuestion >= maxPageQuestion ? null : (
                        <li className="page-item">
                          <button
                            type="button"
                            className="btn pg-btn"
                            onClick={() =>
                              getQuestionsByPageNumber(++currentPageQuestion)
                            }
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </nav>
              )}
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
    searchValue: state.question.searchValue,
    renderOrderButton: state.question.renderOrderButton,
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
