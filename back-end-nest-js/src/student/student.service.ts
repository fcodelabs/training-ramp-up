import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
