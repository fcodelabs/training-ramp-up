import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  create(newStudent: Student) {
    return this.studentRepository.manager.save(newStudent);
  }

  async update(id: number, updateStudentDto: StudentDto) {
    try {
      const studentToUpdate = await this.studentRepository.findOneBy({
        id: id,
      });
      if (studentToUpdate) {
        studentToUpdate.name = updateStudentDto.name;
        studentToUpdate.gender = updateStudentDto.gender;
        studentToUpdate.address = updateStudentDto.address;
        studentToUpdate.mobile = updateStudentDto.mobile;
        studentToUpdate.dob = updateStudentDto.dob;
        studentToUpdate.age = updateStudentDto.age;
        return await this.studentRepository.save(studentToUpdate);
      }
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  async remove(id: number) {
    try {
      const deleteStudent = await this.studentRepository.findOneBy({
        id: id,
      });
      if (deleteStudent) {
        return this.studentRepository.remove(deleteStudent);
      }
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }
}
