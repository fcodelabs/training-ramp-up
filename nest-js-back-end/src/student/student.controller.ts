import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StudentDto } from 'src/dto/student.dto';
import { StudentModel } from './student.interface';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getAllStudents(@Res() res: Response) {
    try {
      const students: Array<StudentModel> =
        await this.studentService.getAllStudentService();
      res.status(200);
      res.json(students);
    } catch (err) {
      res.status(400);
    }
  }

  @Post()
  async addStudent(@Body() newStudent: StudentDto, @Res() res: Response) {
    try {
      const student = await this.studentService.createStudentService(
        newStudent
      );
      res.sendStatus(200);
      res.json(student);
    } catch (error) {
      res.status(400);
    }
  }

  @Put()
  async updateStudent(@Body() newStudent: StudentDto, @Res() res: Response) {
    try {
      const student = await this.studentService.updateStudentService(
        newStudent
      );
      res.sendStatus(200);
      res.json(student);
    } catch (error) {
      res.status(400);
    }
  }

  @Delete('/:studentId')
  async deleteStudent(@Req() req: Request, @Res() res: Response) {
    try {
      const student = parseInt(req.params.studentId);
      const result = await this.studentService.deleteStudentService(student);
      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(400);
    }
  }
}
