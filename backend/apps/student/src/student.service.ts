import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService {
  private student: Student[] = [];

  insertStudent(
    name: string,
    gender: string,
    address: string,
    mobileNo: string,
    dateOfBirth: string,
    age: number,
  ) {
    const studentId = uuidv4();
    const newStudent = new Student(studentId, name, gender, address, mobileNo, dateOfBirth, age)
    this.student.push(newStudent)
    return newStudent;
  }

  getAllStudentsService() {
    return [...this.student];
  }

  getStudentService(studentId: string) {
    return this.findStudent(studentId)[0];

  }

  updateStudentService(studentId: string, name: string, gender: string, address: string, mobileNo: string, dateOfBirth: string, age: number) {
    const [student, index] = this.findStudent(studentId);
    const updatedStudent = { ...student };
    if (name) {
      updatedStudent.name = name;
    }
    if (gender) {
      updatedStudent.gender = gender;
    }
    if (address) {
      updatedStudent.address = address;
    }
    if (mobileNo) {
      updatedStudent.mobileNo = mobileNo;
    }
    if (dateOfBirth) {
      updatedStudent.dateOfBirth = dateOfBirth;
    }
    if (age) {
      updatedStudent.age = age;
    }

    return this.student[index] = updatedStudent;
  }

  deleteStudent(studentId: string) {
    const [student, index] = this.findStudent(studentId);
    const newStudents = this.student.filter((elm) => elm.id !== studentId);
    this.student = [...newStudents];
    return student;
  }

  private findStudent(studentId: string): [Student, number] {
    const studentIndex = this.student.findIndex((elm) => elm.id === studentId);
    const student = this.student[studentIndex];
    if (!student) {
      throw new NotFoundException("Could not found student!");
    } else {
      return [student, studentIndex];
    }

  }
}
