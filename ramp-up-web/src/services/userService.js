import axios from "axios";
let data = [];

const generateid = (data) =>
  data.reduce(
    (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
    0
  ) + 1;
  
export const findUser = async ({ email, password }) => {
  console.log("axios",email,password)
  const res = await axios({
    method: "get",
    url: "http://localhost:8080/singin",
    params: { email, password },
  });
  console.log("LGI",res);

  return res;
};

export const insertUser = async (user) => {
  console.log("User details", user);
  user.id = generateid(data);
  user.inEdit = false;
  const body = {
    User:user.name,
    Password:user.password,
    Email:user.email
  }
  if (!user.name || !user.email || !user.password) {
    alert("Incorrect Validation");
  } else {
    data.unshift(user);
console.log("body",body);
    const resdata = await axios.post("http://localhost:8080/signup", body);

    return resdata;
  }
};