import axios from "axios";
export const insertUser = async (userRes) => {
  // const config = {
  //   headers: { "Content-Type": "application/json" },
  // };

  const body = {
    name: userRes.payload.user,
    email: userRes.payload.email,
    password: userRes.payload.password,
  };
  try {
    const res = await axios.post("http://localhost:8000/signup", body);

    // localStorage.setItem("token", res.data.accessToken);
    console.log("LOGINRES", res.data);
    if (res.data.error == "user was here") {
      alert("User was here");
    } else {
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};

export const findUser = async (user) => {
  console.log("User Servide", user);
  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:8000/login",
      params: { email: user.user, password: user.password },
      // config,
    });

    // localStorage.setItem("token", res.data.accessToken);

    return res;
  } catch (e) {
    console.log(Error, e);
  }
};
