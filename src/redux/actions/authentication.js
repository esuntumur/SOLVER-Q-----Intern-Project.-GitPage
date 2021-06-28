import { LOGIN, LOGOUT } from "./type";
import api from "../../API";

export const loginUser = (formVlaues) => async (dispatch) => {
  const response = await api.post("/login", formVlaues);

  if (response.data.error === undefined && response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user_id", response.data.user.id);
    localStorage.setItem("isSignedIn", true);
    localStorage.setItem("user_name", response.data.user.username);
    localStorage.setItem("user_email", response.data.user.email);
    localStorage.setItem("user_bio", response.data.user.bio);
    localStorage.setItem("user_photo", response.data.user.profile);
    dispatch({ type: LOGIN, payload: response.data });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.setItem("token", null);
  localStorage.setItem("isSignedIn", false);
  dispatch({ type: LOGOUT, payload: null });
};

export const signupUser = (formVlaues) => async (dispatch) => {
  try {
    let result = await api
      .post("/users", formVlaues)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    return result;
  } catch (error) {
    console.log(`Console.log  =>  ~ signupUser ~ error`, error);
  }
};
