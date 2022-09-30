import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Response,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../entities/index';
import { StudentService } from './student.service';
import { RolesGuard } from './guards/roles.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  //Guest Requests
  @UseGuards(JwtAuthGuard)
  @Get('/getStudents')
  async getStudents(@Response() res) {
    const result = await this.studentService.getStudents();
    if (result.error) {
      res.status(400);
      res.json({ error: result.error });
      return;
    }
    res.status(200);
    res.json({ students: result.students });
    return;
  }

  //Admin Requests
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Post('/addStudent')
  async addStudent(@Body() body: any, @Response() res) {
    const result = await this.studentService.addStudent(body);
    if (result.error) {
      res.status(400);
      res.json({ error: result.error });
      return;
    }
    res.status(200);
    res.json({ student: result.data });
    return;
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Put('/updateStudent')
  async updateStudent(@Body() body: any, @Response() res) {
    const result = await this.studentService.updateStudent(body);
    if (result.error) {
      res.status(400);
      res.json({ error: result.error });
      return;
    }
    res.status(200);
    res.json({ student: result.data });
    return;
  }
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.admin)
  @Delete('/deleteStudent/:id')
  async deleteStudent(@Req() req: any, @Response() res) {
    const result = await this.studentService.deleteStudent(req.params.id);
    if (result.error) {
      res.status(400);
      res.json({ error: result.error });
      return;
    }
    res.status(200);
    res.json({ student: result.data });
    return;
  }
}
