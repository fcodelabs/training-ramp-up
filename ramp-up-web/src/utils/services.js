import axios from "axios";
import { useState } from "react";
//const tokenvalue = localStorage.getItem("token");
//User Service
let data = [];
//require("dotenv").config();
//const bcrypt = require("bcrypt");
// const saltRounds = 10;
// var config = {
//   method: "get",
//   url: "http://localhost:8000",
//   headers: {
//     Authorization: `bearer ${localStorage.getItem("token")}`,
//     //"Content-Type": "application/json",
//   },
// };

// const [userdetails, setUserDetails] = useState("");

const config = {
  headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
};

//Student Servide
const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0,
  ) + 1;

export const insertItem = async (item) => {
  //console.log("DATAADDITEM", item);
  item.id = generateid(data);
  item.inEdit = false;

  if (
    !item.name ||
    !item.gender ||
    !item.birth ||
    !item.mobileNo ||
    !item.address
  ) {
    alert("Incorrect Validation");
  } else {
    data.unshift(item);
    item.age = new Date().getFullYear() - new Date(item.birth).getFullYear();
    //console.log("Age", typeof item.age);
    const resdata = await axios.post("http://localhost:8000", item, config);
    console.log("RESDATA", resdata);
    return resdata;
  }
};

export const updateItem = async (item) => {
  if (
    !item.name ||
    !item.gender ||
    !item.birth ||
    !item.mobileNo ||
    !item.address
  ) {
    alert("Incorrect Validation");
  } else {
    item.age = new Date().getFullYear() - new Date(item.birth).getFullYear();
    console.log("Upadte AGE", item);
    const res = await axios.put(
      `http://localhost:8000/${item.id}`,
      item,
      config,
    );
    return res;
  }
};
export const deleteItem = (item) => {
  console.log("USERDELETRES", item);
  const res = axios.delete(`http://localhost:8000/${item.id}`, config);
  console.log("USERDELETRES", res);
  return res;
};
export const getItems = async () => {
  try {
    const res = await axios.get("http://localhost:8000", config);
    //console.log("RESDATA", res);
    return res;
  } catch (e) {
    console.log(Error, e);
  }
};

//User Servise

export const insertUser = async (userRes) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  console.log("NameInsert", userRes.payload.user);
  // const body = JSON.stringify({ name, email, password });
  const body = {
    name: userRes.payload.user,
    email: userRes.payload.email,
    password: userRes.payload.password,
  };
  try {
    const res = await axios.post("http://localhost:8000/signin", body, config);
    console.log("Res", res);
    localStorage.setItem("token", res.data.accessToken);
    console.log("token_value", localStorage.getItem("token"));

    return res.data.accessToken;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get("http://localhost:8000/${}", config);
    return res;
  } catch (e) {
    console.log(Error, e);
  }
};

export const findUser = async (user) => {
  console.log("User Details", user.user);
  try {
    const res = await axios(
      {
        method: "get",
        url: "http://localhost:8000/signin",
        params: { email: user.user, password: user.password },
        // config,
      },
      config,
      // `http://localhost:8000/signin/${user}/${pwd}`,
      // config,
    );
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(pwd, salt);
    // console.log("Password", hash);
    //setUserDetails(res.data.accessToken);
    console.log("token", res);
    if (!res) {
      alert("User not here");
    }
    localStorage.setItem("token", res.data.accessToken);

    return res;
  } catch (e) {
    console.log(Error, e);
  }
};

export const signout = () => {
  //localStorage.removeItem(user);
};
