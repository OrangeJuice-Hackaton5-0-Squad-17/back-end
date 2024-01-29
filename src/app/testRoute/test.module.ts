import { Module } from '@nestjs/common';
import { TestController } from '../../external/testRoute/test.controller';
import { TestService } from './testRoute.service.interface';
import { TestRoute } from './testRoute.service';

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
