import { Student } from '../entity/Student';

export const getAll = async () => {
  try {
    const student = await Student.find();

    if (student) {
      //res.json({ student });

      return student;
    }
  } catch (error) {
    return { error: 'student not found' };
    //res.json({ error: 'students not found' });

    //console.log(error);
  }
};

export const addOne = async (data) => {
  try {
    const { name, gender, address, mobileNo, birth, age } = data;
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
    return { error: 'student add error' };
    //res.json({ error: 'Student Add fails' });
  }
};

export const deleteOne = async (data) => {
  console.log('Delete', data);
  try {
    const { studentId } = data;
    const response = await Student.delete(studentId);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateOne = async (data) => {
  try {
    const student = await Student.findOne({
      where: { id: parseInt(data.id) },
    });

    Student.merge(student, data);
    const result = await Student.save(student);
    if (!result) {
      return {
        error: 'student update fail',
      };
    }
    //res.json(result);
    return result;
  } catch (error) {
    console.log('Update Error', error);
    return { error: 'student update fail' };
  }
};
