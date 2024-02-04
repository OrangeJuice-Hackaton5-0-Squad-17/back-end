import { Module } from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { GetUserById } from '@app/use-cases/user/get-user-by-id';
import { DeleteUserById } from '@app/use-cases/user/delete-user';
import { GetUserByEmail } from './get-user-by-email';
import { DatabaseModule } from '@external/database/database.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    CreateUser,
    UpdateUser,
    GetUserById,
    DeleteUserById,
    GetUserByEmail,
    UserService
  ],
  exports: [
    CreateUser,
    UpdateUser,
    GetUserById,
    DeleteUserById,
    GetUserByEmail,
    UserService
  ]
  
})
export class UserModule {}
