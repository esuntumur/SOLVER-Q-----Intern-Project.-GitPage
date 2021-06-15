import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authentication";
import {
  getAllQuestions,
  setSelectedQuestion,
  deleteSelectedQuestion,
} from "../../redux/actions/question";
import CreateQuestion from "./CreateQuestion/index";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getAllQuestions();
  }
  render() {
    const { questions, logoutUser, deleteSelectedQuestion } = this.props;
    let { selectedQuestion } = this.props;

    return (
      <div>
        <div className="container d-flex justify-content-center mt-20">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="card">
              <h5 className="card-header">Home Page</h5>
              <div className="card-body">
                <CreateQuestion />
                <div className="list-group">
                  {selectedQuestion ? (
                    <div>
                      {selectedQuestion.id} {selectedQuestion.title} <br />
                      {/* GO BACK 2 PAGE */}
                      <button onClick={deleteSelectedQuestion}>{"Back "}</button>
                    </div>
                  ) : (
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
                  {/* {this.props.selectedQ ? this.props.selectedQ : null} */}
                  {/* start card */}
                  {}
                  {/* end card */}
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
  // console.log(state.question);

  return {
    questions: state.question.questions,
    selectedQuestion: state.question.selectedQuestion,
  };
};

const Container = connect(mapStateToProps, {
  logoutUser,
  getAllQuestions,
  setSelectedQuestion,
  deleteSelectedQuestion,
})(Home);

export default Container;
