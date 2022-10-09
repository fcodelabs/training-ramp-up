import { Student } from "../entities/student.entity";
import {
  getStudent,
  postStudent,
  deleteStudent,
  updateStudent,
} from "../services/student.service";

export const allStudent = async (req: any, res:any) => {
  try {
    const user = await getStudent();
    // console.log("user", user);
    if (!user) return res.json("Error get Student").status(400);
    return res.send(user)

  } catch (error) {
    console.log(error);
  }
};

export const addStudent = async (req: any, res:any) => {
    console.log("req", req.body);
    try {
    const studentData = req.body;
      const user = await postStudent(studentData);
      // console.log("see Unique user", user);
      if (!user) return res.json("Error post Student").status(400);
      return res.send(user)
      // .send({
      //   user: user,
      // });
    } catch (error) {
      console.log(error);
    }
  };


  export const removeStudent = async (req: any, res:any) => {
    try {
        // console.log("req from remove", req.params);
        const studentId = req.params.id;
      const user = await deleteStudent(studentId);
      // console.log("user from remove function",user);
      return res.send(user);
    //   console.log("user", user);
    //   if (!user) return res.json("Error remove student").status(400);
    //   return res.send(user)
      // .send({
      //   user: user,
      // });
    } catch (error) {
      console.log(error);
    }

  };


  export const upgradeStudent = async (req: any, res:any) => {
    try {
        // console.log("req from update", req.params);
        const studentId = req.body;
        // console.log("ID from update", studentId);
        const studentUpdateDetails = {user: req.body, id: req.params.id};
        // console.log("checking student details", studentUpdateDetails );
      const user = await updateStudent(studentUpdateDetails);
      // console.log("update user", user);
    //   if (!user) return res.json("Error to update student").status(400);
      return res.send(user);
    } catch (error) {
      console.log(error);
    }
  };
