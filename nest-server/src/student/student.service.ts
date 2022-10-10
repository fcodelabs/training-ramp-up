import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { Repository } from 'typeorm';
import { Students } from 'src/entity/student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepo: Repository<Students>,
  ) {}

  public async getAll() {
    return await this.StudentRepo.find();
  }

  async createPost(student: Students) {
    return await this.StudentRepo.save(student);
  }

  async deleteOne(categoryId: string) {
    return await this.StudentRepo.delete(categoryId);
  }

  async updateStudent(studentId: any) {
    return await this.StudentRepo.update(studentId, Student);
  }
}
