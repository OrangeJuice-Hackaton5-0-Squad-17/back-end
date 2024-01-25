import { Module } from '@nestjs/common';
import { TestModule } from './testRoute/test.module';

@Module({
  imports: [TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
