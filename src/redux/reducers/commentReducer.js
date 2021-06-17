import { GET_ALL_COMMENTS, VOTE_COMMENT } from "../actions/type";

const initialState = {
  comments: [],
};
export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, comments: action.payload };
    case VOTE_COMMENT:
      // ! payload:  selectedQuestion  selectedComment.votes =+ 1
      console.log(`Logged Output ~ selectedComment`, action.payload.selectedComment);
      console.log(`Logged Output ~ selectedQuestion`, action.payload.selectedQuestion);
      let comments = state.comments.filter((comment) => comment.id !== action.payload.id);
      comments.push(action.payload);
      return { ...state, comments: comments };
    default:
      return state;
  }
};
