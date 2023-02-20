import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentValidationPipe } from './pipes/create-student-validation/create-student-validation.pipe';
import { UpdateStudentValidationPipe } from './pipes/update-student-validation/update-student-validation.pipe';
import { AccessTokenGuard } from '../auth/guards/accessToken.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { GatewayService } from '../gateway/gateway.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly gateWayService: GatewayService,
  ) {}

  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body(CreateStudentValidationPipe) createStudentDto: CreateStudentDto,
  ): Promise<CreateStudentDto> {
    const response = this.studentsService.create(createStudentDto);
    this.gateWayService.sendNew('new_student_added', createStudentDto.id);
    return response;
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(): Promise<CreateStudentDto[]> {
    return this.studentsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Patch()
  update(
    @Body(UpdateStudentValidationPipe) updateStudentDto: UpdateStudentDto,
  ): Promise<UpdateResult> {
    const { id } = updateStudentDto;
    this.gateWayService.sendNew('student_edited', id);
    return this.studentsService.update(id, updateStudentDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    this.gateWayService.sendNew('student_deleted', id);
    return this.studentsService.remove(id);
  }
}
