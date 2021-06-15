import {
  FETCH_QUESTION,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  CREATE_QUESTION,
  CREATE_QUESTION_TOGGLE,
  DELETE_SELECTED_QUESTION,
  UPDATE_SELECTED_QUESTION,
} from "./type";
import API from "../../API";

const token = localStorage.getItem("token");

export const getAllQuestions = () => async (dispatch) => {
  const response = await API.get("/questions");

  dispatch({ type: FETCH_QUESTION, payload: response.data });
};

export const setSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  // console.log("selectedQuestion: ", selectedQuestion);
  dispatch({ type: SET_SELECTED_QUESTION, payload: selectedQuestion });
};

export const backFromSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: BACK_FROM_SELECTED_QUESTION });
};

export const createQuestion = (newQuestionDetail) => async (dispatch) => {
  const response = await API.post("/questions", newQuestionDetail, {
    headers: {
      Authorization: token,
    },
  });

  dispatch({ type: CREATE_QUESTION, payload: response.data });
};

export const deleteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  const response = await API.delete(`/questions/${selectedQuestion.id}`, {
    headers: { Authorization: token },
  });
  console.log("response in delete in action", response);

  dispatch({ type: DELETE_SELECTED_QUESTION, payload: selectedQuestion });
};

export const createQuestionToggle = () => async (dispatch) => {
  dispatch({ type: CREATE_QUESTION_TOGGLE });
};

export const updateSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  // console.log(`Logged Output ~ selectedQuestion in ACTION`, selectedQuestion);
  // ! АРАЙ ДУУСААГҮЙ PARAMS НӨХӨХ
  const params = {
    id: selectedQuestion.id,
  };
  const response = await API.post(`/questions/${selectedQuestion.id}`, params, {
    header: {
      Authorization: token,
    },
  });
  dispatch({ type: UPDATE_SELECTED_QUESTION, payload: selectedQuestion });
};

export const updateQuestion = () => async (dispatch) => {};
