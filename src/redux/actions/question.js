import {
  GET_QUESTION_BY_PAGE_NUMBER,
  CREATE_QUESTION_TOGGLE,
  CREATE_QUESTION,
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
  await API.post("/questions/page", { questionPage: pageNum }).then((response) => {
    dispatch({ type: GET_QUESTION_BY_PAGE_NUMBER, payload: response.data });
  });
};
// TODO => searchQuestion
export const searchQuestion = (searchValue) => async (dispatch) => {
  await API.post("/questions/search", {
    searchValue: {
      keyWord: searchValue, //хайх утга
      order: "1", //эрэмблэлт
      currentPage: "1", //Одоогийн page
    },
  }).then((response) => {
    console.log(`Logged Output ~ response.data `, response.data);
    const questions = response.data.result;
    const maxPage = response.data.maxPage;
    const currentPage = response.data.currentPage;
    dispatch({
      type: GET_QUESTION_BY_PAGE_NUMBER,
      payload: { questions, maxPage, currentPage },
    });
  });
};

export const createQuestionToggle = () => async (dispatch) => {
  dispatch({ type: CREATE_QUESTION_TOGGLE });
};

export const createQuestion = (params) => async (dispatch) => {
  const response = await API.post("/questions", params, {
    headers: {
      Authorization: token,
    },
  });

  dispatch({ type: CREATE_QUESTION, payload: response.data.object });
};

export const setSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  dispatch({ type: SET_SELECTED_QUESTION, payload: selectedQuestion });
};

export const backFromSelectedQuestion = () => async (dispatch) => {
  dispatch({ type: BACK_FROM_SELECTED_QUESTION });
};

export const updateQuestionToggle = () => async (dispatch) => {
  console.log(`Logged Output ~ updateQuestionToggle`);
  dispatch({ type: UPDATE_QUESTION_TOGGLE });
  console.log(`Logged Output ~ updateQuestionToggle`);
};

// TODO => update question
export const updateQuestion = (payload) => async (dispatch) => {
  await API.put(`/questions/${payload.id}`, payload.params, {
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    dispatch({ type: UPDATE_SELECTED_QUESTION, payload: response.data.object });
  });
};

export const deleteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  console.log(`Logged Output ~ selectedQuestion`, selectedQuestion);
  const response = await API.delete(`/questions/${selectedQuestion.id}`, {
    headers: { Authorization: token },
  });

  console.log(`Logged Output ~ response.data`, response.data);
  dispatch({ type: DELETE_SELECTED_QUESTION, payload: response.data.object });
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
