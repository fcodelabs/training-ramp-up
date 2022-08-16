import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateDto } from './dto/create.user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User, { name: "createUser" })
  create(@Args('userCreateDto') userCreateDto: UserCreateDto) {
    return this.userService.create(userCreateDto);
  }

  @Query(() => [User], { name: "getAllUsers" })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => [User], { name: "getUser" })
  findOne(@Args('email') email: string) {
    return this.userService.findOne(email);
  }

  @Mutation(() => User, { name: "updateUser" })
  update(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

}
