import { AppDataSource } from "..";
import { Student } from "../models/student";

export class StudentService {
  static async create(data: Partial<Student>) {
    const repository = AppDataSource.getRepository(Student);
    const student = repository.create(data);
    return await repository.save(student);
  }

  static async findAll() {
    try {
      const repository = AppDataSource.getRepository(Student);
      return await repository.find();
    } catch (error) {
      console.error("Error finding all students:", error);
    }
  }

  static async edit(id: number, data: Partial<Student>) {
    try {
      const repository = AppDataSource.getRepository(Student);
      const result = await repository.update(id, data);
      if (result.affected === 0) {
        throw new Error("Student not found");
      }
      return await repository.findOne({ where: { id: id } });
    } catch (error) {
      console.error("Error editing student:", error);
    }
  }

  static async delete(id: number) {
    try {
      const repository = AppDataSource.getRepository(Student);
      const result = await repository.delete(id);
      if (result.affected === 0) {
        throw new Error("Student not found");
      }
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }
}
