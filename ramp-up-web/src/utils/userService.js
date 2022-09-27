import axios from "axios";
export const findUser = async (email, password) => {
  console.log("User Details", email, password);
  const res = await axios({
    method: "get",
    url: "http://localhost:8000/user",
    params: { email: email, password: password },
  });
  return res;
};
