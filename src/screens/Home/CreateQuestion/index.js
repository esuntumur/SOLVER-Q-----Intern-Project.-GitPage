import React, { Component } from "react";
import "./style.scss";
import { createQuestion } from "../../../redux/actions/question";
import { connect } from "react-redux";
class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async submitHandler(event) {
    event.preventDefault();
    const payload = {
      questions: {
        title: event.target.title.value,
        question: event.target.question.value,
      },
    };
    await this.props.createQuestion(payload);
    await this.props.createQuestionToggle();
  }
  render() {
    return (
      <div id="createQuestion">
        <div className="form-bg">
          <form className="form" onSubmit={this.submitHandler.bind(this)}>
            <div className="form-group">
              {" "}
              <label className="sr-only">Title</label>{" "}
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
              <label className="sr-only">Question details</label>{" "}
              <textarea
                className="form-control"
                required
                rows={7}
                placeholder="Question details here!"
                name="question"
              />{" "}
            </div>{" "}
            <button type="submit" className="btn text-center btn-blue">
              Create
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const Container = connect(null, { createQuestion })(CreateQuestion);
export default Container;
