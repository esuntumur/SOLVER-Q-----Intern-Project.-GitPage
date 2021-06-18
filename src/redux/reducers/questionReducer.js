import {
  FETCH_QUESTION,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  CREATE_QUESTION,
  CREATE_QUESTION_TOGGLE,
  DELETE_SELECTED_QUESTION,
  UPDATE_QUESTION_TOGGLE,
  UPDATE_SELECTED_QUESTION,
  VOTE_SELECTED_QUESTION,
  GET_ALL_COMMENTS,
  VOTE_COMMENT,
} from "../actions/type";

const initialState = {
  questions: [],
  comments: [],
  selectedQuestion: false,
  renderCreateQuestion: false,
  renderUpdateQuestion: false,
};
export const questionReducer = (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, comments: action.payload };
    case VOTE_COMMENT: {
      // * payload: { selectedQuestion, selectedComment, user_id },
      // TODO payload:  selectedQuestion  selectedComment.votes.push(user_id)
      let q = state.questions.forEach((e, i, r) => {
        // if (e.id === action.payload.selectedQuestion.id) {
        //   e.
        // }
      });
      let comments = state.comments.filter((comment) => comment.id !== action.payload.id);
      comments.push(action.payload);
      return { ...state, comments: comments };
    }
    case FETCH_QUESTION:
      return { ...state, questions: action.payload };
    case SET_SELECTED_QUESTION:
      return { ...state, selectedQuestion: action.payload };
    case BACK_FROM_SELECTED_QUESTION:
      return {
        ...state,
        selectedQuestion: false,
        renderCreateQuestion: false,
        renderUpdateQuestion: false,
      };
    case VOTE_SELECTED_QUESTION: {
      // let q = state.questions.filter((e) => e.id !== action.payload.id);
      // q.push(action.payload);
      // TODO => VOTES-ruu user_id-g pushlah
      state.questions.forEach((e, i, arr) => {
        if (e.id === action.payload.selectedQuestion.id) {
          // e.votes.push(action.payload.user_id);
          ++e.votes;
        }
      });
      return { ...state };
    }
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
    case UPDATE_QUESTION_TOGGLE:
      return {
        ...state,
        renderUpdateQuestion: !state.renderUpdateQuestion,
      };
    case UPDATE_SELECTED_QUESTION: {
      // payload: { payload, selectedQuestion }
      /**
       * payload = {
      id: selectedQuestion.id,
      params: {
        questions: {
          title: event.target.title.value,
          question: event.target.question.value,
        },
      },
      backFromSelectedQuestion: this.props.backFromSelectedQuestion
    };
       */
      let idx;
      const q = state.questions.filter((item) => {
        idx = item.id;
        return action.payload.id !== item.id;
      });
      q.splice(--idx, 1, action.payload);
      console.log(`Logged Output ~ state.questions`, state.questions);
      console.log(`Logged Output ~  q`, q);

      return {
        ...state,
        questions: q,
      };
    }
    case DELETE_SELECTED_QUESTION: {
      console.log("action.payload in REDUCER: ", action.payload);
      const q = state.questions.filter((item) => {
        return action.payload.id !== item.id;
      });
      return {
        ...state,
        questions: q,
      };
    }
    default:
      return state;
  }
};
