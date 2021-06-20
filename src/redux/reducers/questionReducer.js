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
} from "../actions/type";

const initialState = {
  questions: [],
  comments: [],
  selectedQuestion: false,
  renderCreateQuestion: false,
  renderUpdateQuestion: false,
  renderUpdateCommentForm: false,
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
    case UPDATE_COMMENT_TOGGLE: {
      return { ...state, renderUpdateCommentForm: !state.renderUpdateCommentForm };
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
      const c = state.comments.filter((item) => {
        idx = item.id;
        return action.payload.id !== item.id;
      });
      c.splice(--idx, 1, action.payload);
      console.log(`Logged Output ~ state.questions`, state.questions);
      console.log(`Logged Output ~  q`, c);

      return {
        ...state,
        comments: c,
      };
    }
    case GET_COMMENTS_BY_PAGE_NUMBER: {
      console.log("action.payoad", action.payload);

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
      console.log(`Logged Output ~ state`, state);
      console.log(`Logged Output ~ payload`, action.payload);

      state.comments.forEach((comment) => {
        console.log(
          `Logged Output ~ every comment-id and selec com id`,
          comment.id,
          " ",
          action.payload.selectedComment.id
        );
        if (comment.id === action.payload.selectedComment.id) {
          console.log(`Logged Output ~ condition comment`, comment);
          comment.votes.push(action.payload.user_id);
        }
      });
      console.log(`Logged Output ~ state`, state);
      return { ...state };
    }
    case SEND_COMMENT: {
      console.log("in send comment reducer");

      state.comments.unshift(action.payload);
      console.log(`Logged Output ~ state`, state);

      return { ...state };
    }
    case GET_QUESTION_BY_PAGE_NUMBER: {
      console.log("action.payload", action.payload);

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
