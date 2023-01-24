import { Controller, Req, Post, UseGuards, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { Payload, Role } from './auth/interfaces';
import { Roles } from './auth/roles.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}



 
}
