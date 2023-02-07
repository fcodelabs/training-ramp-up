import { AppDataSource } from "../configs/DataSourceConfig";
import { Student } from "../models/student";

export const getAllStudentsService = async (): Promise<Student[]> => {
  const userRepo = AppDataSource.getRepository(Student);
  const allrecords = await userRepo.find({
    order: {
      PersonID: "ASC",
    },
  });
  return allrecords;
};

export const getStudentByIdService = async (id: number): Promise<Student> => {
  const userRepo = AppDataSource.getRepository(Student);
  const user = await userRepo.findOneBy({ PersonID: id });
  if (user) {
    return user;
  } else {
    throw new Error("No records found");
  }
};

export const createStudentService = async (user: Student): Promise<Student> => {
  const userRepo = AppDataSource.getRepository(Student);
  const userInsert = await userRepo.save(user);

  if (userInsert) {
    return userInsert;
  } else {
    throw new Error("Error in creating user");
  }
};

export const updateStudentService = async (user: Student): Promise<Student> => {
  const userRepo = AppDataSource.getRepository(Student);
  const userUpdate = await userRepo.save(user);

  if (userUpdate) {
    return userUpdate;
  } else {
    throw new Error("Error in updating user");
  }
};

export const deleteStudentService = async (id: number): Promise<Student> => {
  const userRepo = AppDataSource.getRepository(Student);
  const user = await userRepo.findOneBy({ PersonID: id });

  if (user) {
    const userDelete = await userRepo.remove(user);
    userDelete.PersonID = id;
    return userDelete;
  } else {
    throw new Error("Error in updating user");
  }
};
