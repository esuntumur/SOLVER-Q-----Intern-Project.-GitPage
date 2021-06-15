import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentication";
import {
  getAllQuestions,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  deleteSelectedQuestion,
} from "../../redux/actions/question";
import CreateQuestion from "./CreateQuestion/index";
// import AA from "./AA";
// import UpdateQuestion from "./UpdateQuestion/index";
// const UpdateQuestion = () => <h1>AAA</h1>;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getAllQuestions();
  }
  updateQuestionToggle() {
    return 1;
  }
  render() {
    const {
      questions,
      logoutUser,
      backFromSelectedQuestion,
      createQuestionToggle,
      deleteSelectedQuestion,

      user,
    } = this.props;

    let { selectedQuestion } = this.props;
    // const user_id = localStorage.getItem("user_id");
    // console.log(user_id === selectedQuestion.user_id);
    // console.log(`Logged Output ~ user_id`, user_id);
    // console.log(`Logged Output ~ selectedQuestion.user_id`, selectedQuestion.user_id);

    return (
      <div>
        {/* <AA />   */}
        {/* <UpdateQuestion /> */}
        {/* <UpdateQuestion /> */}
        {this.props.renderCreateQuestion && (
          <CreateQuestion createQuestionToggle={createQuestionToggle} />
        )}
        <div className="container d-flex justify-content-center mt-20">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <h5 className="card-header">Home Page</h5>

              <div className="card-body">
                <button onClick={createQuestionToggle}>Create question</button>
                <div className="list-group">
                  {/* ---------------АСУУЛТЫН ДЭЛГЭРЭНГҮЙ--------------- */}
                  {selectedQuestion ? (
                    <div>
                      {selectedQuestion.id} {selectedQuestion.title} <br />
                      {/* GO BACK 2 PAGE */}
                      <button onClick={backFromSelectedQuestion}>{"Back "}</button>
                      {user.id === selectedQuestion.user_id && (
                        <button onClick={() => deleteSelectedQuestion(selectedQuestion)}>
                          {"Delete this question "}
                        </button>
                      )}
                      {user.id === selectedQuestion.user_id && (
                        <button onClick={this.updateQuestionToggle.bind(this)}>
                          {"Update this question "}
                        </button>
                      )}
                    </div>
                  ) : (
                    // ---------------АСУУЛТУУДЫН ЖАГСААЛТ---------------
                    questions &&
                    questions.length > 0 &&
                    questions.map((i, idx) => (
                      <button onClick={() => this.props.setSelectedQuestion(i)} key={idx}>
                        {i.id} {i.title}
                        {i.state}
                        {i.username}
                      </button>
                    ))
                  )}
                  {/* <UpdateQuestion /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => logoutUser()}>гарах</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(`Logged Output ~ state.user in HOME `, state);
  return {
    questions: state.question.questions,
    selectedQuestion: state.question.selectedQuestion,
    renderCreateQuestion: state.question.renderCreateQuestion,
    user: state.auth.user,
  };
};

const Container = connect(mapStateToProps, {
  logoutUser,
  getAllQuestions,
  setSelectedQuestion,
  backFromSelectedQuestion,
  createQuestionToggle,
  deleteSelectedQuestion,
})(Home);

export default Container;
