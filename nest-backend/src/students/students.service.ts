import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly userRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    const newStudent = this.userRepository.create(createStudentDto);
    return this.userRepository.save(newStudent);
  }

  findAll() {
    const students = this.userRepository.find();
    return students;
  }

  update(id: number, createStudentDto: CreateStudentDto) {
    const updatedStudent = this.userRepository.update(id, createStudentDto);
    return updatedStudent;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
