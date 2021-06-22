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
  SET_IMAGE_URL,
  SET_HTML_STRING,
} from "../actions/type";

const initialState = {
  questions: [],
  comments: [],
  selectedQuestion: false,
  renderCreateQuestion: false,
  renderUpdateQuestion: false,
  selectedCommentId: null,
  maxPageQuestion: 1,
  currentPageQuestion: 1,
  maxPageComment: 1,
  currentPageComment: 1,
  imageUrl: "",
  htmlString: "",
};
export const questionReducer = (
  state = JSON.parse(JSON.stringify(initialState)),
  action
) => {
  switch (action.type) {
    // dispatch({ type: SET_IMAGE_URL, payload: res.data.url });
    case SET_HTML_STRING: {
      return {
        ...state,
        htmlString: action.payload,
      };
    }
    case SET_IMAGE_URL: {
      return { ...state, imageUrl: action.payload };
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
        selectedQuestion: false,
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
      let selectedQuestion = action.payload.selectedQuestion,
        idx,
        user_id = action.payload.user_id;
      let q = state.questions.filter((question, index) => {
        if (selectedQuestion.id === question.id) idx = index;
        return selectedQuestion.id !== question.id;
      });
      selectedQuestion.votes.includes(user_id)
        ? (selectedQuestion.votes = selectedQuestion.votes.filter((vote, idx) => {
            return vote !== user_id;
          }))
        : selectedQuestion.votes.push(user_id);

      q.splice(idx, 0, selectedQuestion);

      // TODO => VOTES-ruu user_id-g pushlah

      return { ...state, questions: q };
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
