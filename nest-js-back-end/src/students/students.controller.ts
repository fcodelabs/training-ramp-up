import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
// import { AuthGuard } from '../auth/auth.guard';
// import { io } from '../../socketServer';
@Controller('students')
export class StudentsController {
  private readonly logger = new Logger('studentsController');
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  // @UseGuards(AuthGuard)
  // @SetMetadata('roles', ['Admin'])
  async create(
    @Body() createStudentDto: CreateStudentDto
  ): Promise<CreateStudentDto> {
    const response = await this.studentsService.create(createStudentDto);
    // io.emit(
    //   'notification',
    //   'Student added successfully. Student:- ' + response.name
    // );
    return response;
  }

  @Get()
  // @UseGuards(AuthGuard)
  // @SetMetadata('roles', ['Admin', 'User'])
  async findAll(): Promise<Array<CreateStudentDto>> {
    //this.logger.log('Doing something...1');
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch()
  // @UseGuards(AuthGuard)
  //@SetMetadata('roles', ['Admin', 'User'])
  async update(
    @Body() updateStudentDto: UpdateStudentDto
  ): Promise<CreateStudentDto> {
    const response = await this.studentsService.update(updateStudentDto);
    // io.emit(
    //   'notification',
    //   'Student has been updated, Student:- ' + response.name
    // );
    return response;
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  //@SetMetadata('roles', ['Admin', 'User'])
  async remove(@Param('id') id: string): Promise<object> {
    // io.emit('notification', 'Student has been deleted');
    return this.studentsService.remove(+id);
  }
}
