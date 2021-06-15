import { LOGIN, LOGOUT } from "../actions/type";

const initialState = {
  isSignedIn: localStorage.getItem("isSignedIn")
    ? JSON.parse(localStorage.getItem("isSignedIn"))
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: {},
};

const authReducer = (state = initialState, action) => {
  console.log("in authReducer");
  switch (action.type) {
    case LOGIN:
      console.log(`Logged Output ~ action.payload.user`, action.payload.user);
      return {
        ...state,
        isSignedIn: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
