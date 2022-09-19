import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url, body) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

export const Students = {
  list: () => requests.get("/students"),

  create: (student) => requests.post("/students", student),

  update: (student, id) => requests.put(`/students/${id}`, student),

  delete: (id) => requests.del(`/students/${id}`),
};
