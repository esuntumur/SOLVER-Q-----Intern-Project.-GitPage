import API from "../../API";
import { GET_ALL_COMMENTS, VOTE_COMMENT, SEND_COMMENT } from "./type";
export const getAllComments = (selectedQuestion) => async (dispatch) => {
  const response = await API.get(`questions/${selectedQuestion.id}`);

  dispatch({ type: GET_ALL_COMMENTS, payload: response.data.question.comments });
};

export const sendComment = (selectedQuestion, commentText) => async (dispatch) => {
  const response = await API.post(
    "comments",
    {
      comment: {
        answer: commentText,
        question_id: selectedQuestion.id,
      },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(`Logged Output ~ response data`, response.data);

  // dispatch({ type: SEND_COMMENT });
};

const token = localStorage.getItem("token");
export const voteComment =
  (selectedQuestion, selectedComment, user_id) => async (dispatch) => {
    // ! duusaagui -- back boloogv bga
    // todo VOTE COMMENT: questions/1/comments/18/vote   json => {vote: { comment_id: selectedComment.id }}
    const response = await API.post(
      `/questions/${selectedQuestion.id}/comments/${selectedComment.id}/vote`,
      {
        vote: { comment_id: selectedComment.id },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    ).then(() => {
      dispatch({
        type: VOTE_COMMENT,
        payload: { selectedQuestion, selectedComment, user_id },
      });
    });
  };
