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
      throw err;
    }
  }

  async findAll(): Promise<Array<CreateStudentDto>> {
    try {
      //this.logger.log('Doing something...2');
      const allStudents = await this.studentRepository.find({
        order: { id: 'DESC' },
      });
      return allStudents;
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(updateStudentDto: UpdateStudentDto): Promise<CreateStudentDto> {
    try {
      const student = await this.studentRepository.findOneBy({
        id: updateStudentDto.id,
      });
      if (student) {
        this.studentRepository.merge(student, updateStudentDto);
        await this.studentRepository.save(student);
        return student;
      }
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const result = await this.studentRepository.delete(id);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
