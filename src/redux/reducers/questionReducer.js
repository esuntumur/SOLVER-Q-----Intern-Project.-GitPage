import {
  FETCH_QUESTION,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  CREATE_QUESTION,
  CREATE_QUESTION_TOGGLE,
  DELETE_SELECTED_QUESTION,
} from "../actions/type";

const initialState = {
  selectedQuestion: false,
  questions: [],
  renderCreateQuestion: false,
};
export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUESTION:
      return { ...state, questions: action.payload };
    case SET_SELECTED_QUESTION:
      return { ...state, selectedQuestion: action.payload };
    case BACK_FROM_SELECTED_QUESTION:
      return { ...state, selectedQuestion: null };
    case CREATE_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
        renderCreateQuestion: false,
      };
    case CREATE_QUESTION_TOGGLE:
      return {
        ...state,
        renderCreateQuestion: !state.renderCreateQuestion,
      };
    case DELETE_SELECTED_QUESTION:
      console.log("action.payload in REDUCER: ", action.payload);
      const q = state.questions.filter((item) => {
        return action.payload.id !== item.id;
      });
      console.log(`Logged Output ~ action.payload`, action.payload);
      console.log(`Logged Output ~ q`, q);

      return {
        ...state,
        questions: q,
      };
    default:
      return state;
  }
};
