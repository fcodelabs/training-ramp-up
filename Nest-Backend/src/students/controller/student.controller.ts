import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { StudentDto } from '../dto/student.dto';
import { SocketGateway } from '../../utils/socket.gateway';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../utils/guards/roles/roles.decorator';
import { RoleGuard } from '../../utils/guards/role/role.guard';

@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private socketGateway: SocketGateway,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getStudent(): Promise<StudentDto[]> {
    const students = await this.studentService.getStudent();
    return students;
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateStudent(
    @Param('id') id: number,
    @Body() student: StudentDto,
  ): Promise<StudentDto> {
    const updatedStudent = await this.studentService.updateStudent(id, student);
    this.socketGateway.emitEvent(
      'notification',
      `Student's data updated successfully with name ${updatedStudent.name}`,
    );
    return updatedStudent;
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Post()
  async addStudent(@Body() student: StudentDto): Promise<StudentDto> {
    const addedStudent = await this.studentService.addStudent(student);
    this.socketGateway.emitEvent(
      'notification',
      `Student added Successfully with name ${addedStudent.name}`,
    );
    return addedStudent;
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteStudent(@Param('id') id: number): Promise<void> {
    const deletedStudentName = await this.studentService.deleteStudent(id);
    this.socketGateway.emitEvent(
      'notification',
      `Student deleted Successfully with name ${deletedStudentName}`,
    );
  }
}
