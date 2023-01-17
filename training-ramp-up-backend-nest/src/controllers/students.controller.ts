import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { Request, Response } from 'express';
import { Student } from 'src/models/student.dto';
import { Body, Param, Patch } from '@nestjs/common/decorators';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll(): Promise<Array<Student>> {
    const students = this.studentService.getStudents();
    return students;
  }

  @Post()
  async create(@Body() student: Student): Promise<void> {
    const result = this.studentService.addStudent(student);
  }

  @Patch()
  async update(@Body() student: Student): Promise<Student> {
    const result = this.studentService.addStudent(student);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    const deletedId = this.studentService.deleteStudent(id);
    return deletedId;
  }
}
