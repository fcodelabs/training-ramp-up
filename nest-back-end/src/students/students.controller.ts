import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentDto } from './dto/student.dto';
// import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('home')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Post()
  create(@Body() createStudentDto: StudentDto) {
    const newStudent = new Student();
    newStudent.name = createStudentDto.name;
    newStudent.gender = createStudentDto.gender;
    newStudent.address = createStudentDto.address;
    newStudent.mobile = createStudentDto.mobile;
    newStudent.dob = createStudentDto.dob;
    newStudent.age = createStudentDto.age;
    return this.studentsService.create(newStudent);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: StudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
