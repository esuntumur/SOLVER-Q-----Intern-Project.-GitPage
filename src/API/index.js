import axios from "axios";

export default axios.create({
  baseURL: "https://questions8ask.herokuapp.com/api/v1",
});
