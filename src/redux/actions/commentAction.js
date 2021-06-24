import API from "../../API";
import {
  GET_COMMENTS_BY_PAGE_NUMBER,
  VOTE_COMMENT,
  SEND_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT_TOGGLE,
  UPDATE_COMMENT,
  SET_IMAGE_URL,
  SET_HTML_STRING,
  TOGGLE_RENDER_AUDIO_RECORDER,
  SET_AUDIO_URL,
} from "./type";

const token = localStorage.getItem("token");
export const setRenderAudioRecorder = (html) => async (dispatch) => {
  dispatch({ type: TOGGLE_RENDER_AUDIO_RECORDER });
};

export const setHtmlString = (html) => async (dispatch) => {
  dispatch({ type: SET_HTML_STRING, payload: html });
};
export const reqAudioUrl = (audio) => async (dispatch) => {
  let form = new FormData();
  try {
    form.append("audio", audio, audio.name);
    await API.post("upload/audio", form).then((res) => {
      dispatch({ type: SET_AUDIO_URL, payload: res.data });
    });
  } catch (err) {}
};

export const reqImageUrl = (e) => async (dispatch) => {
  let form = new FormData();
  try {
    form.append("image", e, e.name);
    await API.post(`/upload`, form).then((res) => {
      console.log(`Console.log  =>  ~ awaitAPI.post ~ res.data.url`, res.data.url);
      dispatch({ type: SET_IMAGE_URL, payload: res.data.url });
      return res.data.url;
    });
  } catch (error) {}
};

export const createComment = (htmlString, selectedQuestion, id) => async (dispatch) => {
  //  this.props.createComment(this.props.htmlString, this.props.selectedQuestion);

  await API.post(
    "comments",
    {
      comment: {
        question_id: selectedQuestion.id,
        answer: htmlString,
        audio: id,
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

export const getCommentsByPageNumber = (selectedQuestion, currentPageComment) => async (dispatch) => {
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
