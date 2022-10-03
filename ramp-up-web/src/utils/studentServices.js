import axios from "axios";

//User Service
let data = [];
const numberValidator = /^[0-9]{10}$/;
const config = {
  headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
};

//Student Servide
// const generateid = (data) =>
//   data.reduce(
//     (previousValue, currentValue) => Math.max(previousValue, currentValue.id),
//     0,
//   ) + 1;

export const insertItem = async (student) => {
  //student.id = generateid(data);
  student.inEdit = false;

  if (
    !student.name ||
    !student.gender ||
    !student.birth ||
    !student.mobileNo ||
    !student.address
  ) {
    alert("Incorrect Validation");
  } else {
    if (student.gender == "Male" || student.gender == "Female") {
      if (numberValidator.test(student.mobileNo)) {
        if (
          new Date() - new Date(student.birth) < 0 ||
          new Date().getDate() - new Date(student.birth).getDate() == 0
        ) {
          alert("Enter valid Age");
        } else {
          data.unshift(student);
          student.age =
            new Date().getFullYear() - new Date(student.birth).getFullYear();

          const resdata = await axios.post(
            "http://localhost:8000",
            student,
            config,
          );
          if (resdata) {
            alert("User Insert Success");
            return resdata;
          }
        }
      } else {
        alert("Mobile number need 10 character");
      }
    } else {
      alert("Please check Gender");
    }
  }
};

export const updateItem = async (student) => {
  try {
    if (
      !student.name ||
      !student.gender ||
      !student.birth ||
      !student.mobileNo ||
      !student.address
    ) {
      alert("Incorrect Validation");
    } else {
      if (student.gender == "Male" || student.gender == "Female") {
        if (numberValidator.test(student.mobileNo)) {
          if (
            new Date() - new Date(student.birth) < 0 ||
            new Date().getDate() - new Date(student.birth).getDate() == 0
          ) {
            alert("Enter valid Age");
          } else {
            student.age =
              new Date().getFullYear() - new Date(student.birth).getFullYear();

            const res = await axios.put(
              `http://localhost:8000/${student.id}`,
              student,
              config,
            );
            if (res) {
              alert("User Update Success");
              return res;
            }
          }
        } else {
          alert("Mobile number need 10 character");
        }
      } else {
        alert("Please check gender");
      }
    }
  } catch (e) {
    console.log(e);
  }
};
export const deleteItem = async (student) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/${student.id}`,

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

    console.log("GETITEM", res.data.user);
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
