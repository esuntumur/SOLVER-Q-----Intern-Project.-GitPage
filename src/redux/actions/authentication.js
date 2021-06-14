import { LOGIN, LOGOUT } from "./type";
import api from "../../API";
export const loginUser = (formVlaues) => async (dispatch) => {
  const response = await api.post("/login", formVlaues);
  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isSignedIn", true);
  }
  dispatch({ type: LOGIN, payload: response.data });
};

export const logoutUser = () => async (dispatch) => {
  console.log("log out hij bn");

  localStorage.setItem("token", null);
  localStorage.setItem("isSignedIn", false);
  dispatch({ type: LOGOUT, payload: null });
};
