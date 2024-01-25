import { Module } from '@nestjs/common';
import { TestModule } from './testRoute/test.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TestModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
