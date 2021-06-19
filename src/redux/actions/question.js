import {
  GET_QUESTION_BY_PAGE_NUMBER,
  CREATE_QUESTION_TOGGLE,
  CREATE_QUESTION,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  UPDATE_QUESTION_TOGGLE,
  UPDATE_SELECTED_QUESTION,
  DELETE_SELECTED_QUESTION,
  VOTE_SELECTED_QUESTION,
} from "./type";
import API from "../../API";

const token = localStorage.getItem("token");
// todo VOTE QUESTION: questions/1/vote      json => {vote: { question_id: selectedQuestion.id }}

export const getQuestionsByPageNumber = (pageNum) => async (dispatch) => {
  const response = await API.post("/questions/page", { questionPage: pageNum });
  console.log(`Logged Output ~ response`, response.data);

  dispatch({ type: GET_QUESTION_BY_PAGE_NUMBER, payload: response.data });
};

export const createQuestionToggle = () => async (dispatch) => {
  dispatch({ type: CREATE_QUESTION_TOGGLE });
};

export const createQuestion = (params) => async (dispatch) => {
  const response = await API.post("/questions", params, {
    headers: {
      Authorization: token,
    },
  });
  console.log(`Logged Output ~ response`, response);

  dispatch({ type: CREATE_QUESTION, payload: response.data.object });
};

export const setSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  // console.log("selectedQuestion: ", selectedQuestion);
  dispatch({ type: SET_SELECTED_QUESTION, payload: selectedQuestion });
};

export const backFromSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: BACK_FROM_SELECTED_QUESTION });
};

export const updateQuestionToggle = (updateQuestionData) => async (dispatch) => {
  dispatch({ type: UPDATE_QUESTION_TOGGLE });
};

// TODO => update question
export const updateQuestion = (payload) => async (dispatch) => {
  console.log(`Logged Output ~ payload.params`, payload.params);
  const response = await API.put(`/questions/${payload.id}`, payload.params, {
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    console.log(`Logged Output ~ response in UpdateQuestion`, response.data);
    dispatch({ type: UPDATE_SELECTED_QUESTION, payload: response.data.object });
  });
};

export const deleteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  const response = await API.delete(`/questions/${selectedQuestion.id}`, {
    headers: { Authorization: token },
  });
  console.log("response in delete in action", response);

  dispatch({ type: DELETE_SELECTED_QUESTION, payload: response.data });
};

export const voteSelectedQuestion = (selectedQuestion, user_id) => async (dispatch) => {
  const response = await API.post(
    `/questions/${selectedQuestion.id}/vote`,
    {
      vote: { question_id: selectedQuestion.id },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )
    .then(() => {
      console.log("dispatch hiilee 200");
      dispatch({ type: VOTE_SELECTED_QUESTION, payload: { selectedQuestion, user_id } });
    })
    //!CATCH ILREH ?
    .catch((error) => {
      console.log("dispatch hiihgv 401", error);
    });
};
