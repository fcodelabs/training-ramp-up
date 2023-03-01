import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
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
    if (user.role !== 'admin') {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'You are Unautheruized to access this resource',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
