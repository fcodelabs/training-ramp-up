import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
          },
          HttpStatus.FORBIDDEN,
        )
      );
    }
    return user;
  }
}
