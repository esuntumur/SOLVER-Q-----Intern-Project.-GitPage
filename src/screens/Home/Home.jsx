/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentication";
import {
  getAllQuestions,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  deleteSelectedQuestion,
  updateQuestionToggle,
} from "../../redux/actions/question";
import CreateQuestion from "./CreateQuestion/index";
import UpdateQuestion from "./UpdateQuestion/index";
import "./home.scss";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
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
    } = this.props;

    let { selectedQuestion } = this.props;
    const user_id = localStorage.getItem("user_id");
    return (
      <div>
        {/* <UpdateQuestion /> */}
        {this.props.renderCreateQuestion && (
          <CreateQuestion createQuestionToggle={createQuestionToggle} />
        )}
        <div className="container d-flex justify-content-center mt-20">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card ">
              <div className="nav width ">
                <h5 className="card-header">Home Page</h5>
                <button onClick={() => logoutUser()} className="btn btn-primary">
                  гарах
                </button>
                <button onClick={createQuestionToggle} className="btn btn-primary">
                  Create question
                </button>
              </div>
              <div className="list-group float-start red-500">
                {/* ---------------АСУУЛТЫН ДЭЛГЭРЭНГҮЙ ХЭСЭГ--------------- */}
                {selectedQuestion ? (
                  <div>
                    {selectedQuestion.id} {selectedQuestion.title} <br />
                    {/*  ----------DELETE, BACK Question BUTTON---------------- */}
                    <button onClick={backFromSelectedQuestion}>{"Back "}</button>
                    {user_id == selectedQuestion.user_id && (
                      <button onClick={() => deleteSelectedQuestion(selectedQuestion)}>
                        {"Delete this question "}
                      </button>
                    )}
                    {/*  ----------update Question BUTTON---------------- */}
                    {user_id == selectedQuestion.user_id && (
                      <button onClick={updateQuestionToggle}>
                        {"Update this question "}
                      </button>
                    )}
                    {/*  ----------update Question FORM---------------- */}
                    {renderUpdateQuestion ? (
                      <UpdateQuestion
                        selectedQuestion={selectedQuestion}
                        createQuestionToggle={createQuestionToggle}
                      />
                    ) : null}
                  </div>
                ) : (
                  // ---------------АСУУЛТУУДЫН ЖАГСААЛТ---------------
                  questions &&
                  questions.length > 0 &&
                  questions.map((i, idx) => (
                    <div className="list-group-item float-start card-item">
                      <button onClick={() => this.props.setSelectedQuestion(i)} key={idx}>
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
  console.log(`Logged Output ~ state.user in HOME `, state);
  console.log(
    `Logged Output ~ state.question.renderUpdateQuestion`,
    state.question.renderUpdateQuestion
  );
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
})(Home);

export default Container;
