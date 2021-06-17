/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoutUser } from "../../redux/actions/authentication";
import {
  getAllQuestions,
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
    this.props.getAllQuestions();
  }
  componentDidMount() {
    this.props.getAllQuestions();
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
    } = this.props;
    const notify = () => toast("Wow so easy!");
    const notifyCreateQuestion = () => toast("create question form!");
    // todo VOTE QUESTION: questions/1/vote              json => {vote: {question_id: selectedQuestion.id }}
    // todo VOTE COMMENT: questions/1/comments/18/vote   json => {vote: { comment_id: selectedComment.id }}
    let { selectedQuestion } = this.props;
    const user_id = localStorage.getItem("user_id");
    // if (selectedQuestion.user.id == undefined) selectedQuestion.user.id = false;
    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
        {/* <UpdateQuestion /> */}
        {/* <UpdateQuestion /> */}
        {/* <UpdateQuestion /> */}
        {this.props.renderCreateQuestion && (
          <CreateQuestion createQuestionToggle={createQuestionToggle} />
        )}
        <div className="container-fluid d-flex justify-content-center mt-20">
          <div className="col-sm-12 col-12">
            <div className="card ">
              <div className="nav">
                <h5 className="card-header">Home Page</h5>
                <button
                  onClick={() => {
                    logoutUser();
                  }}
                  className="btn btn-primary"
                >
                  гарах
                </button>
                <button
                  onClick={() => {
                    createQuestionToggle();
                    notifyCreateQuestion();
                  }}
                  className="btn btn-primary"
                >
                  Create question
                </button>
                <h6>user_id: {user_id}</h6>
              </div>
              <div className="card">
                {/* ---------------АСУУЛТЫН ДЭЛГЭРЭНГҮЙ ХЭСЭГ--------------- */}
                {selectedQuestion.user ? (
                  <div>
                    <h3>Question details</h3>
                    {/*  ----------VOTE Question BUTTON---------------- */}
                    {user_id != selectedQuestion.user.id && (
                      <button onClick={() => voteSelectedQuestion(selectedQuestion)}>
                        {"VOTE"}
                      </button>
                    )}
                    {/*  ----------QUESTION DESCRIPTION SECTION---------------- */}
                    <br />
                    selectedQuestion.id: {selectedQuestion.id}, <br />
                    votes: {selectedQuestion.votes}, <br />
                    title: {selectedQuestion.title} user_id: {selectedQuestion.user.id}{" "}
                    <br />
                    {/*  ----------DELETE Question BUTTON---------------- */}
                    {user_id == selectedQuestion.user.id && (
                      <button onClick={() => deleteSelectedQuestion(selectedQuestion)}>
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
                      <UpdateQuestion selectedQuestion={selectedQuestion} />
                    ) : null}
                    {/*  ----------BACK BUTTON---------------- */}
                    <button onClick={backFromSelectedQuestion}>{"Back "}</button>
                    {/*  ----------COMMENT LIST SECTION---------------- */}
                    {<CommentList selectedQuestion={selectedQuestion} />}
                  </div>
                ) : (
                  // ---------------АСУУЛТУУДЫН ЖАГСААЛТ---------------
                  questions &&
                  questions.length > 0 &&
                  questions.map((i, idx) => (
                    <div className="list-group-item float-start card-item" key={idx}>
                      <button onClick={() => this.props.setSelectedQuestion(i)}>
                        Details
                        {i.id} {i.title}
                        {i.state}
                        {i.username}
                      </button>
                    </div>
                  ))
                )}
              </div>
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
  };
};

const Container = connect(mapStateToProps, {
  logoutUser,
  getAllQuestions,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  deleteSelectedQuestion,
  updateQuestionToggle,
  voteSelectedQuestion,
})(Home);

export default Container;
