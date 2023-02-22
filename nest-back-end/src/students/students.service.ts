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
    try {
      return this.studentRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  create(newStudent: Student) {
    try {
      return this.studentRepository.save(newStudent);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
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
    } catch (error) {
      throw new HttpException(error.message, error.status);
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
