import { Student } from '../entity/Student';
import {
  addOne,
  deleteOne,
  getAll,
  updateOne,
} from '../service/studentService';

// export const getStudent = async (req, res) => {
//   try {
//     const student = await Student.find();
//     console.log('Student ', student);
//     if (student) {
//       res.json({ student });
//       return student;
//     }
//   } catch (error) {
//     console.log('Student');
//     res.json({ error: 'students not found' });

//     //console.log(error);
//   }

//   // res.send(student);
// };

export const allStudent = async (req, res) => {
  try {
    const user = await getAll(res);
    if (!user) return res.json('Error getAllStudent').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const findStudent = async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  return res.send(student);
};

// export const postStudent = async (req, res) => {
//   try {
//     const { name, gender, address, mobileNo, birth, age } = req.body;
//     const student = Student.create({
//       name: name,
//       gender: gender,
//       address: address,
//       mobileNo: mobileNo,
//       birth: birth,
//       age: age,
//     });
//     console.log('STUDENT', student);
//     await student.save();
//     return res.json(student);
//     //return res.status(200);
//   } catch (error) {
//     console.log(error);
//     res.json({ error: 'Student Add fails' });
//   }
// };

export const addStudent = async (req, res) => {
  try {
    const user = await addOne(req);
    if (!user) return res.josn('Error Add Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const deleteStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const response = await Student.delete(studentId);

//     res.json(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deleteStudent = async (req, res) => {
  try {
    const user = await deleteOne(req);
    if (!user) return res.josn('Error Delete Student').status(400);
    return res.send({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const user = await updateOne(req);
    if (!user) return res.josn('Error Update Student').status(400);
    return res.send({
      uesr: user,
    });
  } catch (error) {
    console.log(error);
  }
};
