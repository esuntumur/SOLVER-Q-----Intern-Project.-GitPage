import {
  GET_QUESTION_BY_PAGE_NUMBER,
  CREATE_QUESTION_TOGGLE,
  CREATE_QUESTION,
  SET_SELECTED_QUESTION,
  BACK_FROM_SELECTED_QUESTION,
  UPDATE_QUESTION_TOGGLE,
  UPDATE_SELECTED_QUESTION,
  DELETE_SELECTED_QUESTION,
  VOTE_SELECTED_QUESTION,
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
  await API.post("/questions/search", { searchValue: searchValue }).then((response) => {
    dispatch({ type: SET_SELECTED_QUESTION, payload: response.data.object });
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

export const updateQuestionToggle = (updateQuestionData) => async (dispatch) => {
  dispatch({ type: UPDATE_QUESTION_TOGGLE });
};

// TODO => update question
export const updateQuestion = (payload) => async (dispatch) => {
  const response = await API.put(`/questions/${payload.id}`, payload.params, {
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    dispatch({ type: UPDATE_SELECTED_QUESTION, payload: response.data.object });
  });
};

export const deleteSelectedQuestion = (selectedQuestion) => async (dispatch) => {
  const response = await API.delete(`/questions/${selectedQuestion.id}`, {
    headers: { Authorization: token },
  });

  dispatch({ type: DELETE_SELECTED_QUESTION, payload: response.data });
};

export const voteSelectedQuestion = (selectedQuestion, user_id) => async (dispatch) => {
  const response = await API.post(
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
    .then(() => {
      dispatch({ type: VOTE_SELECTED_QUESTION, payload: { selectedQuestion, user_id } });
    })
    //!CATCH ILREH ?
    .catch((error) => {});
};
