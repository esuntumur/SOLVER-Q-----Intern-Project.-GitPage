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
    const payload = {
      questions: {
        title: event.target.title.value,
        question: event.target.question.value,
      },
    };
    this.props.updateQuestion(payload);
  }
  render() {
    return (
      <div id="updateQuestion">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <div className="form-group">
              {" "}
              <label className="sr-only">UPDATE Title !!!</label>{" "}
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
              <label className="sr-only">UPDATE Question details !!!</label>{" "}
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
            <button onClick={this.props.updateQuestionToggle}>Back</button>
          </form>
        </div>
      </div>
    );
  }
}

const Container = connect(null, { updateQuestion })(UpdateQuestion);
export default Container;
