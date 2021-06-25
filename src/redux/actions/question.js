import {
  GET_QUESTION_BY_PAGE_NUMBER,
  CREATE_QUESTION_TOGGLE,
  CREATE_QUESTION,
  CREATE_PROFILE_TOGGLE,
  GET_BACK_FROM_EDIT_PROFILE,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  UPDATE_SELECTED_QUESTION,
  DELETE_SELECTED_QUESTION,
  VOTE_SELECTED_QUESTION,
  UPDATE_QUESTION_TOGGLE,
} from "./type";
import API from "../../API";

const token = localStorage.getItem("token");
// todo VOTE QUESTION: questions/1/vote      json => {vote: { question_id: selectedQuestion.id }}

export const getQuestionsByPageNumber = (pageNum) => async (dispatch) => {
  try {
    await API.post("/questions/page", { questionPage: pageNum }).then((response) => {
      dispatch({ type: GET_QUESTION_BY_PAGE_NUMBER, payload: response.data });
    });
  } catch (error) {
    console.log(`Console.log  =>  ~ getQuestionsByPageNumber ~ error`, error);
  }
};
// TODO => searchQuestion
export const searchQuestion = (searchValue, order) => async (dispatch) => {
  try {
    await API.post("/questions/page", {
      keyWord: searchValue, //хайх утга
      order: order, //эрэмблэлт
      currentPage: "1", //Одоогийн page
    }).then((response) => {
      const questions = response.data.questions;
      const maxPage = response.data.maxPage;
      const currentPage = response.data.currentPage;
      dispatch({
        type: GET_QUESTION_BY_PAGE_NUMBER,
        payload: { questions, maxPage, currentPage, searchValue },
      });
    });
  } catch (error) {
    console.log(`Console.log  =>  ~ searchQuestion ~ error`, error);
  }
};
export const updateQuestionToggle = () => async (dispatch) => {
  dispatch({ type: UPDATE_QUESTION_TOGGLE });
};

// TODO => update question
export const updateQuestion = (payload) => async (dispatch) => {
  try {
    await API.put(`/questions/${payload.id}`, payload.params, {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      dispatch({ type: UPDATE_SELECTED_QUESTION, payload: response.data.object });
    });
  } catch (error) {
    console.log(`Console.log  =>  ~ updateQuestion ~ error`, error);
  }
};

export const createQuestionToggle = () => async (dispatch) => {
  dispatch({ type: CREATE_QUESTION_TOGGLE });
};

export const createQuestion = (params) => async (dispatch) => {
  try {
    await API.post("/questions", params, {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      dispatch({ type: CREATE_QUESTION, payload: response.data.object });
    });
  } catch (error) {
    console.log(`Console.log  =>  ~ createQuestion ~ error`, error);
  }
};

export const createProfileToggle = () => async (dispatch) => {
  dispatch({ type: CREATE_PROFILE_TOGGLE });
};

export const getBackFromSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: GET_BACK_FROM_EDIT_PROFILE });
};

export const setSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_QUESTION, payload: selectedQuestion });
};

export const backFromSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: BACK_FROM_SELECTED_QUESTION });
};

export const deleteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  try {
    const response = await API.delete(`/questions/${selectedQuestion.id}`, {
      headers: { Authorization: token },
    });
    dispatch({ type: DELETE_SELECTED_QUESTION, payload: response.data.object });
  } catch (error) {
    console.log(`Console.log  =>  ~ deleteSelectedQuestion ~ error`, error);
  }
};

export const voteSelectedQuestion = (selectedQuestion, user_id) => async (dispatch) => {
  await API.post(
    `/questions/${selectedQuestion.id}/vote`,
    {
      vote: { question_id: selectedQuestion.id },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )
    .then((res) => {
      dispatch({
        type: VOTE_SELECTED_QUESTION,
        payload: { selectedQuestion, user_id },
      });
    })
    //!CATCH ILREH ?
    .catch((error) => {});
};
