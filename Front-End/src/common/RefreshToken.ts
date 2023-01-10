import axios from "axios";

const baseURL = "http://localhost:8000";

export const RefreshTokenFn = async () => {
  // const refreshToken = localStorage.getItem("refreshToken");
  // const email = localStorage.getItem("email");
  // const data = {
  //   refreshToken: refreshToken,
  //   email: email,
  // };

  try {
    const response = await axios.post(baseURL + "/user/refresh");

    const { accessToken } = response.data;

    // localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
