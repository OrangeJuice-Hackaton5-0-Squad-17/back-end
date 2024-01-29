import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserBody } from '../../dtos/user/create-user-body';
import { CreateUser } from 'src/app/use-cases/user/create-user';

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

    return { user }
  }
}
