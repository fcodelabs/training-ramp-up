/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Student from 'src/entities/student.entity';
import { Repository } from 'typeorm';
import { StudentInterface, UpdateStudentInterface } from './interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getAllStudentsService() {
    try {
      const students = await this.studentRepository.find({ order: { id: 'ASC' } })
      return students
    } catch (err) {
      return null
    }  }

  async addStudentService(newStudent: StudentInterface) {
    try {
      const createdStudent = this.studentRepository.create(newStudent);
      return this.studentRepository.save(createdStudent);
    } catch (err) {
      return null
    }
  }

  async updateStudentService(updateStudent: UpdateStudentInterface) {
    try {
      const studentId = updateStudent.id
      const student = await this.studentRepository.findOneBy({
        id: studentId
      })
      if (student !== null) {
        const updatedStudent = this.studentRepository.merge(student, updateStudent)
        const result = await this.studentRepository.save(updatedStudent)
        return result
      }
      return null
    } catch (err) {
      return null
    }  
  }

  async deleteStudentService(studentId: number) {
    try {
      const result = await this.studentRepository.delete(studentId)
      return result
    } catch (err) {
      return null
    }  
  }
}
