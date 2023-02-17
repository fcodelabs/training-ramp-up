import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Student } from 'src/students/entities/student.entity';
import { ConfigService } from '@nestjs/config';

// export const databaseConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'me',
//   password: 'password',
//   database: 'ramp-up',
//   entities: [Student, User],
//   synchronize: true,
// };

export function databaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.HOST_NAME,
    port: parseInt(process.env.PORT_NUMBER),
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Student, User],
    synchronize: true,
  };
}
