import { Module } from '@nestjs/common';
import { TestController } from './controllers/testRoute/test.controller';
import { UserController } from './controllers/user/user.controller';
import { TestService } from 'src/app/testRoute/testRoute.service.interface';
import { TestRoute } from 'src/app/testRoute/testRoute.service';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { DatabaseModule } from '../database/database.module';

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
