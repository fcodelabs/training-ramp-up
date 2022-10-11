import { Student } from '../entity/Student';

export const getAll = async () => {
  try {
    const student = await Student.find();

    if (student) {
      return student;
    }
  } catch (error) {
    return { error: 'student not found' };
  }
};

export const addOne = async (data) => {
  try {
    const { name, gender, address, mobileNo, birth, age } = data;

    const student = await Student.save({
      name: name,
      gender: gender,
      address: address,
      mobileNo: mobileNo,
      birth: birth,
      age: age,
    });

    return student;
  } catch (error) {
    return { error: 'student add error' };
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

    return result;
  } catch (error) {
    console.log(error);
    return { error: 'student update fail' };
  }
};
