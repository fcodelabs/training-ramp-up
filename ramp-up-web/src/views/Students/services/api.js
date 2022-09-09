import { URL } from "../constants";

export const getStudents = () =>
  fetch(`${URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result);

export const addStudent = (student) =>
  fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((result) => result);

export const updateStudent = (student) =>
  fetch(`${URL}/${student.ID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  }).then((result) => result);

export const deleteStudent = (ID) =>
  fetch(`${URL}/${ID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result);
