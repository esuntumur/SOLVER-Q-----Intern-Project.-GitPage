/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import CreateQuestion from "./CreateQuestion/index";
import UpdateQuestion from "./UpdateQuestion/index";
import CommentList from "./CommentList";
import "./home.scss";
import "./logo192.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  componentDidMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
    console.log("questions", this.props.questions);
  }
  async searchSubmitHandler(event) {
    event.preventDefault();
    await this.props.searchQuestion(event.target.search.value);
    // await this.props.setSelectedQuestion(i);
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
      voteSelectedQuestion,
      getQuestionsByPageNumber,
    } = this.props;
    const notifyCreateQuestion = () => toast("create question form!");
    let { selectedQuestion, maxPageQuestion, currentPageQuestion } = this.props;
    const user_id = localStorage.getItem("user_id");
    // selectedQuestion.votes.includes(user_id);
    console.log(
      `Logged Output ~ selectedQuestion`
      // selectedQuestion.votes.includes(user_id)
    );

    console.log("questions ", questions);
    console.log(" selectedQuestion.user ", selectedQuestion.user);
    console.log("questions ", questions.length > 0);
    return (
      <div>
        <div className="container-fluid">
          <div className="row d-flex">
            {/*//*------------------NAVIGATION BAR------------------- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                {/* LOGO NAME -> HOME */}
                <a className="navbar-brand" href="/">
                  <img className="navbar-logo" src="./logo192.png" alt="" width="30" height="30"/>
                  NAME
                </a>
                {/* NAV TOGGLER in Mobile -> BUTTON */}
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul className="navbar-nav">
                    {/* HOME */}
                    <li className="nav-item">
                      <a className="nav-link" href="/">Home</a>
                    </li>
                    {/* PROFILE -> DROPDOWN BUTTON */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        Profile
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink">
                        <p className="dropdown-item">User ID: {user_id}</p>
                        <div className="dropdown-divider"></div>
                        <button
                          onClick={() => {
                            logoutUser();
                          }}
                          className="btn btn-primary dropdown-item"
                        >
                          Log out
                        </button>                     
                      </div>
                    </li>
                    {/* CREATE QUESTION -> BUTTON*/}
                    <li className="nav-item">
                      <a className="nav-link"
                        onClick={() => {
                          createQuestionToggle();
                          notifyCreateQuestion();
                        }}
                      >
                        Create question
                      </a>
                      <ToastContainer />
                      {/* CREATE QUESTION -> FORM */}
                      {this.props.renderCreateQuestion && (
                        <CreateQuestion createQuestionToggle={createQuestionToggle} />
                      )}
                    </li>
                    <li className="nav-item">
                      <form className="form-inline navbar-form">
                        <input className="form-control mr-sm-2 navbar-input" 
                              type="search" 
                              placeholder="Search..." 
                              aria-label="Search"/>
                      </form>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/*//*------------------Search BAR------------------- */}
            <form
              className="d-flex w-75 justify-content-center mt-4 mb-3"
              onSubmit={this.searchSubmitHandler.bind(this)}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/*//*------------------BODY------------------- */}
            <div>
              {/* ---------------АСУУЛТЫН ДЭЛГЭРЭНГҮЙ ХЭСЭГ--------------- */}
              {selectedQuestion.user ? (
                <div className="q-details">
                  <h3 className="q-header">Question details</h3>
                  {/*  ----------QUESTION DESCRIPTION SECTION---------------- */}
                  <br />
                  <b>Question ID:</b> {selectedQuestion.id}<br />
                  <b>Votes:</b>{selectedQuestion.votes.length} <br />
                  <b>Title:</b> {selectedQuestion.title} <br />
                  <b>User ID:</b> {selectedQuestion.user.id}{" "}
                  <br />
                  {/*  ----------VOTE Question BUTTON---------------- */}
                  {user_id != selectedQuestion.user.id ? (
                    !selectedQuestion.votes.includes(user_id) ? (
                      <button
                        className="btn btn-info btn-sm"
                        onClick={(e) => {
                          voteSelectedQuestion(selectedQuestion, user_id);
                        }}
                      >
                        {"VOTE"}
                      </button>
                    ) : (
                      <button className="btn btn-info btn-sm" disabled>{"VOTED"}</button>
                    )
                  ) : null}
                  {/*  ----------DELETE Question BUTTON---------------- */}
                  {user_id == selectedQuestion.user.id && (
                    <button
                      onClick={() => {
                        deleteSelectedQuestion(selectedQuestion);
                        backFromSelectedQuestion();
                      }}
                    >
                      {"Delete this question "}
                    </button>
                  )}
                  {/*  ----------update Question BUTTON---------------- */}
                  {user_id == selectedQuestion.user.id && (
                    <button onClick={updateQuestionToggle}>
                      {"Update this question "}
                    </button>
                  )}
                  {/*  ----------BACK BUTTON---------------- */}
                  <button onClick={backFromSelectedQuestion}>{"Back"}</button>
                  {/*  ----------update Question FORM---------------- */}
                  {renderUpdateQuestion ? (
                    <UpdateQuestion
                      selectedQuestion={selectedQuestion}
                      backFromSelectedQuestion={backFromSelectedQuestion}
                    />
                  ) : null}
                  {/*  ----------COMMENT LIST SECTION,  SUBMIT EDITOR---------------- */}
                  {<CommentList selectedQuestion={selectedQuestion} user_id={user_id} />}
                </div>
              ) : (
                // * ----АСУУЛТУУДЫН ЖАГСААЛТ--------------
                // questions &&
                //   questions.length > 0 &&
                questions.map((i, idx) => (
                  <div className="questions-container">
                    <div className="card card-hover mb-5 rounded" key={idx}>
                      <div className="card-group">
                        <div className="col-sm-2">
                          <div className="card text-white bg-dark">
                            <div className="card-body">
                              {i.votes.length} votes
                              <br/>
                              {i.state}
                              <br/>
                              {i.user.username}
                            </div>
                          </div>
                        </div>
                        <div className="card bg-light">
                          <h5
                            className="card-header"
                            onClick={() => this.props.setSelectedQuestion(i)}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Tooltip on top"
                          >
                            <b>{i.title}</b>
                          </h5>
                          <div className="card-body">
                            <p className="card-text">{i.question}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {!selectedQuestion.user ? (
                <div className="text-center">
                  <div className="flex btn-group btn-group-toggle pg-buttons"
                      data-toggle="buttons">
                    {currentPageQuestion >= 2 ? (
                      <button
                        className="btn btn-secondary pg-btn"
                        onClick={() => getQuestionsByPageNumber(--currentPageQuestion)}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    ) : null}
                       
                    <button 
                      type="button"
                      className="btn btn-secondary"
                      disabled>
                        {currentPageQuestion}
                    </button>

                    {currentPageQuestion >= maxPageQuestion ? null : (
                      <button
                        className="btn btn-secondary"
                        onClick={() => getQuestionsByPageNumber(++currentPageQuestion)}
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(`Logged Output ~ state`, state);

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