import axios from "axios";

export default axios.create({
  baseURL: "https://question0a.herokuapp.com/api/v1",
  // baseURL: "http://192.168.1.15:3000/api/v1",
});
