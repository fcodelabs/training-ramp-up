/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Student from './entities/students.entity';
import { Repository } from 'typeorm';
import { StudentInterface, UpdateStudentInterface } from './interfaces/students.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getAllStudentsService() {
    try {
      const students = await this.studentRepository.find({ order: { id: 'ASC' } })
      return students
    } catch (err) {
      throw err    
    }  
  }

  async addStudentService(newStudent: StudentInterface) {
    try {
      const createdStudent = new Student()
      createdStudent.name = newStudent.name
      createdStudent.address = newStudent.address
      createdStudent.gender = newStudent.gender
      createdStudent.mobileNo = newStudent.mobileNo
      createdStudent.dob = newStudent.dob
      const result = this.studentRepository.save(createdStudent)
      return result
    } catch (err) {
      throw err    
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
      throw err    
    }  
  }

  async deleteStudentService(studentId: number) {
    try {
      const result = await this.studentRepository.delete(studentId)
      return result
    } catch (err) {
      throw err    
    }  
  }
}
