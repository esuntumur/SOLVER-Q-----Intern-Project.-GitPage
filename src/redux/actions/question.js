import {
  FETCH_QUESTION,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  CREATE_QUESTION,
  CREATE_QUESTION_TOGGLE,
  DELETE_SELECTED_QUESTION,
  UPDATE_SELECTED_QUESTION,
  UPDATE_QUESTION_TOGGLE,
  VOTE_SELECTED_QUESTION,
} from "./type";
import API from "../../API";

const token = localStorage.getItem("token");
// todo VOTE QUESTION: questions/1/vote              json => {vote: { question_id: selectedQuestion.id }}
export const voteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
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
  );

  if (response.data.message === undefined) {
    dispatch({ type: VOTE_SELECTED_QUESTION, payload: response.data });
  }
};
export const createQuestion = (newQuestionDetail) => async (dispatch) => {
  const response = await API.post("/questions", newQuestionDetail, {
    headers: {
      Authorization: token,
    },
  });

  dispatch({ type: CREATE_QUESTION, payload: response.data });
};

export const getAllQuestions = () => async (dispatch) => {
  const response = await API.get("/questions");
  console.log(`Logged Output ~ response`, response);

  dispatch({ type: FETCH_QUESTION, payload: response.data });
};

export const setSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  // console.log("selectedQuestion: ", selectedQuestion);
  dispatch({ type: SET_SELECTED_QUESTION, payload: selectedQuestion });
};

export const backFromSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: BACK_FROM_SELECTED_QUESTION });
};

export const deleteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  const response = await API.delete(`/questions/${selectedQuestion.id}`, {
    headers: { Authorization: token },
  });
  console.log("response in delete in action", response);

  dispatch({ type: DELETE_SELECTED_QUESTION, payload: response.data });
};

export const createQuestionToggle = () => async (dispatch) => {
  dispatch({ type: CREATE_QUESTION_TOGGLE });
};
export const updateQuestionToggle = (updateQuestionData) => async (dispatch) => {
  console.log(`Logged Output ~ updateQuestionData`, updateQuestionData);
  console.log("update question toggle && dispatching ");

  dispatch({ type: UPDATE_QUESTION_TOGGLE });
};
export const updateQuestion = (payload) => async (dispatch) => {
  console.log(`Logged Output ~ payload.params`, payload.params);
  const response = await API.put(`/questions/${payload.id}`, payload.params, {
    headers: {
      Authorization: token,
    },
  });
  console.log(`Logged Output ~ response`, response);

  dispatch({ type: UPDATE_SELECTED_QUESTION, payload: response.data });
};
