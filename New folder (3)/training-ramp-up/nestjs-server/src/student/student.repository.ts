/* eslint-disable prettier/prettier */
import { Student } from 'src/entity/student.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {}
