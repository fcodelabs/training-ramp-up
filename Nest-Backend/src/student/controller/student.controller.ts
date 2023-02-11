import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { StudentDto } from '../dto/student.dto';
import { Response } from 'express';
import { SocketGateway } from '../../utils/socket.gateway';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../user/guards/roles/roles.decorator';
import { RoleGuard } from '../../user/guards/role/role.guard';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private socketGateway: SocketGateway,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getStudent(@Res() res: Response): Promise<Response> {
    try {
      const students = await this.studentService.getStudent();
      return res.status(200).json(students);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateStudent(
    @Param('id') id: number,
    @Body() student: StudentDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const updatedStudent = await this.studentService.updateStudent(
        id,
        student,
      );
      this.socketGateway.emitEvent(
        'notification',
        `Student's data updated successfully with name ${updatedStudent.name}`,
      );
      return res
        .status(200)
        .send(
          `Student's data updated successfully with name ${updatedStudent.name}`,
        );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Post()
  async addStudent(
    @Body() student: StudentDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const addedStudent = await this.studentService.addStudent(student);
      this.socketGateway.emitEvent(
        'notification',
        `Student added Successfully with name ${addedStudent.name}`,
      );
      res.status(201).send(addedStudent);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteStudent(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const deletedStudent = await this.studentService.deleteStudent(id);
      this.socketGateway.emitEvent(
        'notification',
        `Student deleted Successfully with name ${deletedStudent.name}`,
      );
      res
        .status(200)
        .send(
          `Student deleted Successfully with name ${
            deletedStudent && deletedStudent.name
          }`,
        );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
