import axios from "axios";

//base URL
const instance = axios.create({
  baseURL: "http://localhost:3500/",
});
export default instance;
