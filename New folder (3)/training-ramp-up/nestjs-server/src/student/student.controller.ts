// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { StudentDto } from '../dto/student.dto';

import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  async getStudent() {
    const student = await this.studentService.getAll();
    if (!student) return { msg: 'student get error' };
    return student;
  }

  @Post()
  async addStudent(@Body() data: StudentDto) {
    const student = await this.studentService.addOne(data);
    if (!student) return { msg: 'student post error' };
    return student;
  }

  @Delete('/:id')
  async deleteStudent(@Req() req) {
    const student = await this.studentService.deleteOne(
      parseInt(req.params.id),
    );
    if (!student) return { msg: 'student delete error' };
    return student;
  }

  @Put('/:id')
  async updateStudent(@Req() req, @Res() res) {
    const student = req.body;

    try {
      const user = await this.studentService.updateOne(student);

      if (!user) return res.json('Error Update Student').status(400);
      res.send({ user: user });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
