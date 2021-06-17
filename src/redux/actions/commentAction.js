import API from "../../API";
import { GET_ALL_COMMENTS, VOTE_COMMENT } from "./type";
export const getAllComments = (selectedQuestion) => async (dispatch) => {
  const response = await API.get(`questions/${selectedQuestion.id}`);

  // console.log(`Logged Output ~ dispatch`);
  dispatch({ type: GET_ALL_COMMENTS, payload: response.data.question.comments });
  // console.log(typeof response.data.question.comments);
  // console.log(response.data.question.comments);
};

const token = localStorage.getItem("token");
export const voteComment = (selectedQuestion, selectedComment) => async (dispatch) => {
  // ! duusaagui -- back boloogv bga
  // todo VOTE COMMENT: questions/1/comments/18/vote   json => {vote: { comment_id: selectedComment.id }}
  const response = await API.post(
    `/questions/${selectedQuestion.id}/comments/${selectedComment.id}/vote`,
    {
      vote: { comment_id: selectedComment.id },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(`Logged Output ~ response.data`, response.data);
  console.log(`Logged Output ~ selectedComment`, selectedComment);
  console.log(`Logged Output ~ selectedQuestion`, selectedQuestion);

  if (response.data.message === "Successfully voted comment") {
    console.log(`Successfully voted comment`);
    dispatch({ type: VOTE_COMMENT, payload: { selectedQuestion, selectedComment } });
  }
};
