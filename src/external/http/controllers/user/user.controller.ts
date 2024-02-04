import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserBody } from '@external/http/dtos/user/create-user-body';
import { CreateUser } from '@app/use-cases/user/create-user';
import { UserViewModel } from '@external/http/view-models/user/user-view-model';
import { UserEmailAlreadyInUse } from '@app/use-cases/errors/user-email-already-in-use-error';
import { UpdateUserBody } from '@external/http/dtos/user/update-user-body';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { UserNotFound } from '@app/use-cases/errors/user-not-found-error';
import { GetUserById } from '@app/use-cases/user/get-user-by-id';
import { DeleteUserById } from '@app/use-cases/user/delete-user';
import { UserAlreadyDeleted } from '@app/use-cases/errors/user-already-deleted-error';
import { UserService } from '@app/use-cases/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    try {
      const { user } = await this.userService.create({
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
  };

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    if (!body || Object.keys(body).length === 0) {
      throw new HttpException('At least one of the fields (email, name, or password) must be provided.', HttpStatus.BAD_REQUEST);
    }
    try {
      const { name, email, password } = body;
      await this.userService.update({
        id,
        name,
        email,
        password
      }); 
      return;
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
    const { user } =  await this.userService.getById({ id });
    return { user: UserViewModel.toHTTP(user) }
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.userService.deleteById({ id });
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      } else if (error instanceof UserAlreadyDeleted) {
        throw new HttpException('This user has already been deleted.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  }
}
