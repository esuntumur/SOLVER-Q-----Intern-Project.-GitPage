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
} from "../../redux/actions/question";
import CreateQuestion from "./CreateQuestion/index";
import UpdateQuestion from "./UpdateQuestion/index";
import CommentList from "./CommentList";
import "./home.scss";
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
          <div className="row d-flex justify-content-center ">
            {/*//*------------------NAVIGATION BAR------------------- */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
              <div className="container-fluid">
                {/* LOGO NAME -> HOME */}
                <a className="navbar-brand" href="/">
                  Home Page + logo
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
                    {/* CREATE QUESTION -> BUTTON*/}
                    <li className="nav-item">
                      <button
                        onClick={() => {
                          createQuestionToggle();
                          notifyCreateQuestion();
                        }}
                        className="btn btn-primary"
                      >
                        Create question
                      </button>
                      <ToastContainer />
                      {/* CREATE QUESTION -> FORM */}
                      {this.props.renderCreateQuestion && (
                        <CreateQuestion createQuestionToggle={createQuestionToggle} />
                      )}
                    </li>

                    {/* PROFILE -> DROPDOWN BUTTON */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Profile
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          <button
                            onClick={() => {
                              logoutUser();
                            }}
                            className="btn btn-primary"
                          >
                            гарах
                          </button>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <p>user_id: {user_id}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/*//*------------------BODY------------------- */}
            <div className="col-10">
              {/* ---------------АСУУЛТЫН ДЭЛГЭРЭНГҮЙ ХЭСЭГ--------------- */}
              {selectedQuestion.user ? (
                <div>
                  <h3>Question details</h3>
                  {/*  ----------VOTE Question BUTTON---------------- */}
                  {/* // TODO -votes = []  */}
                  {user_id != selectedQuestion.user.id ? (
                    <button
                      onClick={(e) => {
                        voteSelectedQuestion(selectedQuestion, user_id);
                      }}
                    >
                      {"VOTE"}
                    </button>
                  ) : null}
                  {user_id != selectedQuestion.user.id ? (
                    !selectedQuestion.votes.includes(user_id) ? (
                      <button
                        onClick={(e) => {
                          voteSelectedQuestion(selectedQuestion, user_id);
                        }}
                      >
                        {"VOTE"}
                      </button>
                    ) : (
                      <button disabled>{"VOTED"}</button>
                    )
                  ) : null}
                  {/*  ----------QUESTION DESCRIPTION SECTION---------------- */}
                  <br />
                  selectedQuestion.id: {selectedQuestion.id}, <br />
                  votes: {selectedQuestion.votes.length} <br />
                  title: {selectedQuestion.title} user_id: {selectedQuestion.user.id}{" "}
                  <br />
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
                  <div className="card card-hover border-success mb-5 " key={idx}>
                    <div className="row">
                      <div className="col-1">
                        <div className="row">Votes: {i.votes.length}</div>
                        <div className="row">{i.state}</div>
                        <div className="row">{i.user.username}</div>
                      </div>
                      <div className="col-11">
                        <h5
                          className="card-header"
                          onClick={() => this.props.setSelectedQuestion(i)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Tooltip on top"
                        >
                          {i.title}
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
                <div className="d-flex justify-content-center">
                  {currentPageQuestion >= 2 ? (
                    <button
                      onClick={() => getQuestionsByPageNumber(--currentPageQuestion)}
                    >
                      previous
                    </button>
                  ) : null}
                     
                  {currentPageQuestion}  
                  {currentPageQuestion >= maxPageQuestion ? null : (
                    <button
                      onClick={() => getQuestionsByPageNumber(++currentPageQuestion)}
                    >
                      next
                    </button>
                  )}
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
})(Home);

export default Container;
