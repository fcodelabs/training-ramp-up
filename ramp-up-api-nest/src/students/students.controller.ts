import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from '../dto/student.dto';
import { Response } from 'express';
import { validatorDto } from '../utils/dtoValidator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  async getStudents(@Res() res: Response): Promise<any> {
    const response = await this.studentsService.getStudents();
    if (response instanceof Error) {
      return res.status(400).send((response as Error).message);
    } else {
      return res.status(200).send(response);
    }
  }

  @Post()
  async addStudent(
    @Body() studentData: any,
    @Res() res: Response,
  ): Promise<any> {
    const { name, gender, address, number, birthday } = studentData;
    const newStudent = new StudentDto();
    newStudent.name = name;
    newStudent.gender = gender;
    newStudent.address = address;
    newStudent.number = number;
    newStudent.birthday = birthday;
    try {
      await validatorDto(StudentDto, newStudent);
      const response = await this.studentsService.addStudent(newStudent);
      if (response instanceof Error) {
        return res.status(400).send((response as Error).message);
      } else {
        return res.status(200).send(response);
      }
    } catch (e) {
      return res.status(400).send((e as TypeError).message);
    }
  }

  @Patch('/:id')
  async updateStudent(
    @Body() studentData: any,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const { name, gender, address, number, birthday } = studentData;
    const newStudent = new StudentDto();
    newStudent.name = name;
    newStudent.gender = gender;
    newStudent.address = address;
    newStudent.number = number;
    newStudent.birthday = birthday;
    try {
      await validatorDto(StudentDto, newStudent);
      const response = await this.studentsService.updateStudent(id, newStudent);
      if (response instanceof Error) {
        return res.status(400).send((response as Error).message);
      } else {
        return res.status(200).send(response);
      }
    } catch (e) {
      return res.status(400).send((e as TypeError).message);
    }
  }

  @Delete('/:id')
  async deleteStudent(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.studentsService.deleteStudent(id);
    if (response instanceof Error) {
      return res.status(400).send((response as Error).message);
    } else {
      return res.status(200).send(response);
    }
  }
}
