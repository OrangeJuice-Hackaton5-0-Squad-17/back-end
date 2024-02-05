import { Module } from '@nestjs/common';
import { TestController } from './controllers/testRoute/test.controller';
import { UserController } from './controllers/user/user.controller';
import { TestService } from '@app/testRoute/testRoute.service.interface';
import { TestRoute } from '@app/testRoute/testRoute.service';
import { DatabaseModule } from '@external/database/database.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/use-cases/user/user.module';
import { ProjectModule } from '@app/use-cases/projects/project.module';
import { ProjectController } from './controllers/project/project.controller';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ProjectModule],
  controllers: [TestController, UserController, AuthController, ProjectController],
  providers: [
    {
      provide: TestService,
      useClass: TestRoute,
    },
  ]
  
})
export class HttpModule {}
