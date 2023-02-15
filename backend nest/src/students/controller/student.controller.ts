import { Student } from 'src/entity/student';
import { StudentService } from './../services/student.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  ParseIntPipe,
  Param,
  ValidationPipe,
  UsePipes,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateStudentDto } from '../dtos/createStudent.dto';
import { UpdateStudentDto } from '../dtos/updateStudent.dto';
import { AccessTokenGuard } from '../../guards/authGuard/accessToken.guard';
import { RolesGuard } from '../../guards/roleGuard/roles.guard';
import { Role } from '../../guards/role.enum';
import { Roles } from '../../guards/roleGuard/roles.decorator';
import { gateWay } from '../../web-socket/gateway';

@Controller('students')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private readonly notifyGateway: gateWay,
  ) {}
  @Get()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles([Role.ADMIN, Role.GUEST])
  async getAllStudents(): Promise<Student[]> {
    const students = await this.studentService.getStudents();
    return students;
  }
  @Post()
  @HttpCode(201)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @UsePipes(ValidationPipe)
  createStudent(@Body() newStudent: CreateStudentDto) {
    const student = this.studentService.createStudent(newStudent);
    if (student) {
      this.notifyGateway.sendNotification('Student added successfully');
    }
    return student;
  }
  @Patch()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles([Role.ADMIN])
  @UsePipes(ValidationPipe)
  updateStudent(@Body() newStudent: UpdateStudentDto) {
    const student = this.studentService.updateStudent(newStudent);
    if (student) {
      this.notifyGateway.sendNotification('Student updated successfully');
    }
    return student;
  }
  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles([Role.ADMIN])
  deleteStudent(@Param('id', ParseIntPipe) id: number) {
    const student = this.studentService.deleteStudent(id);
    if (student) {
      this.notifyGateway.sendNotification('Student deleted successfully');
    }
    return student;
  }
}
