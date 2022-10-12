import axios from "axios";
let data = [];

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0
  ) + 1;

export const findUser = async ({ email, password }) => {
  const res = await axios({
    method: "get",
    url: "http://localhost:3000/api/user",
    params: { email, password },
  });
  console.log("res", res);
  return res;
};

export const insertUser = async (user) => {
  user.id = generateid(data);
  user.inEdit = false;

  if (!user.name || !user.email || !user.password) {
    alert("Incorrect Validation");
  } else {
    data.unshift(user);
    console.log("User", user);
    const resdata = await axios.post(
      "http://localhost:3000/api/user/sign",
      user
    );
    console.log("Response", resdata);
    return resdata;
  }
};
