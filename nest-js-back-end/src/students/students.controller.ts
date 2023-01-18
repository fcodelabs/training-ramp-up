import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  private readonly logger = new Logger('studentsController');
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto
  ): Promise<CreateStudentDto> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<Array<CreateStudentDto>> {
    //this.logger.log('Doing something...1');
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch()
  async update(
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<CreateStudentDto> {
    return this.studentsService.update(updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<object> {
    return this.studentsService.remove(+id);
  }
}
