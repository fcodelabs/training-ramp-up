import axios from "axios";

//User Service
let data = [];

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
    if (item.gender == "Male" || item.gender == "Female") {
      data.unshift(item);
      item.age = new Date().getFullYear() - new Date(item.birth).getFullYear();

      const resdata = await axios.post("http://localhost:8000", item, config);
      if (resdata) {
        alert("User Insert Success");
        return resdata;
      }
    } else {
      alert("Please check Gender");
    }
  }
};

export const updateItem = async (item) => {
  try {
    if (
      !item.name ||
      !item.gender ||
      !item.birth ||
      !item.mobileNo ||
      !item.address
    ) {
      alert("Incorrect Validation");
    } else {
      if (item.gender == "Male" || item.gender == "Female") {
        item.age =
          new Date().getFullYear() - new Date(item.birth).getFullYear();

        const res = await axios.put(
          `http://localhost:8000/${item.id}`,
          item,
          config,
        );
        if (res) {
          alert("User Update Success");
          return res;
        }
      } else {
        alert("Please check gender");
      }
    }
  } catch (e) {
    console.log(e);
  }
};
export const deleteItem = async (item) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/${item.id}`,

      config,
    );

    console.log("DELETESTUDENT", res);

    if (res) {
      alert("User Delete Sucess");
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};
export const getItems = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/student",
      {
        user: localStorage.getItem("email"),
      },
      config,
    );

    // console.log("GETITEM", res);

    return res.data;
  } catch (e) {
    console.log(Error, e);
  }
};

//User Servise

// export const insertUser = async (userRes) => {
//   // const config = {
//   //   headers: { "Content-Type": "application/json" },
//   // };

//   const body = {
//     name: userRes.payload.user,
//     email: userRes.payload.email,
//     password: userRes.payload.password,
//   };
//   try {
//     const res = await axios.post("http://localhost:8000/signin", body);

//     // localStorage.setItem("token", res.data.accessToken);

//     return res;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const findUser = async (user) => {
//   try {
//     const res = await axios({
//       method: "post",
//       url: "http://localhost:8000/login",
//       params: { email: user.user, password: user.password },
//       // config,
//     });

//     // localStorage.setItem("token", res.data.accessToken);

//     return res;
//   } catch (e) {
//     console.log(Error, e);
//   }
// };
