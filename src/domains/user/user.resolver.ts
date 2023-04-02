import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  CreateUserDto,
  EditUserDto,
  FindUserDto,
  UserDto,
} from 'src/common/dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { User } from './user.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserDto)
  @UseGuards(AuthGuard)
  async getUser(@Args('args') args: FindUserDto) {
    return this.userService.findOneUser(args);
  }

  @Query(() => [UserDto])
  @UseGuards(AuthGuard)
  async user(@User() user: UserDto) {
    //console.log(user);
    return this.userService.findAll();
  }

  @Mutation(() => UserDto)
  @UseGuards(AuthGuard)
  async createUser(@Args('input') input: CreateUserDto) {
    return this.userService.create(input);
  }

  @Mutation(() => UserDto)
  @UseGuards(AuthGuard)
  async deleteUser(@Args('args') input: FindUserDto) {
    return this.userService.deleteOne(input);
  }

  @Mutation(() => UserDto)
  @UseGuards(AuthGuard)
  async editUser(@Args('args') args: EditUserDto) {
    return this.userService.editOne(args);
  }
}
