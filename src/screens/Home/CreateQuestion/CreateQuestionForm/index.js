import React from "react";
import { useForm } from "react-hook-form";
import {
  reqImageUrl,
  createComment,
  setHtmlString,
  getCommentsByPageNumber,
  setAudioFile,
} from "../../../../redux/actions/commentAction";
import { connect } from "react-redux";

import "../style.scss";

const LoginForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  console.log("====================================");
  console.log(props.questions);
  console.log("====================================");

  return (
    <div id="createQuestion">
      <div className="form-bg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="sr-only">Title</label>
            <input
              {...register("title", { required: true, maxLength: 1 })}
              placeholder="Title"
              className="form-control"
            />
            {errors.firstName?.type === "required" && "First name is required"}
          </div>
          <input type="submit" className="btn btn-sm text-center btn-blue" />
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
    currentPageComment: state.question.currentPageComment,
    renderAudioRecorder: state.question.renderAudioRecorder,
    questions: state.question.questions,
  };
};
// selectedQuestion, ;

const mapDispatchToProps = {
  reqImageUrl,
  setHtmlString,
  createComment,
  getCommentsByPageNumber,
  setAudioFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// export default LoginForm;
