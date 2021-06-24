// 'use strict';
import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
// import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import HandleFullScreen from "./plugins/HandleFullScreen";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import "./style.scss";
import { createQuestion, getQuestionsByPageNumber } from "../../../redux/actions/question";
import { setHtmlString, reqImageUrl } from "../../../redux/actions/commentAction";
MdEditor.use(HandleFullScreen);

export const QuestionEditor = (props) => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onImageUpload = async (e, callback) => {
    console.log(`Console.log  =>  ~ onImageUpload ~ props`, props);
    await props.reqImageUrl(e);
    console.log(`Console.log  =>  ~ onImageUpload ~ props`, props);
    await callback(props.imageUrl);
    console.log(`Console.log  =>  ~ onImageUpload ~ props`, props);
  };

  const handleEditorChange = ({ html }) => {
    console.log(`Console.log  =>  ~ handleEditorChange ~ props`, props);
    props.setHtmlString(html);
  };

  const submitHandler = async (data) => {
    const payload = {
      questions: {
        title: data.title,
        question: props.htmlString,
      },
    };
    await props.createQuestion(payload);
    await props.getQuestionsByPageNumber(props.currentPageQuestion);
    const divTC = document.getElementById("blur");
    divTC.classList.toggle("big-container");
  };
  return (
    <div id="createQuestion">
      <div className="form-bg">
        <form className="form" onSubmit={handleSubmit(submitHandler)}>
          {/* <CreateQuestionForm /> */}
          <div className="form-group">
            <label className="sr-only">Title</label>{" "}
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
            <label className="sr-only">Question details</label>
            <div style={{ height: "400px" }} className="mdEditor">
              <MdEditor
                onImageUpload={onImageUpload}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                style={{ height: "400px" }}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-sm text-center btn-blue">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { imageUrl, htmlString, selectedQuestion, currentPageQuestion, questions } = state.question;
  return {
    imageUrl: imageUrl,
    htmlString: htmlString,
    selectedQuestion: selectedQuestion,
    currentPageQuestion: currentPageQuestion,
    questions: questions,
  };
};
const mapDispatchToProps = {
  setHtmlString,
  reqImageUrl,
  createQuestion,
  getQuestionsByPageNumber,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditor);
