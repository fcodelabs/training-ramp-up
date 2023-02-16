import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UpdateStudentDto } from '../../dto/update-student.dto';
import { UpdateStudentSchema } from '../../schemas/updateStudentSchema';

@Injectable()
export class UpdateStudentValidationPipe implements PipeTransform {
  transform(value: UpdateStudentDto, metadata: ArgumentMetadata) {
    const result = UpdateStudentSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    if (value.dateOfBirth) {
      value.dateOfBirth = new Date(value.dateOfBirth);
    }
    return value;
  }
}
