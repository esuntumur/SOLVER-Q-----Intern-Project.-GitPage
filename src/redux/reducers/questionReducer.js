import {
  GET_QUESTION_BY_PAGE_NUMBER,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  CREATE_QUESTION,
  CREATE_QUESTION_TOGGLE,
  DELETE_SELECTED_QUESTION,
  UPDATE_QUESTION_TOGGLE,
  UPDATE_SELECTED_QUESTION,
  VOTE_SELECTED_QUESTION,
  GET_COMMENTS_BY_PAGE_NUMBER,
  VOTE_COMMENT,
  SEND_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  UPDATE_COMMENT_TOGGLE,
  SET_SELECTED_QUESTION_FOR_VOTE,
} from "../actions/type";

const initialState = {
  questions: [],
  comments: [],
  selectedQuestion: false,
  selectedQuestionForVote: false,
  renderCreateQuestion: false,
  renderUpdateQuestion: false,
  selectedCommentId: null,
  maxPageQuestion: 1,
  currentPageQuestion: 1,
  maxPageComment: 1,
  currentPageComment: 1,
};
export const questionReducer = (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) => {
  switch (action.type) {
    case SET_SELECTED_QUESTION_FOR_VOTE: {
      console.log("SET_SELECTED_QUESTION_FOR_VOTE", action.payload);
      return {
        ...state,
        selectedQuestionForVote: action.payload,
      };
    }
    case UPDATE_COMMENT_TOGGLE: {
      if (state.selectedCommentId !== null) {
        return { ...state, selectedCommentId: null };
      } else return { ...state, selectedCommentId: action.payload };
    }
    // TODO
    case DELETE_COMMENT: {
      // payload comment object
      const c = state.comments.filter((comment) => {
        return comment.id !== action.payload.id;
      });
      return {
        ...state,
        comments: c,
      };
    }
    // TODO
    case UPDATE_COMMENT: {
      let idx;
      let c = state.comments.filter((item, index) => {
        if (action.payload.id === item.id) idx = index;
        return action.payload.id !== item.id;
      });
      c.splice(idx, 0, action.payload);

      return {
        ...state,
        comments: c,
      };
    }
    case GET_COMMENTS_BY_PAGE_NUMBER: {
      return {
        ...state,
        comments: action.payload.comments,
        maxPageComment: action.payload.maxPage,
        currentPageComment: action.payload.currentPage,
      };
    }
    case VOTE_COMMENT: {
      // * action.payload: { selectedComment, user_id },
      // TODO payload:   selectedComment.votes.push(user_id)

      state.comments.forEach((comment) => {
        if (comment.id === action.payload.selectedComment.id) {
          comment.votes.push(action.payload.user_id);
        }
      });
      return { ...state };
    }
    case SEND_COMMENT: {
      state.comments.unshift(action.payload);
      return { ...state };
    }
    case GET_QUESTION_BY_PAGE_NUMBER: {
      return {
        ...state,
        questions: action.payload.questions,
        maxPageQuestion: action.payload.maxPage,
        currentPageQuestion: action.payload.currentPage,
      };
    }
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
      return {
        ...state,
        questions: q,
      };
    }
    case DELETE_SELECTED_QUESTION: {
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
