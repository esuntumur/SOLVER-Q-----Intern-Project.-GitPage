import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { questionReducer } from "./questionReducer";
import { commentReducer } from "./commentReducer";
export default combineReducers({
  auth: authReducer,
  question: questionReducer,
  comment: commentReducer,
});
