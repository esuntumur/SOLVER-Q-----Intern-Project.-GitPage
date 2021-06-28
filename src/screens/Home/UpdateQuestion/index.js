import React, { Component } from "react";
import "./style.scss";
import { updateQuestion } from "../../../redux/actions/question";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import { setHtmlString, reqImageUrl } from "../../../redux/actions/commentAction";
import "react-markdown-editor-lite/lib/index.css";
import { useForm } from "react-hook-form";
import "./style.scss";
MdEditor.use(HandleFullScreen);

export const UpdateQuestion = (props) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onImageUpload = async (e, callback) => {
    let url = await props.reqImageUrl(e);
    await callback(url);
  };

  const handleEditorChange = ({ html }) => {
    props.setHtmlString(html);
  };

  const submitHandler = async (data) => {
    const { selectedQuestion } = props;
    const payload = {
      id: selectedQuestion.id,
      params: {
        questions: {
          title: data.title,
          question: props.htmlString,
        },
      },
      backFromSelectedQuestion: props.backFromSelectedQuestion,
    };
    props.updateQuestion(payload);
    // props.backFromSelectedQuestion();
  };
  return (
    <div id="updateQuestion">
      <div className="form-bg">
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          {/* <CreateQuestionForm /> */}
          <h4>UPDATE YOUR QUESTION HERE!!!</h4>
          <div className="form-group">
            <label className="sr-only">Update your Title!!!</label>{" "}
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              {...register("title", { required: true, minLength: 7, maxLength: 150 })}
            />
            {errors.title?.type === "required" && "Title is required"}
            {errors.title?.type === "minLength" && "is too short (minimum characters: 7 )"}
            {errors.title?.type === "maxLength" && "is too long (maximum characters: 150 )"}
          </div>
          <div className="form-group">
            <label className="sr-only">Update your Question details!!!</label>{" "}
            <div style={{ height: "22.5rem", width: "58.5rem" }} className="mdEditor">
              <MdEditor
                onImageUpload={onImageUpload}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                style={{
                  height: "22.5rem",
                }}
              />
            </div>
          </div>
          <button type="submit" className="btn text-center btn-blue">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    imageUrl: state.question.imageUrl,
    htmlString: state.question.htmlString,
    selectedQuestion: state.question.selectedQuestion,
    currentPageQuestion: state.question.currentPageQuestion,
  };
};
export default connect(mapStateToProps, {
  updateQuestion,
  setHtmlString,
  reqImageUrl,
})(UpdateQuestion);
