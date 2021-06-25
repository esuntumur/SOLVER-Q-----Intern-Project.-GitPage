import "./login.scss";
import "../Home/home.scss";
import React from "react";
import { connect } from "react-redux";
import { loginUser, signupUser } from "../../redux/actions/authentication";
import QuestionPagination from "../Home/QuestionPagination";
import LoginQuestionList from "./LoginQuestionList";
import LoginQuestionDetails from "./LoginQuestionDetails";
import {
  getQuestionsByPageNumber,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  createProfileToggle,
  deleteSelectedQuestion,
  updateQuestionToggle,
  voteSelectedQuestion,
  searchQuestion,
  updateQuestion,
  getBackFromEditProfile
} from "../../redux/actions/question";
// email: "dannd@example.com",
// password: "238523a",

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }
  componentWillMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  componentDidMount() {
    this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    this.props.loginUser(payload);
  }

  handleSubmitSignUp(event) {
    event.preventDefault();
    const payload = {
      user: {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
      },
    };

    if (this.props.signupUser(payload)) console.log("sign up success");
    else console.log("sign up failed");
  }

  render() {
    const {
      questions,
      logoutUser,
      backFromSelectedQuestion,
      deleteSelectedQuestion,
      updateQuestionToggle,
      renderUpdateQuestion,
      getQuestionsByPageNumber,
    } = this.props;

    let { selectedQuestion, maxPageQuestion, currentPageQuestion } = this.props;
    console.log(questions)
    return (
      <div id="login">
        <div className="dropdown">
          <nav className="navbar navbar-expand-lg py-4 shadow rounded navbar-light bg-light">
            {/* LOGO */}
            <button
              className="navbar-brand btn ms-3"
              onClick={() => {
                backFromSelectedQuestion();
                getQuestionsByPageNumber(1);
              }}
              id="logo"
            >
              <img src="./logo192.png" alt="Logo" width="50" height="50" />
            </button>
            <p className="text-secondary navbar-brand mt-3">Log in to do more</p>
            <div className="ms-auto">
              {/* ---------------LOG-IN-------------- */}
              <button
                className="navbar-brand btn log-btn rounded"
                id="logInDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Log In
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="logInDropdown"
              >
                <button
                  className="btn dropdown-header"
                >
                  <form className="form" onSubmit={this.handleSubmit}>
                    <h4 className="form__title">Log In</h4>
                    {/* ---------------Email------------- */}
                    <div className="form_div">
                      <input type="text" className="form__input" placeholder=" " name="email" />
                      <label className="form__label">Email</label>
                    </div>
                    {/* ---------------Password--------------- */}
                    <div className="form_div">
                      <input
                        type="password"
                        className="form__input"
                        placeholder=" "
                        name="password"
                      />
                      <label className="form__label">Password</label>
                    </div>
                    {/* ---------------SUBMIT--------------- */}
                    <input type="submit" className="form__button mb-3" value="Login" />
                  </form>
                </button>              
              </div>

              {/* ---------------SIGN-UP-------------- */}
              <button
                className="navbar-brand btn log-btn rounded"
                id="signUpDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sign Up
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg-end"
                aria-labelledby="signUpDropdown"
              >
                <button
                  className="btn dropdown-header"
                >
                  <form className="form" onSubmit={this.handleSubmitSignUp}>
                    <h4 className="form__title">Sign Up</h4>
                    {/* ---------------username--------------- */}
                    <div className="form_div">
                      <input
                        type="text"
                        className="form__input"
                        placeholder=" "
                        name="username"
                      />
                      <label className="form__label">Username</label>
                    </div>
                    {/* ---------------Email------------- */}
                    <div className="form_div">
                      <input type="text" className="form__input" placeholder=" " name="email" />
                      <label className="form__label">Email</label>
                    </div>
                    {/* ---------------Password--------------- */}
                    <div className="form_div">
                      <input
                        type="password"
                        className="form__input"
                        placeholder=" "
                        name="password"
                      />
                      <label className="form__label">Password</label>
                    </div>

                    {/* ---------------SUBMIT--------------- */}
                    <input type="submit" className="form__button mb-3" value="Sign Up" />
                  </form>

                </button>              
              </div>  
            </div>         
          </nav>
      </div>
      {selectedQuestion ? (
        <LoginQuestionDetails
          selectedQuestion={selectedQuestion}
          deleteSelectedQuestion={deleteSelectedQuestion}
          updateQuestionToggle={updateQuestionToggle}
          renderUpdateQuestion={renderUpdateQuestion}
          asyncVoteSelectedQuestion={this.asyncVoteSelectedQuestion}
        />
      ): (
        <LoginQuestionList
          questions={questions}
          asyncVoteSelectedQuestion={this.asyncVoteSelectedQuestion}
          setSelectedQuestion={this.props.setSelectedQuestion}
        />
      )}
      {/*  ----------Pagination---------------- */}
      {!selectedQuestion && (
        <QuestionPagination
          currentPageQuestion={currentPageQuestion}
          getQuestionsByPageNumber={getQuestionsByPageNumber}
          maxPageQuestion={maxPageQuestion}
        />
      )}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.question.questions,
    selectedQuestion: state.question.selectedQuestion,
    renderCreateQuestion: state.question.renderCreateQuestion,
    renderProfile: state.question.renderProfile,
    user: state.auth.user,
    renderUpdateQuestion: state.question.renderUpdateQuestion,
    maxPageQuestion: state.question.maxPageQuestion,
    currentPageQuestion: state.question.currentPageQuestion,
    searchValue: state.question.searchValue,
    renderOrderButton: state.question.renderOrderButton,
  };
};

const Container = connect(mapStateToProps, 
  { loginUser, 
    signupUser, 
    getQuestionsByPageNumber,
    setSelectedQuestion,
    backFromSelectedQuestion,
    createQuestionToggle,
    createProfileToggle,
    deleteSelectedQuestion,
    updateQuestionToggle,
    voteSelectedQuestion,
    searchQuestion,
    updateQuestion,
    getBackFromEditProfile}
  )(Login);

export default Container;
