import { GET_ALL_COMMENTS, VOTE_COMMENT } from "../actions/type";

const initialState = {
  comments: [],
};
export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTE_COMMENT:
      let comments = state.comments.filter((comment) => comment.id !== action.payload.id);
      comments.push(action.payload);
      return { ...state, comments: comments };
    default:
      return state;
  }
};
