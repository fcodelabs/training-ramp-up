import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Students } from '../entity/student.interface';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  public async getAll() {
    return await this.studentService.getAll();
  }

  @Post()
  async create(@Body() student: Students) {
    console.log(student);
    return await this.studentService.createPost(student);
  }

  @Delete(':studentId')
  delete(@Param('studentId') studentId) {
    return this.studentService.deleteOne(studentId);
  }
  @Put(':studentId')
  Update(@Param('studentId') studentId) {
    return this.studentService.updateStudent(studentId);
  }
}
