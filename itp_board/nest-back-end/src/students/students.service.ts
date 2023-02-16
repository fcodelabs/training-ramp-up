import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    console.log('from service:', createStudentDto);

    const newStudent = this.studentRepository.create(createStudentDto);
    const response = this.studentRepository.save(newStudent);

    return response;
  }

  findAll() {
    return this.studentRepository.find();
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    const response = this.studentRepository.update({ id }, updateStudentDto);
    return response;
  }

  remove(id: number) {
    const response = this.studentRepository.delete({ id });
    return response;
  }
}
