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
import { StudentDto } from 'src/dto/student.dto';

import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  async getStudent() {
    return await this.studentService.getAll();
  }

  @Post()
  //   @HttpCode(200)
  async addStudent(@Body() data: StudentDto) {
    return await this.studentService.addOne(data);
  }

  @Delete('/:id')
  // eslint-disable-next-line prettier/prettier
  async deleteStudent(@Req() req, @Res() res) {
    const student = await this.studentService.deleteOne(
      parseInt(req.params.id),
    );
    res.json(student);
  }

  @Put('/:id')
  async updateStudent(@Req() req, @Res() res) {
    const student = req.body;

    try {
      const user = await this.studentService.updateOne(student);
      console.log('Student', user);
      if (!user) return res.json('Error Update Student').status(400);
      return res.send({
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
