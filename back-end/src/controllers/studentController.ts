import { type NextFunction, type Request, type Response } from 'express';
import dataSource from '../config/dataSource';
import { Student } from '../models/student';

export class StudentController {
  private readonly studentRepository = dataSource.getRepository(Student);

  // Get all students
  async all(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const students = await this.studentRepository.find();
      response.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      response.status(500).send('Error retrieving student data');
    }
  }

  // Get one student
  async one(request: Request, response: Response, next: NextFunction): Promise<void> {
    const id = parseInt(request.params.id);

    try {
      const student = await this.studentRepository.findOne({
        where: { id }
      });

      if (student === null) {
        response.status(404).send('Student not found');
      } else {
        response.status(200).json(student);
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      response.status(500).send('Error retrieving student');
    }
  }

  // Save new student
  async save(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { id, name, gender, address, mobileNumber, age, birthday } = request.body;

    try {
      const existingStudent = await this.studentRepository.findOneBy({ id });

      if (existingStudent !== null) {
        response.status(400).send('Student with this ID already exists');
        return;
      }
      const newStudent = Object.assign(new Student(), {
        id,
        name,
        gender,
        address,
        mobileNumber,
        birthday,
        age
      });
      await this.studentRepository.save(newStudent);
      response.status(201).json(newStudent);
    } catch (error) {
      console.error('Error saving student:', error);
      response.status(500).send('Error saving student');
    }
  }

  // Remove student
  async remove(request: Request, response: Response, next: NextFunction): Promise<void> {
    const id = parseInt(request.params.id);

    try {
      const studentToRemove = await this.studentRepository.findOneBy({ id });

      if (studentToRemove === null) {
        response.status(404).send('Student not found');
      } else {
        await this.studentRepository.remove(studentToRemove);
        response.status(200).json(studentToRemove);
      }
    } catch (error) {
      console.error('Error removing student:', error);
      response.status(500).send('Error removing student');
    }
  }

  // Update student
  async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { id, name, gender, address, mobileNumber, age, birthday } = request.body;

    try {
      const newStudent = Object.assign(new Student(), {
        id,
        name,
        gender,
        address,
        mobileNumber,
        birthday,
        age
      });
      await this.studentRepository.save(newStudent);
      response.status(201).json(newStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      response.status(500).send('Error updating student');
    }
  }
}
