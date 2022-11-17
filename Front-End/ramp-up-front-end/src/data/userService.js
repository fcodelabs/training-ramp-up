import axios from "axios";

export const registerUserService = async (user) => {
  console.log("user", user);
  const userData = {
    name: user.name,
    email: user.email,
    password: user.password,
  };
  try {
    const responseData = await axios.post(
      "http://localhost:8000/user/register",
      userData,
      { withCredentials: true }
    );
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

export const loginUserService = async (user) => {
  try {
    const responseData = await axios.post(
      "http://localhost:8000/user/login",
      user,
      { withCredentials: true }
    );
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

export const logoutUserService = async () => {
  try {
    const responseData = await axios.get("http://localhost:8000/user/logout", {
      withCredentials: true,
    });
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

export const newAccessTokenService = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/user/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
