import { Module } from '@nestjs/common';
import { HttpModule } from '@external/http/http.module';
import { DatabaseModule } from '@external/database/database.module';
import { UserModule } from '@app/use-cases/user/user.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [],
})
export class AppModule {}
