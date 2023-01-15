import { Controller, Delete, Get, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
// import { StudentType } from 'src/interfaces/student.interface';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('get')
  async getAllStudents(@Res() res: Response) {
    // console.log('hi');
    return res.status(200).send('This action returns all students');
  }

  @Post('add')
  async addStudent(): Promise<string> {
    return 'This action adds a new student';
  }

  @Patch('update')
  async updateStudent(): Promise<string> {
    return 'This action update a new student';
  }

  @Delete('update')
  async deleteStudent(): Promise<string> {
    return 'This action delete a new student';
  }
}
