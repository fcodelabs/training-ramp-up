import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Get()
  getAllStudents() {
    return this.studentService.getAllStudentsService();
  }

  @Get(':id')
  getStudent(@Param('id') studentId: string) {
    return this.studentService.getStudentService(studentId);
  }

  @Post()
  addStudent(
    @Body("name") name: string,
    @Body("gender") gender: string,
    @Body("address") address: string,
    @Body("mobileNo") mobileNo: string,
    @Body("dateOfBirth") dateOfBirth: string,
    @Body("age") age: number,

  ) {
    return this.studentService.insertStudent(name, gender, address, mobileNo, dateOfBirth, age);
  }

  @Patch(':id')
  updateStudent(
    @Param('id') studentId: string,
    @Body("name") name: string,
    @Body("gender") gender: string,
    @Body("address") address: string,
    @Body("mobileNo") mobileNo: string,
    @Body("dateOfBirth") dateOfBirth: string,
    @Body("age") age: number,
  ) {
    return this.studentService.updateStudentService(studentId, name, gender, address, mobileNo, dateOfBirth, age);
  }

  @Delete(':id')
  removeStudent(@Param('id') studentId: string) {
    return this.studentService.deleteStudent(studentId);
  }



}
