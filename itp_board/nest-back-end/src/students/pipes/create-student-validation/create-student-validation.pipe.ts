import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

import { CreateStudentDto } from '../../dto/create-student.dto';
import { CreateStudentSchema } from '../../schemas/createStudentSchema';

@Injectable()
export class CreateStudentValidationPipe implements PipeTransform {
  transform(value: CreateStudentDto, metadata: ArgumentMetadata) {
    const result = CreateStudentSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    value.dateOfBirth = new Date(value.dateOfBirth);
    return value;
  }
}
