import { Student } from '../entity/Student';

export const getStudent = async (req, res) => {
  try {
    const student = await Student.find();

    if (student) {
      res.json({ student });
      return student;
    }
  } catch (error) {
    console.log('Student');
    res.json({ error: 'students not found' });
    //console.log(error);
  }

  // res.send(student);
};

export const findStudent = async (req, res) => {
  const student = await Student.findOne({
    where: { id: parseInt(req.params.studentId) },
  });
  return res.send(student);
};

export const postStudent = async (req, res) => {
  try {
    const { name, gender, address, mobileNo, birth, age } = req.body;
    const student = Student.create({
      name: name,
      gender: gender,
      address: address,
      mobileNo: mobileNo,
      birth: birth,
      age: age,
    });
    await student.save();
    return res.json(student);
    //return res.status(200);
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const response = await Student.delete(studentId);
    console.log('DELETE', response);
    res.json(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: parseInt(req.params.studentId) },
    });
    Student.merge(student, req.body);

    const result = await Student.save(student);
    console.log('UPDATE', result);
    res.json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
