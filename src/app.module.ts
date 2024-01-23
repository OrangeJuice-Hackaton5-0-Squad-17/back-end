import { Module } from '@nestjs/common';
import { TestService } from './testRoute/testRoute.service.interface';
import { TestController } from './testRoute/test.controller';
import { TestRoute } from './testRoute/testRoute.service';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [
    {
      provide: TestService,
      useClass: TestRoute,
    }
  ],
})
export class AppModule {}
