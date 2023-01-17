import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StudentDto } from 'src/dto/student.dto';
import { StudentModel } from './student.interface';
