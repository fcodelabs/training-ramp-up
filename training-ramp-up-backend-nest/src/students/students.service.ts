import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<InsertResult> {
    try {
      const student: Student = { ...createStudentDto };
      const result = await this.studentRepository.insert(student);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Array<Student>> {
    try {
      const students = await this.studentRepository.find({
        order: {
          id: 'DESC',
        },
      });
      if (students) {
        return students;
      } else {
        throw new NotFoundException('No students found');
      }
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    try {
      const student = { ...updateStudentDto };
      const result = await this.studentRepository.update(id, student);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const result = await this.studentRepository.delete(id);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
