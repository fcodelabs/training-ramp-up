import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './entities/user.entity'
import { UserResolver } from './user.resolver';
// import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "apps/auth/src/user/graphql-user-schema.gql"),
      driver: ApolloDriver,
      cors: {
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'student',
      entities: [User],
      synchronize: true, // only use dev environment
    }),

    TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UserService, UserResolver],
  exports: [UserService],

})
export class UserModule { }