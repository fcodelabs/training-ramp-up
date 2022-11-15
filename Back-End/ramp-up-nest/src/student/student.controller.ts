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
import { StudentDto } from '../dto/student.dto';
import { StudentInterface } from './student.interface';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  async addStudent(@Body() newStudent: StudentDto, @Res() res: Response) {
    try {
      const student = await this.studentService.createStudentService(
        newStudent,
      );
      console.log('stud ', student);
      res.status(200);
      res.json(student);
      return;
    } catch (err) {
      res.status(400);
    }
  }

  @Get()
  async getAllStudents(@Res() res: Response) {
    try {
      const students: Array<StudentInterface> =
        await this.studentService.getAllStudentService();
      res.status(200);
      res.json(students);
    } catch (err) {
      res.status(400);
    }
  }

  @Put('/:studentId')
  async updateStudent(
    @Body() studentData: StudentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const studentId = parseInt(req.params.studentId);
      const result = await this.studentService.updateStudentService(
        studentData,
        studentId,
      );
      res.status(200);
      res.json(result);
      return;
    } catch (err) {
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
