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
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentValidationPipe } from './pipes/create-student-validation/create-student-validation.pipe';
import { UpdateStudentValidationPipe } from './pipes/update-student-validation/update-student-validation.pipe';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(
    @Body(CreateStudentValidationPipe) createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Patch()
  update(
    @Body(UpdateStudentValidationPipe) updateStudentDto: UpdateStudentDto,
  ) {
    const { id } = updateStudentDto;
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
