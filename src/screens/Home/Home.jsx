/* eslint-disable eqeqeq */
import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
  getBackFromEditProfile,
} from "../../redux/actions/question";

import QuestionEditor from "./CreateQuestion/QuestionEditor";
import Profile from "./Profile/Profile";
import Navigation from "./Navigation";
import QuestionDetails from "./QuestionDetails";
import QuestionOrderButtons from "./Navigation/QuestionOrderButtons";
import QuestionList from "./QuestionList";
import QuestionPagination from "./QuestionPagination";
import "./home.scss";
import "./logo.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.asyncVoteSelectedQuestion = this.asyncVoteSelectedQuestion.bind(this);
    this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
    this.searchOrderHandler = this.searchOrderHandler.bind(this);
  }
  async componentWillMount() {
    await this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }
  async componentDidMount() {
    await this.props.getQuestionsByPageNumber(this.props.currentPageQuestion);
  }

  async searchSubmitHandler(event) {
    event.preventDefault();
    await this.props.searchQuestion(event.target.searchValue.value, null);
    // await this.props.setSelectedQuestion(i);
  }

  async searchOrderHandler(orderType) {
    await this.props.searchQuestion(this.props.searchValue, orderType);
  }

  async asyncVoteSelectedQuestion(i, user_id) {
    await this.props.voteSelectedQuestion(i, user_id);
  }

  blurBackground() {
    const divTC = document.getElementById("blur");
    divTC.classList.toggle("big-container");
  }

  render() {
    const {
      questions,
      logoutUser,
      backFromSelectedQuestion,
      createQuestionToggle,
      createProfileToggle,
      deleteSelectedQuestion,
      updateQuestionToggle,
      renderUpdateQuestion,
      getQuestionsByPageNumber,
      getBackFromEditProfile,
    } = this.props;
    let { selectedQuestion, maxPageQuestion, currentPageQuestion } = this.props;

    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");
    const user_email = localStorage.getItem("user_email");
    const user_bio = localStorage.getItem("user_bio");
    const user_photo = localStorage.getItem("user_photo");

    return (
      <div>
        {/* <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" type="text/css" /> */}
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
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {/*//* -------------------CREATE QUESTION -> FORM */}
          {this.props.renderCreateQuestion && (
            <QuestionEditor backFromSelectedQuestion={backFromSelectedQuestion} blurBackground={this.blurBackground} />
          )}
        </div>

        {this.props.renderProfile && (
          <Profile
            user_name={user_name}
            user_bio={user_bio}
            user_email={user_email}
            user_photo={user_photo}
            blurBackground={this.blurBackground}
            getBackFromEditProfile={getBackFromEditProfile}
          />
        )}

        <div className="container-fluid" id="blur">
          <div className="row d-flex">
            {/*//*------------------NAVIGATION BAR------------------- */}
            <Navigation
              backFromSelectedQuestion={backFromSelectedQuestion}
              getQuestionsByPageNumber={getQuestionsByPageNumber}
              searchSubmitHandler={this.searchSubmitHandler}
              createProfileToggle={createProfileToggle}
              blurBackground={this.blurBackground}
              logoutUser={logoutUser}
              user_name={user_name}
              user_photo={user_photo}
              clearSearchValue={this.clearSearchValue}
            />
            {/*//*------------------HOME BODY------------------- */}
            <div>
              {/* //! ---------------QUESTION DETAILS--------------- */}
              {selectedQuestion.user ? (
                <QuestionDetails
                  selectedQuestion={selectedQuestion}
                  user_id={user_id}
                  deleteSelectedQuestion={deleteSelectedQuestion}
                  updateQuestionToggle={updateQuestionToggle}
                  renderUpdateQuestion={renderUpdateQuestion}
                  asyncVoteSelectedQuestion={this.asyncVoteSelectedQuestion}
                />
              ) : (
                <div>
                  {/* //* -------QUESTION LIST -------------- */}
                  {/* //* ------QUESTION ORDER BUTTON-------- */}
                  {this.props.renderOrderButton && <QuestionOrderButtons searchOrderHandler={this.searchOrderHandler} />}
                  {questions && questions.length > 0 ? (
                    <div>
                      <QuestionList
                        questions={questions}
                        user_id={user_id}
                        asyncVoteSelectedQuestion={this.asyncVoteSelectedQuestion}
                        setSelectedQuestion={this.props.setSelectedQuestion}
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="mt-5 text-center text-secondary">Nothing to show. Please check back later.</h3>
                    </div>
                  )}
                </div>
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
  logoutUser,
  getQuestionsByPageNumber,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  createProfileToggle,
  deleteSelectedQuestion,
  updateQuestionToggle,
  voteSelectedQuestion,
  searchQuestion,
  getBackFromEditProfile,
})(Home);

export default Container;
