import { Module } from '@nestjs/common';
import { TestModule } from './app/testRoute/test.module';
import { UserController } from './external/user/user.controller';
import { PrismaService } from './external/prisma.service';

@Module({
  imports: [TestModule],
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}
