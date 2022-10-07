// import { Student } from '../entity/Student';

// export const getStudent = async (req, res) => {
//   const student = await Student.find();
//   res.send(student);
// };

// export const findStudent = async (req, res) => {
//   const student = await Student.findOne({
//     where: { id: parseInt(req.params.studentId) },
//   });
//   return res.send(student);
// };

// export const postStudent = async (req, res) => {
//   const { name, gender, address, mobile_number, date, age } = req.body;
//   const student = Student.create({
//     name: name,
//     gender: gender,
//     address: address,
//     mobile_number: mobile_number,
//     date: date,
//     age: age,
//   });
//   await student.save();
//   res.json(student);
//   return res.status(200);
// };

// export const deleteStudent = async (req, res) => {
//   const { studentId } = req.params;
//   const response = await Student.delete(studentId);
//   res.json(response);
//   return response;
// };

// export const updateStudent = async (req, res) => {
//   const student = await Student.findOne({
//     where: { id: parseInt(req.params.studentId) },
//   });
//   Student.merge(student, req.body);
//   const result = await Student.save(student);
//   res.json(result);
//   return result;
// };
import { Student } from '../entity/Student';

export const getStudents = async () => {
  try {
    const student = await Student.find();

    if (student) {
      console.log('STUDENT', student);
      return student;
    }
  } catch (error) {
    return { msg: 'get student failed' };
  }
};

export const postStudent = async (data) => {
  try {
    const { name, gender, address, mobile_number, age, date } = data;
    const student = await Student.save({
      name: name,
      gender: gender,
      address: address,
      mobile_number: mobile_number,
      age: age,
      date: date,
    });

    return student;
  } catch (error) {
    return { error: 'student add error' };
  }
};

export const deleteStudent = async (req) => {
  try {
    const { studentId } = req.params;
    const response = await Student.delete(studentId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = async (req) => {
  try {
    const student = await Student.findOne({
      where: { id: parseInt(req.params.studentId) },
    });

    Student.merge(student, req.body);
    const result = await Student.save(student);
    console.log('resutls', result);
    return result;
  } catch (error) {
    return { msg: 'update failed' };
  }
};
