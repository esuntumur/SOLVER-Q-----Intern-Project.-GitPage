import {
  FETCH_QUESTION,
  SET_SELECTED_QUESTION,
  DELETE_SELECTED_QUESTION,
} from "../actions/type";

const initialState = { selectedQuestion: null, questions: [] };
export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return { ...state, questions: action.payload };
    case SET_SELECTED_QUESTION:
      return { ...state, selectedQuestion: action.payload };
    case DELETE_SELECTED_QUESTION:
      return { ...state, selectedQuestion: null };
    default:
      return state;
  }
};
