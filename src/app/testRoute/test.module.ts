import { Module } from '@nestjs/common';
import { TestService } from './testRoute.service.interface';
import { TestRoute } from './testRoute.service';
import { TestController } from '@external/http/controllers/testRoute/test.controller';

@Module({

  controllers: [TestController],
  providers: [
    {
      provide: TestService,
      useClass: TestRoute,
    }
  ],
})
export class TestModule {}
