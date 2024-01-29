import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserBody } from '@external/http/dtos/user/create-user-body';
import { CreateUser } from '@app/use-cases/user/create-user';
import { UserViewModel } from '@external/http/view-models/user-view-model';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}
  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const { user } = await this.createUser.execute({
      name,
      email,
      password
    });

    return { user: UserViewModel.toHTTP(user) }
  }
}
