import { Module } from '@nestjs/common';
import { TestController } from './controllers/testRoute/test.controller';
import { UserController } from './controllers/user/user.controller';
import { TestService } from '@app/testRoute/testRoute.service.interface';
import { TestRoute } from '@app/testRoute/testRoute.service';
import { CreateUser } from '@app/use-cases/user/create-user';
import { DatabaseModule } from '@external/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TestController, UserController],
  providers: [
    {
      provide: TestService,
      useClass: TestRoute,
    },
    CreateUser
  ]
  
})
export class HttpModule {}
