import React, { Component } from "react";
import "./style.scss";
import { updateQuestion } from "../../../redux/actions/question";
import { connect } from "react-redux";
class UpdateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  submitHandler(event) {
    event.preventDefault();
    const { selectedQuestion, createQuestionToggle } = this.props;
    console.log(`Logged Output ~ createQuestionToggle`, createQuestionToggle);
    console.log(`Logged Output ~ selectedQuestion`, selectedQuestion);
    const payload = {
      id: selectedQuestion.id,
      params: {
        questions: {
          title: event.target.title.value,
          question: event.target.question.value,
        },
      },
      backFromSelectedQuestion: this.props.backFromSelectedQuestion,
    };
    this.props.updateQuestion(payload);
    this.props.backFromSelectedQuestion();
  }
  render() {
    return (
      <div id="updateQuestion">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <h4>UPDATE YOUR QUESTION!!!</h4>
            <div className="form-group">
              {" "}
              <label className="sr-only">Update your Title!!!</label>{" "}
              <input
                type="text"
                className="form-control"
                required
                placeholder="Title"
                name="title"
              />{" "}
            </div>
            <div className="form-group">
              {" "}
              <label className="sr-only">Update your Question details!!!</label>{" "}
              <textarea
                className="form-control"
                required
                rows={7}
                placeholder="Question details here!"
                name="question"
              />{" "}
            </div>{" "}
            <button type="submit" className="btn text-center btn-blue">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const Container = connect(null, { updateQuestion })(UpdateQuestion);
export default Container;
