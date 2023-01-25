/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppGateway } from '../app.gateway';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResult } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './dto/students.dto';
import { StudentsService } from './students.service';

@Controller('student')
export class StudentsController {
  constructor(private readonly studentService: StudentsService, private readonly appGateway: AppGateway) {}

  @Get()
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Admin','Guest'])
  async getAllStudents(@Res({ passthrough: true }) res: Response) {
    const students = await this.studentService.getAllStudentsService()
    if (students !== null) {
      return res.status(200).send(students)
    } else {
      return res.status(400).send('Could not get student details')
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Admin'])
  async addStudent(@Body() newStudent: CreateStudentDto, @Res() res: Response) {
    const result = await this.studentService.addStudentService(newStudent)
    if (result !== null) {
      this.appGateway.webSocketServer.emit('notification', 'Student has been added')
      return res.status(201).send(result)
    } else {
      return res.status(400).send('Could not add student')
    }
  } 

  @Patch()
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Admin'])
  async updateStudent(@Body() updateStudent: UpdateStudentDto, @Res() res: Response) {
    const result = await this.studentService.updateStudentService(updateStudent)
    if (result !== null) {
      this.appGateway.webSocketServer.emit('notification', 'Student has been updated')
      return res.status(200).send(result)
    } else {
      return res.status(400).send('Could not update student')
    }
  }

  @Delete(':Id')
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Admin'])
  async deleteStudent(@Param('Id') deleteStudentId: string, @Res() res: Response) {
    const studentId = parseInt(deleteStudentId)
    
    const result: DeleteResult = await this.studentService.deleteStudentService(studentId)
    if (result.affected !== 0) {
      this.appGateway.webSocketServer.emit('notification', 'Student has been deleted')
      return res.status(200).send(result)
    } else {
      return res.status(400).send('Could not found student to delete')
    }
  }
}
