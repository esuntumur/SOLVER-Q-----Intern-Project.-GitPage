import API from "../../API";
import {
  GET_COMMENTS_BY_PAGE_NUMBER,
  VOTE_COMMENT,
  SEND_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT_TOGGLE,
  UPDATE_COMMENT,
} from "./type";
const token = localStorage.getItem("token");

export const getCommentsByPageNumber =
  (selectedQuestion, currentPageComment) => async (dispatch) => {
    await API.post(`questions/${selectedQuestion.id}/comments`, {
      commentPage: currentPageComment,
    }).then((response) => {
      dispatch({ type: GET_COMMENTS_BY_PAGE_NUMBER, payload: response.data });
    });
  };

export const deleteComment = (comment) => async (dispatch) => {
  await API.delete(`/comments/${comment.id}`, {
    headers: { Authorization: token },
  }).then((response) => {
    dispatch({ type: DELETE_COMMENT, payload: response.data.object });
  });
};

export const updateComment = (payload) => async (dispatch) => {
  await API.put(
    `/comments/${payload.commentId}`,
    { answer: payload.answer },
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((response) => {
    dispatch({ type: UPDATE_COMMENT, payload: response.data.object });
  });
};
export const updateCommentToggle = (payload) => async (dispatch) => {
  dispatch({ type: UPDATE_COMMENT_TOGGLE, payload: payload });
};

export const sendComment = (selectedQuestion, commentText) => async (dispatch) => {
  await API.post(
    "comments",
    {
      comment: {
        question_id: selectedQuestion.id,
        answer: commentText,
      },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((response) => {
    dispatch({ type: SEND_COMMENT, payload: response.data.object });
  });
};

export const voteComment = (selectedComment, user_id) => async (dispatch) => {
  // todo VOTE COMMENT: questions/1/comments/18/vote   json => {vote: { comment_id: selectedComment.id }}
  await API.post(`/comments/${selectedComment.id}/vote`, null, {
    headers: {
      Authorization: token,
    },
  }).then(() => {
    dispatch({
      type: VOTE_COMMENT,
      payload: { selectedComment, user_id },
    });
  });
  // await API.post("url", null);
};
