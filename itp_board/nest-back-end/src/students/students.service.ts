import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto): Promise<CreateStudentDto> {
    const newStudent = this.studentRepository.create(createStudentDto);
    const response = this.studentRepository.save(newStudent);

    return response;
  }

  async findAll(): Promise<CreateStudentDto[]> {
    return await this.studentRepository.find();
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    const response = await this.studentRepository.update(
      { id },
      updateStudentDto,
    );
    return response;
  }

  async remove(id: number): Promise<DeleteResult> {
    const response = await this.studentRepository.delete({ id });
    return response;
  }
}
