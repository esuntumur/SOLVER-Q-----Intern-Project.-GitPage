/* eslint-disable eqeqeq */
import React, { Component } from "react";
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
                <a className="navbar-brand navbar-name" href="/">
                  <img
                    className="navbar-logo"
                    src="./logo192.png"
                    alt=""
                    width="30"
                    height="30"
                  />
                  SOLVER
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
                      <a className="nav-link" href="/">
                        Home
                      </a>
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
                        aria-expanded="false"
                      >
                        Profile
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
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
                      <a
                          className="nav-link"
                          onClick={() => {
                            createQuestionToggle();
                          }}
                        >
                          Create question
                      </a>
                      {/* CREATE QUESTION -> FORM */}
                      {this.props.renderCreateQuestion && (
                        <CreateQuestion createQuestionToggle={createQuestionToggle} />
                      )}
                    </li>
                    {/*//*-----Search BAR------ */}
                    <li className="nav-item">
                      <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" type='text/css'/>
                      <form
                        className="form-inline from-control d-flex w-75 justify-content-center navbar-form"
                        onSubmit={this.searchSubmitHandler.bind(this)}
                      >
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          name="search"
                        />
                        <button className="btn btn-sm form-button" type="submit">
                          <i className="fa fa-search"></i>
                        </button>
                      </form>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/*//*------------------BODY------------------- */}
            <div>
              <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" type='text/css'/>
              {/* ---------------АСУУЛТЫН ДЭЛГЭРЭНГҮЙ ХЭСЭГ--------------- */}
              {selectedQuestion.user ? (
                <div>
                  <div className="d-flex align-items-center">
                    <h3 className="q-header"><b>{selectedQuestion.title}</b></h3>
                    {/*  ----------BACK BUTTON---------------- */}
                    <button 
                      className="btn btn-info btn-sm back-button"
                      onClick={backFromSelectedQuestion}>{"Back"}</button>
                  </div>
                  <div className="flex align-items-start flex-column">
                  {/*  ----------QUESTION DESCRIPTION SECTION---------------- */}
                    <div className="d-flex align-items-start">
                      <div className="d-flex align-items-center flex-column mb-3 q-button">
                        {/*  ----------VOTE Question BUTTON---------------- */}
                        {user_id != selectedQuestion.user.id ? (
                          !selectedQuestion.votes.includes(user_id) ? (
                            <button
                              className="btn btn-lg"
                              onClick={(e) => {
                                voteSelectedQuestion(selectedQuestion, user_id);
                              }}
                            >
                              <i className="fa fa-chevron-up"></i>
                            </button>
                          ) : (
                            <button 
                              className="btn btn-lg" 
                              disabled>
                              <i className="fa fa-chevron-up"></i>
                            </button>
                          )
                        ) : null}
                        <button className="btn btn-lg">
                          <b>{selectedQuestion.votes.length}</b>
                        </button>
                        <button className="btn btn-lg">
                          <i className="fa fa-chevron-down"></i>
                        </button>
                      </div>
                      <div className="q-content">
                        {selectedQuestion.question}
                      </div>
                    </div>
                    <div className="q-comments">
                      {/*  ----------COMMENT LIST SECTION,  SUBMIT EDITOR---------------- */}
                      {<CommentList selectedQuestion={selectedQuestion} user_id={user_id} />}
                    </div>
                  </div>
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
                  {/*  ----------update Question FORM---------------- */}
                  {renderUpdateQuestion ? (
                    <UpdateQuestion
                      selectedQuestion={selectedQuestion}
                      backFromSelectedQuestion={backFromSelectedQuestion}
                    />
                  ) : null}
                </div>
              ) : (
                // * ----АСУУЛТУУДЫН ЖАГСААЛТ--------------
                // questions &&
                //   questions.length > 0 &&
                questions.map((i, idx) => (
                  <div className="questions-container">
                      <div className="card-group">
                      <div className="col-sm-2">
                        <div className="card text-white bg-dark">
                          <div className="card-body">
                            {i.votes.length} votes
                            <br/>
                            <br/>
                            {!i.votes.includes(user_id) ? (
                              <button
                                className="btn icon-brd"
                              >
                                <i className="fa fa-heart-o heart-icon"></i>
                              </button>
                            ) : (
                              <button className="btn icon-brd" disabled>
                                <i className="fa fa-heart heart-icon"> Voted</i>
                              </button>
                            )}
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
                ))
              )}
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
