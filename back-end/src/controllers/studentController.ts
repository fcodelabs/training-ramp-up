import { type Request, type Response } from 'express';
import dataSource from '../config/dataSource';
import { Student } from '../models/student';

export const all = async (request: Request, response: Response): Promise<void> => {
  try {
    const studentRepository = dataSource.getRepository(Student);
    const students = await studentRepository.find();
    response.status(200).json(students);
  } catch (error) {
    console.log('Error fetching students:', error);
    response.status(500).json({ message: 'Error retrieving student data' });
  }
};

export const one = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);

  try {
    const studentRepository = dataSource.getRepository(Student);
    const student = await studentRepository.findOneBy({ id });

    if (student === null) {
      response.status(404).json({ message: 'Student not found' });
    } else {
      response.status(200).json(student);
    }
  } catch (error) {
    console.log('Error fetching student:', error);
    response.status(500).json({ message: 'Error retrieving student' });
  }
};

export const save = async (request: Request, response: Response): Promise<void> => {
  const { id, name, gender, address, mobileNumber, age, dateofbirth } = request.body;

  try {
    const studentRepository = dataSource.getRepository(Student);
    const existingStudent = await studentRepository.findOneBy({ id });

    if (existingStudent !== null) {
      response.status(400).json({ message: 'Student with this ID already exists' });
      return;
    }
    const newStudent = Object.assign(new Student(), {
      id,
      name,
      gender,
      address,
      mobileNumber,
      dateofbirth,
      age
    });
    await studentRepository.save(newStudent);
    response.status(201).json(newStudent);
  } catch (error) {
    console.log('Error saving student:', error);
    response.status(500).json({ message: 'Error saving student' });
  }
};

export const remove = async (request: Request, response: Response): Promise<void> => {
  const id = parseInt(request.params.id);

  try {
    const studentRepository = dataSource.getRepository(Student);
    const studentToRemove = await studentRepository.findOneBy({ id });

    if (studentToRemove === null) {
      response.status(404).json({ message: 'Student not found' });
    } else {
      await studentRepository.remove(studentToRemove);
      response.status(200).json(studentToRemove);
    }
  } catch (error) {
    console.log('Error removing student:', error);
    response.status(500).json({ message: 'Error removing student' });
  }
};

export const update = async (request: Request, response: Response): Promise<void> => {
  const { id, name, gender, address, mobileNumber, age, dateofbirth } = request.body;

  try {
    const studentRepository = dataSource.getRepository(Student);
    const newStudent = Object.assign(new Student(), {
      id,
      name,
      gender,
      address,
      mobileNumber,
      dateofbirth,
      age
    });
    await studentRepository.save(newStudent);
    response.status(201).json(newStudent);
  } catch (error) {
    console.log('Error updating student:', error);
    response.status(500).json({ message: 'Error updating student' });
  }
};
