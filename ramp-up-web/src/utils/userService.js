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
    url: "http://localhost:8000/user",
    params: { email, password },
  });

  return res;
};

export const insertUser = async (user) => {
  console.log("User details", user.name);
  user.id = generateid(data);
  user.inEdit = false;

  if (!user.name || !user.email || !user.password) {
    alert("Incorrect Validation");
  } else {
    data.unshift(user);

    const resdata = await axios.post("http://localhost:8000/api/user", user);

    return resdata;
  }
};
