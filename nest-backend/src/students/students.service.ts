import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly userRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const newStudent = this.userRepository.create(createStudentDto);
      const createdStudent = await this.userRepository.save(newStudent);
      global.io.emit('notify', { message: `New student added` });
      return createdStudent;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try {
      const students = await this.userRepository.find();
      return students;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: number, createStudentDto: CreateStudentDto) {
    try {
      const student = await this.userRepository.findOne({
        where: { id: id },
      });

      if (student) {
        this.userRepository.merge(student, createStudentDto);
        const updatedStudent = await this.userRepository.save(student);
        global.io.emit('notify', {
          message: `Details of ${updatedStudent.name} has updated`,
        });
        return updatedStudent;
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: number) {
    try {
      const deletedStudent = await this.userRepository.delete(id);
      global.io.emit('notify', { message: `Student has deleted` });
      return deletedStudent;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
