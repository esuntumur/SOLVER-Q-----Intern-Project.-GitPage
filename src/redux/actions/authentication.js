import { LOGIN, LOGOUT } from "./type";
import api from "../../API";

export const loginUser = (formVlaues) => async (dispatch) => {
  const response = await api.post("/login", formVlaues);

  if (response.data.error === undefined && response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user_id", response.data.user.id);
    localStorage.setItem("isSignedIn", true);
    localStorage.setItem("user_name", response.data.user.username);
    dispatch({ type: LOGIN, payload: response.data });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.setItem("token", null);
  localStorage.setItem("isSignedIn", false);
  dispatch({ type: LOGOUT, payload: null });
};

export const signupUser = (formVlaues) => async (dispatch) => {
  await api.post("/users", formVlaues).then((response) => {
    return true;
  });
  return false;
};
