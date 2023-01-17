/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { DeleteResult } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { StudentInterface } from './interfaces/student.interface';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  validate = (student: StudentInterface) => {
    const name = /^([A-z\s.]{3,20})$/
  
    const address = /^([A-z0-9/,\s]{5,})$/
  
    const mobileNo = /^([0][0-9]{9})$/
  
    const age: number = Math.round((new Date().getTime() - new Date(student.dob).getTime()) / (1000 * 60 * 60 * 24 * 365))
    const validateAge: boolean = age >= 18
  
    if (student.name !== undefined && !name.test(student.name)) {
      return false
    }
  
    if (student.gender !== undefined && student.gender === '') {
      return false
    }
  
    if (student.address !== undefined && !address.test(student.address)) {
      return false
    }
  
    if (student.mobileNo !== undefined && !mobileNo.test(student.mobileNo)) {
      return false
    }
  
    if (student.dob !== undefined && !validateAge) {
      return false
    }
    return true
  }

  @Get()
  async getAllStudents(@Res() res: Response) {
    try {
      const students = await this.studentService.getAllStudentsService()
      if (students !== null) {
        return res.status(200).send(students)
      } else {
        return res.status(400).send('Could not get student details')
      }
    } catch (err) {
      return res.status(400).send(`Error: ${err}`)
    }
  }

  @Post()
  async addStudent(@Body() newStudent: CreateStudentDto, @Res() res: Response) {
    try {
      const valid = this.validate(newStudent)
      if (valid) {
        const result = await this.studentService.addStudentService(newStudent)
        if (result !== null) {
          return res.status(201).send(result)
        } else {
          return res.status(400).send('Could not add student')
        }
      } else {
        return res.status(400).send('Can not add student. Enter Valid Data')
      }
    } catch (err) {
      return res.status(400).send(`Error: ${err}`)
    }  
  } 

  @Patch()
  async updateStudent(@Body() updateStudent: UpdateStudentDto, @Res() res: Response) {
    try {
      if (this.validate(updateStudent)) {
        const result = await this.studentService.updateStudentService(updateStudent)
        if (result !== null) {
          return res.status(200).send(result)
        } else {
          return res.status(400).send('Could not update student')
        }
      } else {
        return res.status(400).send('Can not update student. Enter Valid Data')
      }
    } catch (err) {
      return res.status(400).send(`Error: ${err}`)
    }
  }

  @Delete(':Id')
  async deleteStudent(@Param('Id') deleteStudentId: string, @Res() res: Response) {
    try {
      const studentId = parseInt(deleteStudentId)
      
      const result: DeleteResult = await this.studentService.deleteStudentService(studentId)
      if (result.affected !== 0) {
        return res.status(200).send(result)
      } else {
        return res.status(400).send('Could not found student to delete')
      }
    } catch (err) {
      return res.status(400).send(`Error: ${err}`)
    }  
  }
}
