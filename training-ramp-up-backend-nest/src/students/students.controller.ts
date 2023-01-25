import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/interfaces';
import { AuthGuard } from '../auth/auth.guard';


@Controller('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles([Role.Admin])
  create(@Body() createStudentDto: CreateStudentDto): Promise<InsertResult> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles([Role.Admin,Role.User])
  findAll(): Promise<Array<Student>> {
    return this.studentsService.findAll();
  }

  @Patch(':id')
  @Roles([Role.Admin])
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @Roles([Role.Admin])
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.studentsService.remove(+id);
  }

  @Get(':id')
  @Roles([Role.Admin])
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }
}
