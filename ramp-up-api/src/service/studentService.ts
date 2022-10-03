import { Student } from '../entity/Student';

export const getAll = async (res) => {
  try {
    const student = await Student.find();

    if (student) {
      //res.json({ student });
      return student;
    }
  } catch (error) {
    console.log('Student');
    res.json({ error: 'students not found' });

    //console.log(error);
  }
};

export const addOne = async (req) => {
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
    return { student };
    //return res.status(200);
  } catch (error) {
    console.log(error);
    //res.json({ error: 'Student Add fails' });
  }
};

export const deleteOne = async (req) => {
  try {
    const { studentId } = req.params;
    const response = await Student.delete(studentId);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateOne = async (req) => {
  try {
    const student = await Student.findOne({
      where: { id: parseInt(req.params.studentId) },
    });
    Student.merge(student, req.body);
    const result = await Student.save(student);
    //res.json(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
