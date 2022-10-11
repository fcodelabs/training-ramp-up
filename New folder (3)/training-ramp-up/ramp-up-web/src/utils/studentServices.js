import axios from "axios";
let data = [];
const numberValidator = /^[0-9]{10}$/;
const config = {
  headers: { Authorization: `bearer ${localStorage.getItem("token")}` },
};

export const insertStudent = async (student) => {
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
            "http://localhost:8080/student",
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

export const updateStudent = async (student) => {
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
              `http://localhost:8080/student/${student.id}`,
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
export const deleteStudent = async (student) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/student/${student.id}`,

      config,
    );

    if (res) {
      alert("User Delete Success");
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};
export const getStudents = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/student`,

      config,
    );

    return res.data;
  } catch (e) {
    console.log(Error, e);
  }
};
