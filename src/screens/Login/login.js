import "./login.scss";
import "../Home/home.scss";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser, signupUser } from "../../redux/actions/authentication";
import { useForm } from "react-hook-form";
import SignUp from "./SignUp";
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
  getBackFromEditProfile,
} from "../../redux/actions/question";

export function Login(props) {
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    props.getQuestionsByPageNumber(props.currentPageQuestion);
  }

  useEffect(() => {
    setMounted(true);
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  console.log(watch());
  console.log(`Console.log  =>  ~ Login ~ errors`, errors);
  const loginSubmit = (data) => {
    console.log(`Console.log  =>  ~ loginSubmit ~ loginSubmit`);
    const payload = {
      email: data.email,
      password: data.password,
    };
    props.loginUser(payload);
  };

  const handleSubmitSignUp = (data) => {
    const payload = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };

    if (props.signupUser(payload)) console.log("sign up success");
    else console.log("sign up failed");
  };
  const {
    questions,
    logoutUser,
    backFromSelectedQuestion,
    deleteSelectedQuestion,
    updateQuestionToggle,
    renderUpdateQuestion,
    getQuestionsByPageNumber,
  } = props;

  let { selectedQuestion, maxPageQuestion, currentPageQuestion } = props;
  console.log(questions);
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
            <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="logInDropdown">
              <button className="btn dropdown-header">
                <form className="form" onSubmit={handleSubmit(loginSubmit)}>
                  <h4 className="form__title">Log In</h4>
                  {/* ---------------Email------------- */}
                  <div className="form_div">
                    <input
                      type="text"
                      className="form__input"
                      placeholder=" "
                      {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                    />
                    <label className="form__label">Email</label>
                  </div>
                  {errors.email?.type === "required" && <span>Email is required</span>}
                  {errors.email?.type === "pattern" && <span>Email pattern is wrong.</span>}
                  {/* ---------------Password--------------- */}
                  <div className="form_div">
                    <input
                      type="password"
                      className="form__input"
                      placeholder=" "
                      {...register("password", { required: true, minLength: 6, maxLength: 30 })}
                    />
                    <label className="form__label">Password</label>
                  </div>
                  {errors.password?.type === "required" && <span>password is required.</span>}
                  {errors.password?.type === "minLength" && <span>password minLength is 7</span>}
                  {errors.password?.type === "maxLength" && <span>password maxLength is 30</span>}
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
            <div className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="signUpDropdown">
              <button className="btn dropdown-header">
                <SignUp />
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
          // asyncVoteSelectedQuestion={asyncVoteSelectedQuestion}
        />
      ) : (
        <LoginQuestionList
          questions={questions}
          // asyncVoteSelectedQuestion={asyncVoteSelectedQuestion}
          setSelectedQuestion={props.setSelectedQuestion}
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

const Container = connect(mapStateToProps, {
  loginUser,
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
  getBackFromEditProfile,
})(Login);

export default Container;
