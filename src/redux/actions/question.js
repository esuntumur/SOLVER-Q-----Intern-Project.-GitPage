import { FETCH_QUESTION, SET_SELECTED_QUESTION, DELETE_SELECTED_QUESTION } from "./type";
import API from "../../API";
export const getAllQuestions = () => async (dispatch) => {
  const response = await API.get("/questions");

  dispatch({ type: FETCH_QUESTION, payload: response.data });
};

export const setSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  // console.log("selectedQuestion: ", selectedQuestion);
  dispatch({ type: SET_SELECTED_QUESTION, payload: selectedQuestion });
};

export const deleteSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: DELETE_SELECTED_QUESTION });
};
