import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserBody } from '@external/http/dtos/user/create-user-body';
import { CreateUser } from '@app/use-cases/user/create-user';
import { UserViewModel } from '@external/http/view-models/user-view-model';
import { UserEmailAlreadyInUse } from '@app/use-cases/errors/user-email-already-in-use-error';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}
  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    try {
      const { user } = await this.createUser.execute({
        name,
        email,
        password
      });
  
      return { user: UserViewModel.toHTTP(user) }
    } catch (error) {
      if (error instanceof UserEmailAlreadyInUse) {
        throw new HttpException('This email is already in use.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }
}
