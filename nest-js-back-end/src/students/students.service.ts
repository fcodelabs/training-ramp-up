import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger('studentsService');
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<CreateStudentDto>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<CreateStudentDto> {
    try {
      const student = await this.studentRepository.save(createStudentDto);
      return student;
    } catch (err) {
      return err;
    }
  }

  async findAll(): Promise<Array<CreateStudentDto>> {
    try {
      const allStudents = await this.studentRepository.find({
        order: { id: 'DESC' },
      });
      return allStudents;
    } catch (err) {
      return err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(
    updateStudentDto: UpdateStudentDto
  ): Promise<CreateStudentDto | boolean> {
    try {
      const student = await this.studentRepository.findOneBy({
        id: updateStudentDto.id,
      });
      this.studentRepository.merge(student, updateStudentDto);
      const updatedStudent = await this.studentRepository.save(student);
      return updatedStudent;
    } catch (err) {
      return err;
    }
  }

  async remove(id: number) {
    try {
      const result = await this.studentRepository.delete(id);
      return result;
    } catch (err) {
      return err;
    }
  }
}
