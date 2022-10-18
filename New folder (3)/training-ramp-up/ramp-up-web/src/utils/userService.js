import axios from "axios";
export const insertUser = async (userRes) => {
  const body = {
    name: userRes.payload.user,
    email: userRes.payload.email,
    password: userRes.payload.password,
  };
  try {
    const res = await axios.post("http://localhost:8080/user/signup", body);

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
  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:8080/user/signin",
      params: { email: user.user, password: user.password },
    });
    console.log("Loging User details", res);

    return res;
  } catch (e) {
    console.log(Error, e);
  }
};
