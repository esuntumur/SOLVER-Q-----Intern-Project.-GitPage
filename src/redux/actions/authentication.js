import { LOGIN, LOGOUT } from "./type";
import api from "../../API";
export const loginUser = (formVlaues) => async (dispatch) => {
  const response = await api.post("/login", formVlaues);
  console.log(response.data.error);

  if (response.data.error === undefined && response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isSignedIn", true);
    dispatch({ type: LOGIN, payload: response.data });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.setItem("token", null);
  localStorage.setItem("isSignedIn", false);
  dispatch({ type: LOGOUT, payload: null });
};
