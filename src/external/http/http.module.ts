import { Module } from '@nestjs/common';
import { TestController } from './controllers/testRoute/test.controller';
import { UserController } from './controllers/user/user.controller';
import { TestService } from '@app/testRoute/testRoute.service.interface';
import { TestRoute } from '@app/testRoute/testRoute.service';
import { CreateUser } from '@app/use-cases/user/create-user';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { DatabaseModule } from '@external/database/database.module';
import { GetUserById } from '@app/use-cases/user/get-user-by-id';

@Module({
  imports: [DatabaseModule],
  controllers: [TestController, UserController],
  providers: [
    {
      provide: TestService,
      useClass: TestRoute,
    },
    CreateUser,
    UpdateUser,
    GetUserById
  ]
  
})
export class HttpModule {}
