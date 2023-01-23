import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  SetMetadata,
  UseGuards,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Request, Response } from 'express';
import { RolesGuard } from 'src/auth/auth.guard';
// import { io } from '../../socketServer';
@Controller('students')
export class StudentsController {
  private readonly logger = new Logger('studentsController');
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin'])
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @Res() res: Response
  ): Promise<CreateStudentDto> {
    try {
      const response = await this.studentsService.create(createStudentDto);
      // io.emit(
      //   'notification',
      //   'Student added successfully. Student:- ' + response.name
      // );
      //console.log('new user- ', response);
      res.send(response);
      return;
    } catch (err) {
      res.send(false);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin', 'User'])
  async findAll(@Res() res: Response) {
    try {
      const students = await this.studentsService.findAll();
      res.send(students);
      return;
    } catch (err) {
      res.send(false);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch()
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin'])
  async update(
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: Response
  ): Promise<CreateStudentDto | boolean> {
    try {
      const response = await this.studentsService.update(updateStudentDto);
      // io.emit(
      //   'notification',
      //   'Student has been updated, Student:- ' + response.name
      // );
      res.send(response);
      return;
    } catch (err) {
      res.send(false);
    }
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @SetMetadata('roles', ['Admin'])
  async remove(@Param('id') id: string, @Res() res: Response): Promise<object> {
    // io.emit('notification', 'Student has been deleted');
    try {
      const deletedStudentID = await this.studentsService.remove(+id);
      res.send(deletedStudentID);
      return;
    } catch (err) {
      res.send(err);
    }
  }
}
